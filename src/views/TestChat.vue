<template>
  <div class="columns main-container">
    <div class="column is-8 video-container">
      <div class="video">

      </div>
    </div>

    <div class="column chatbox-container">
      <Chatbox class="chatbox" />
    </div>
  </div>
</template>

<script>
import Chatbox from '@/components/Chat/Chatbox.vue';

export default {
  components: {
    Chatbox,
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
  height: 100%

.chatbox-container
  +mobile
    position: fixed
    top: 50%
    left: 0
    right: 0
    bottom: 0

.video
  background: #000
  height: 100%

.chatbox
  height: 100%
</style>
