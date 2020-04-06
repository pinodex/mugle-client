<template>
  <div class="lds-ripple">
    <div></div>
    <div></div>
  </div>
</template>

<style lang="sass" scoped>
.lds-ripple
  display: inline-block
  position: relative
  width: 100px
  height: 100px

  div
    position: absolute
    border: 4px solid #fff
    opacity: 1
    border-radius: 50%
    animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite

    &:nth-child(2)
      animation-delay: -0.5s

@keyframes lds-ripple
  0%
    top: 50px
    left: 50px
    width: 0
    height: 0
    opacity: 1

  100%
    top: 0px
    left: 0px
    width: 100px
    height: 100px
    opacity: 0
</style>
