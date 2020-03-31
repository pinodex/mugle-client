<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Mugle</h1>

        <button
          class="button"
          :class="{
            'is-loading': isLoading
          }"
          @click="start"
        >
          Start Chatting
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { getWsClient } from '@/api/websocket';

const ws = getWsClient();

export default {
  data: () => ({
    isLoading: false,
  }),

  async mounted() {
    await ws.disconnect();
  },

  methods: {
    async start() {
      this.isLoading = true;

      await ws.connect();

      this.$router.push({
        name: 'chat',
      });
    },
  },
};
</script>
