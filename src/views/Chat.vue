<template>
  <div>
    <p>Your ID: {{ peerId }}</p>
    <p>Partner ID: {{ partnerId }}</p>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getWsClient, sendPresence } from '@/api/websocket';

const ws = getWsClient();

export default {
  computed: {
    ...mapGetters({
      peerId: 'peer/id',
      partnerId: 'peer/partnerId',
    }),
  },

  watch: {
    peerId(peerId) {
      console.log(`Reconnected. New peer ID: ${peerId}`);
    },
  },

  async mounted() {
    if (!this.peerId) {
      this.$router.push({
        name: 'index',
      });

      return;
    }

    ws.subscribe('/ws/peer/match', this.onPeerMatch);

    setInterval(sendPresence, 5000);
  },

  beforeDestroy() {
    ws.unsubscribe('/ws/peer/match', this.onPeerMatch);
  },

  methods: {
    ...mapActions({
      setPartnerId: 'peer/setPartnerId',
    }),

    onPeerMatch(partnerId) {
      this.setPartnerId(partnerId);
    },
  },
};
</script>
