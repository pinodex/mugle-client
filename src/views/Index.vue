<template>
  <div class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="title">Mugle</h1>

        <div class="field">
          <p class="control has-text-centered">
            <button
              class="button"
              :class="{
                'is-loading': isLoading
              }"
              @click="start"
            >
              Start Chatting
            </button>
          </p>
        </div>

        <p
          v-if="showUserMediaPermissionPrompt"
          class="has-text-danger"
        >
          Please allow this website to use your camera.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getWsClient } from '@/api/websocket';
import userMediaConstraints from '@/utils/user-media-constraints';

const ws = getWsClient();

export default {
  data: () => ({
    isLoading: false,
    showUserMediaPermissionPrompt: false,
  }),

  methods: {
    async start() {
      this.isLoading = true;

      const hasPermissions = await this.hasUserMediaPermissions();

      if (hasPermissions) {
        await ws.connect();

        this.$router.push({
          name: 'chat',
        });

        return;
      }

      this.isLoading = false;
      this.showUserMediaPermissionPrompt = true;
    },

    async hasUserMediaPermissions() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia(userMediaConstraints);

        if (stream) {
          stream.getTracks().forEach((track) => track.stop());
        }

        return true;
      } catch {
        return false;
      }
    },
  },
};
</script>
