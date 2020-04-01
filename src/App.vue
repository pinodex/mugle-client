<template>
  <router-view />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getWsClient } from '@/api/websocket';

const ws = getWsClient();

export default {
  computed: {
    ...mapGetters({
      peerId: 'peer/id',
    }),
  },

  methods: {
    ...mapActions({
      setPeerId: 'peer/setId',
    }),
  },

  async mounted() {
    ws.onDisconnect((willReconnect) => {
      if (!willReconnect) {
        window.location.reload();
      }

      this.setPeerId(null);
    });

    ws.subscribe('/ws/peer/id', (peerId) => this.setPeerId(peerId));
  },
};
</script>

<style lang="sass">
@import ~bulma
@import ~buefy/src/scss/buefy.scss

.fade-enter-active,
.fade-leave-active
  transition: opacity .5s

.fade-enter,
.fade-leave-to
  opacity: 0
</style>
