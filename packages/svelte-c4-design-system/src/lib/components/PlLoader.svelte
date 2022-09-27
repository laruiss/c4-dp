<script>
export let variant = ''
export let small = false
$:modifierClass = [
  ...(variant ? [variant] : [] ),
  ...(small ? ['small'] : []),
].filter(val => !!val).map(val => `loader--${val}`).join(' ')
</script>

<svelte:options tag="c4-loader" />
  
<div
  class={`loader ${modifierClass}`}
  aria-label="loading"
  role="status"
/>

<style lang="scss">
@keyframes spin {

  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.loader {
  margin: 0 auto;
  border-radius: 50%;
  // width: $base-line-height;
  // height: $base-line-height;
  border: 2px solid $off-night-blue;
  // border: 0.25rem solid $off-night-blue;
  border-top-color: $night-blue;
  animation: spin 1s infinite linear;

  &--fixed {
    position: fixed;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }

  &-wrapper {
    position: fixed;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: +1000;
  }

  &--small {
    width: $ds-icon-sizing-l;
    height: $ds-icon-sizing-l;
  }
}
</style>
