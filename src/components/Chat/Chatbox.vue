<template>
  <div class="chatbox">
    <Simplebar
      ref="chats"
      class="chats"
    >
      <transition-group name="fade">
        <template v-for="({ type, self, content }, index) in messages">
            <Bubble
              v-if="type === 'bubble'"
              :key="index"
              :self="self"
              :content="content"
            />

            <Announcement
              v-else-if="type === 'announcement'"
              :key="index"
              :content="content"
            />
        </template>
      </transition-group>
    </Simplebar>

    <Composer
      class="composer"
      :disabled="disabled"
      @message="onMessage"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Simplebar from 'simplebar-vue';
import Message from '@/models/Message';
import Announcement from '@/components/Chat/Message/Announcement.vue';
import Bubble from '@/components/Chat/Message/Bubble.vue';
import Composer from '@/components/Chat/Composer.vue';

export default {
  components: {
    Simplebar,
    Announcement,
    Bubble,
    Composer,
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    ...mapGetters({
      peerId: 'peer/id',
      messages: 'chat/messages',
    }),
  },

  watch: {
    messages() {
      this.scrollToBottom();
    },
  },

  methods: {
    onMessage(content) {
      const message = new Message(this.peerId, content);

      this.$emit('message', message);
    },

    scrollToBottom() {
      const { scrollElement: el } = this.$refs.chats;

      this.$nextTick(() => {
        el.scrollTop = el.scrollHeight;
      });
    },
  },
};
</script>

<style lang="sass" scoped>
@import @/assets/sass/commons.sass
@import ~simplebar/dist/simplebar.min.css

.chatbox
  display: flex
  flex-direction: column

.chats
  display: flex
  flex-direction: column-reverse
  padding: 2rem 2rem 0 2rem
  height: 0
  flex: 1

  +mobile
    mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 95%, transparent 100%)

  &::v-deep .simplebar-offset
    display: flex
    flex-direction: column-reverse

.composer
  padding: 1rem 2rem 2rem 2rem
</style>
