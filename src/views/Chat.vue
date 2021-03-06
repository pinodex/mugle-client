<template>
  <div
    class="columns main-container"
    v-if="peerId"
  >
    <div class="column is-8 video-container">
      <VideoFeed
        :stream="partnerStream"
      />

      <transition name="fade">
        <div
          class="floating-video"
          v-show="showSelfStream"
        >
          <div class="image is-16by9">
            <div class="has-ratio">
              <VideoFeed
                :stream="selfStream"
                @ready="showSelfStream = true"
                small
              />
            </div>
          </div>
        </div>
      </transition>
    </div>

    <div class="column chatbox-container">
      <Chatbox
        class="chatbox"
        :disabled="!isDataReady"
        @message="onSendMessage"
      />
    </div>
  </div>
</template>

<script>
import { serialize, deserialize } from 'serializr';
import { mapGetters, mapActions } from 'vuex';
import {
  getWsClient,
  sendPresence,
  sendReady,
  sendPeerDisconnect,
} from '@/api/websocket';
import { createPeerInstance } from '@/api/peer';
import Message from '@/models/Message';
import userMediaConstraints from '@/utils/user-media-constraints';
import iceServerService from '@/api/services/ice-server';
import VideoFeed from '@/components/VideoFeed.vue';
import Chatbox from '@/components/Chat/Chatbox.vue';

const ws = getWsClient();

let presenceInterval = null;
let peer = null;

export default {
  components: {
    VideoFeed,
    Chatbox,
  },

  data: () => ({
    showSelfStream: false,

    selfStream: null,
    partnerStream: null,

    dataConnection: null,
  }),

  computed: {
    ...mapGetters({
      peerId: 'peer/id',
      partnerId: 'peer/partnerId',
    }),

    isDataReady() {
      return this.dataConnection !== null;
    },
  },

  watch: {
    partnerId(partnerId) {
      if (partnerId !== null) {
        peer.call(partnerId, this.selfStream);

        const conn = peer.connect(partnerId);

        conn.on('open', () => {
          conn.on('data', this.onPeerData);
        });
      }
    },
  },

  async mounted() {
    if (!this.peerId) {
      this.redirectToHome();

      return;
    }

    this.setPartnerId(null);

    sendPeerDisconnect();

    try {
      await this.loadSelfStream();
    } catch {
      this.redirectToHome();

      return;
    }

    const iceServers = await this.getIceServers();

    peer = createPeerInstance(this.peerId, iceServers);

    peer.on('open', this.onPeerOpen);
    peer.on('call', this.onPeerCall);
    peer.on('connection', this.onPeerConnection);
    peer.on('disconnected', this.onPeerDisconnected);
  },

  beforeDestroy() {
    this.clearMessages();

    this.setPeerId(null);
    this.setPartnerId(null);

    clearInterval(presenceInterval);

    ws.disconnect();

    if (peer !== null) {
      peer.destroy();

      peer = null;
    }

    if (this.dataConnection !== null) {
      this.dataConnection = null;
    }

    if (this.selfStream) {
      this.selfStream.getTracks().forEach((track) => track.stop());
    }

    if (this.partnerStream) {
      this.partnerStream.getTracks().forEach((track) => track.stop());
    }
  },

  methods: {
    ...mapActions({
      setPeerId: 'peer/setId',
      setPartnerId: 'peer/setPartnerId',
      addChatMessage: 'chat/addMessage',
      addChatAnnouncement: 'chat/addChatAnnouncement',
      clearMessages: 'chat/clearMessages',
    }),

    async loadSelfStream() {
      this.selfStream = await navigator.mediaDevices.getUserMedia(userMediaConstraints);
    },

    async getIceServers() {
      const { data } = await iceServerService.all();

      return data;
    },

    onPeerOpen() {
      ws.subscribe('/ws/peer/match', this.onPeerMatch);

      presenceInterval = setInterval(sendPresence, 3000);

      sendReady();

      this.addChatAnnouncement('Waiting for partner...');
    },

    onPeerCall(mediaConnection) {
      mediaConnection.on('stream', (stream) => {
        this.partnerStream = stream;
      });

      mediaConnection.on('close', () => {
        peer.destroy();
      });

      mediaConnection.answer();
    },

    onPeerConnection(dataConnection) {
      dataConnection.on('open', () => {
        this.dataConnection = dataConnection;

        this.clearMessages();

        this.addChatAnnouncement('You are now connected! Say hello!');
      });

      dataConnection.on('close', () => {
        peer.destroy();
      });
    },

    onPeerData(data) {
      const message = deserialize(Message, data);

      this.addChatMessage(message);
    },

    onPeerMatch(partnerId) {
      this.setPartnerId(partnerId);
    },

    onPeerDisconnected() {
      sendPeerDisconnect();

      this.addChatAnnouncement('Your partner was disconnected');

      this.dataConnection = null;
    },

    onSendMessage(message) {
      this.addChatMessage(message);

      if (this.dataConnection !== null) {
        this.dataConnection.send(serialize(message));
      }
    },

    redirectToHome() {
      this.$router.push({
        name: 'index',
      });
    },
  },
};
</script>

<style lang="sass" scoped>
@import @/assets/sass/commons.sass

.main-container
  height: 100vh
  margin: 0

  & > .column
    max-height: 100%
    padding: 0

.video-container
  position: relative
  height: 100%

.floating-video
  position: absolute
  right: 2rem
  bottom: 2rem
  width: 200px

  +mobile
    top: 2rem
    bottom: unset

.chatbox-container
  +mobile
    position: fixed
    top: 50%
    left: 0
    right: 0
    bottom: 0

.chatbox
  height: 100%
</style>
