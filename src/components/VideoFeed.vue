<template>
  <figure class="image">
    <transition name="fade">
      <div
        v-show="!showStream"
        class="placeholder"
      />
    </transition>

    <transition name="fade">
      <video
        v-show="showStream"
        class="video"
        ref="video"
        playsinline
        autoplay
        muted
      />
    </transition>

    <div
      class="loading-container"
      v-if="isLoading"
    >
      <Loading
        :style="loadingStyle"
      />
    </div>
  </figure>
</template>

<script>
import Loading from '@/components/Loading.vue';

export default {
  components: {
    Loading,
  },

  props: {
    stream: {
      type: MediaStream,
      default: null,
    },

    small: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    showStream: false,
    isLoading: true,
  }),

  watch: {
    stream(stream) {
      this.$refs.video.srcObject = stream;

      this.isLoading = false;

      setTimeout(() => {
        this.showStream = true;

        this.$emit('ready');
      }, 500);
    },
  },

  computed: {
    loadingStyle() {
      return this.small && {
        transform: 'scale(.5)',
      };
    },
  },
};
</script>

<style lang="sass" scoped>
.image
  width: 100%
  height: 100%
  background: #000
  position: relative

.placeholder
  width: 100%
  height: 100%

  background: url('../assets/img/blurred-bg.webp')
  background-size: cover

.video,
.loading-container
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0

.loading-container
  display: flex
  align-items: center
  justify-content: center

.video
  width: 100%
  height: 100%
  object-fit: contain
</style>
