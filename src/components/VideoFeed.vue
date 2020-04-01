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
  </figure>
</template>

<script>
export default {
  props: {
    stream: {
      type: MediaStream,
      default: null,
    },
  },

  data: () => ({
    showStream: false,
  }),

  watch: {
    stream(stream) {
      this.$refs.video.srcObject = stream;

      setTimeout(() => {
        this.showStream = true;
      }, 500);
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

.video
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  width: 100%
  height: 100%
  object-fit: contain
</style>
