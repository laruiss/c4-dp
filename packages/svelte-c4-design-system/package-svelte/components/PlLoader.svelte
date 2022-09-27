<script>
export let variant = ''
export let small = false
$:modifierClass = [
  ...(variant ? [variant] : [] ),
  ...(small ? ['small'] : []),
].filter(val => !!val).map(val => `loader--${val}`).join(' ')
</script>
  
<div
  class={`loader ${modifierClass}`}
  aria-label="loading"
  role="status"
/>

<style>@keyframes spin {
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
  border: 2px solid rgba(14, 51, 104, 0.4);
  border-top-color: #0e3368;
  animation: spin 1s infinite linear;
}
.loader--fixed {
  position: fixed;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.loader-wrapper {
  position: fixed;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1000;
}
.loader--small {
  width: 2rem;
  height: 2rem;
}</style>
