<template>
  <div v-if="peerId">
    <div class="columns is-gapless main-container">
      <div class="column is-8 video-container">
        <VideoFeed
          :stream="partnerStream"
        />

        <div class="floating-video">
          <div class="image is-16by9">
            <div class="has-ratio">
              <VideoFeed
                :stream="selfStream"
                small
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass" scoped>
.main-container
  height: 100vh

.video-container
  position: relative
  height: 100vh

.floating-video
  position: absolute
  right: 2rem
  bottom: 2rem
  width: 200px
</style>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getWsClient, sendPresence, sendReady } from '@/api/websocket';
import { createPeerInstance } from '@/api/peer';
import iceServerService from '@/api/services/ice-server';
import VideoFeed from '@/components/VideoFeed.vue';

const ws = getWsClient();

let presenceInterval = null;
let peer = null;

export default {
  components: {
    VideoFeed,
  },

  data: () => ({
    selfStream: null,
    partnerStream: null,
  }),

  computed: {
    ...mapGetters({
      peerId: 'peer/id',
      partnerId: 'peer/partnerId',
    }),
  },

  async mounted() {
    if (!this.peerId) {
      this.$router.push({
        name: 'index',
      });

      return;
    }

    const iceServers = await this.getIceServers();

    await this.loadSelfStream();

    await sendReady();

    peer = createPeerInstance(this.peerId, iceServers);

    peer.on('open', this.onPeerOpen);
    peer.on('call', this.onPeerCall);
  },

  beforeDestroy() {
    clearInterval(presenceInterval);

    ws.unsubscribe('/ws/peer/match', this.onPeerMatch);

    if (peer !== null) {
      peer.destroy();

      peer = null;
    }
  },

  methods: {
    ...mapActions({
      setPartnerId: 'peer/setPartnerId',
    }),

    async loadSelfStream() {
      const constraints = {
        audio: true,
        video: true,
      };

      this.selfStream = await navigator.mediaDevices.getUserMedia(constraints);
    },

    async getIceServers() {
      const { data } = await iceServerService.all();

      return data;
    },

    onPeerOpen() {
      ws.subscribe('/ws/peer/match', this.onPeerMatch);

      presenceInterval = setInterval(sendPresence, 3000);
    },

    onPeerCall(call) {
      call.answer(this.selfStream);

      call.on('stream', this.onPartnerStream);
    },

    onPeerMatch(partnerId) {
      this.setPartnerId(partnerId);

      const partner = peer.call(partnerId, this.selfStream);

      partner.on('stream', this.onPartnerStream);
    },

    onPartnerStream(stream) {
      this.partnerStream = stream;
    },
  },
};
</script>
