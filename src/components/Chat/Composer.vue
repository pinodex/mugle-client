<template>
  <form
    @submit.prevent="submit"
  >
    <div class="field is-grouped">
      <p class="control is-expanded">
        <input
          class="input is-rounded message-input"
          type="text"
          placeholder="Type a message"
          v-model="content"
          :disabled="disabled"
        />
      </p>

      <p class="control">
        <button
          class="button is-outlined is-rounded send-button"
          :disabled="disabled"
        >
          <span class="icon ">
            <img svg-inline src="@/assets/img/send.svg" />
          </span>
        </button>
      </p>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    content: null,
  }),

  methods: {
    submit() {
      if (this.content) {
        this.$emit('message', this.content);

        this.content = null;
      }
    },
  },
};
</script>

<style lang="sass" scoped>
@import @/assets/sass/commons.sass

.message-input
  &:hover,
  &:focus
    border-color: unset

  +mobile
    background-color: transparent
    color: $white

    &::placeholder
      color: $grey-lightest

.send-button
  width: 40px
</style>
