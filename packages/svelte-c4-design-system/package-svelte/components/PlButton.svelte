<script>
import PlLoader from './PlLoader.svelte'
import { createEventDispatcher } from 'svelte'

/** @type {'main' | 'promotion' | 'loyalty' | 'monochrome' | 'negative'} */
export let tone = 'main'
/** @type {'primary' | 'secondary' | 'tertiary' | 'tertiary-small'} */
export let variation = 'primary'
/** @type {'' | '_self' | '_blank'} */
export let target = ''
/** @type {'button' | 'reset' | 'submit'} */
export let type = 'button'

export let reversed = false
export let fullWidth = false
export let disabled = false
export let loading = false
export let loadingAriaLabel = 'loading'

/** @type {string | null} */
export let href = null
/** @type {string | null} */
export let ariaLabel = null

/** @type {'a' | 'button'} */
$: htmlTag = href !== null ? 'a' : 'button'
/** @type {string | null} */
$: ariaLabelValue = loading ? 'loading' : ariaLabel

const dispatch = createEventDispatcher()

/** @type {(event: MouseEvent) => void} */
function onClick(event) {
  if (!disabled && !loading) dispatch('click', event)
}

function hasPrependSlot() {
  return !!$$slots.prepend
}

function hasAppendSlot() {
  return !!$$slots.append
}
</script>
  
<svelte:element this="{htmlTag}"
  aria-live="polite"
  class="{[
    'pl-button',
    `pl-button--tone-${tone}`,
    `pl-button--variation-${variation}`,
    loading && 'pl-button--loading',
    reversed && 'pl-button--reversed',
    disabled && 'pl-button--disabled',
    fullWidth && 'pl-button--full-width',
  ].join(' ')}"
  disabled="{disabled || loading}"
  aria-disabled="{disabled || loading}"
  aria-label="{ariaLabelValue}"
  tabindex="{disabled ? -1 : undefined}"
  href="{htmlTag === 'a' ? href : null}"
  target="{htmlTag === 'a' ? target : null}"
  type="{htmlTag === 'button' ? type : null}"
  on:click="{onClick}"
>
  <span class="pl-button__content">
    {#if hasPrependSlot()}
    <span
      class="pl-button__icon-container"
    >
      <!-- @slot prepend (use it to insert an icon before the text) -->
      <slot name="prepend"/>
    </span>
    {/if}
    <!-- @slot default slot (button text) -->
    <slot />
    {#if hasAppendSlot()}
    <span
      class="pl-button__icon-container"
    >
      <!-- @slot append (use it to insert an icon after the text) -->
      <slot name="append" />
    </span>
    {/if}
  </span>
  {#if loading}
  <div class="pl-button__loader__container">
    <PlLoader class="pl-button__loader" />
  </div>
  {/if}
</svelte:element>

<style>.pl-button {
  width: auto;
  cursor: pointer;
  position: relative;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  font-size: 1rem;
  border-radius: 4px;
  font-weight: 700;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s, color 0.3s;
}
.pl-button__content {
  width: 100%;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  display: inline-flex;
  justify-content: center;
}
.pl-button--full-width {
  width: 100%;
}
.pl-button--disabled {
  opacity: 0.5;
  cursor: initial;
  pointer-events: none;
}
.pl-button--loading {
  cursor: initial;
  pointer-events: none;
}
.pl-button--loading .pl-button__content {
  opacity: 0;
}
.pl-button__icon-container {
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.125rem;
}
.pl-button__icon-container svg, .pl-button__icon-container img {
  width: 100%;
  height: 100%;
}
.pl-button__loader {
  width: 100%;
  height: 100%;
  border-width: 2px;
  border-top-color: #fff;
}
.pl-button__loader__container {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  position: absolute;
  width: 1.5rem;
  height: 1.5rem;
  padding: 0.125rem;
}
.pl-button--variation-primary {
  color: #fff;
}
.pl-button--variation-primary svg {
  fill: #fff;
}
.pl-button--variation-secondary {
  background-color: #fff;
}
.pl-button--variation-secondary svg {
  fill: #fff;
}
.pl-button--variation-tertiary {
  padding: 0;
  border: none;
  background: none;
  font-size: 1rem;
}
.pl-button--variation-tertiary-small {
  padding: 0;
  border: none;
  background: none;
  font-size: 0.875rem;
}
.pl-button--variation-tertiary-small__icon-container {
  width: 1rem;
  height: 1rem;
}
.pl-button--reversed.pl-button--variation-secondary, .pl-button--reversed.pl-button--variation-tertiary, .pl-button--reversed.pl-button--variation-tertiary-small {
  background: none;
  color: #fff;
  border: 1px solid #fff;
}
.pl-button--reversed.pl-button--variation-secondary svg, .pl-button--reversed.pl-button--variation-tertiary svg, .pl-button--reversed.pl-button--variation-tertiary-small svg {
  color: #fff;
}
.pl-button--reversed.pl-button--variation-secondary .pl-button__loader, .pl-button--reversed.pl-button--variation-tertiary .pl-button__loader, .pl-button--reversed.pl-button--variation-tertiary-small .pl-button__loader {
  border-left-color: #fff;
  border-right-color: #fff;
  border-bottom-color: #fff;
  border-top-color: #121212;
}
.pl-button--reversed.pl-button--variation-secondary:hover, .pl-button--reversed.pl-button--variation-secondary:focus, .pl-button--reversed.pl-button--variation-tertiary:hover, .pl-button--reversed.pl-button--variation-tertiary:focus, .pl-button--reversed.pl-button--variation-tertiary-small:hover, .pl-button--reversed.pl-button--variation-tertiary-small:focus {
  color: #e6e6e6;
  border: 1px solid #e6e6e6;
}
.pl-button--reversed.pl-button--variation-secondary:hover svg, .pl-button--reversed.pl-button--variation-secondary:focus svg, .pl-button--reversed.pl-button--variation-tertiary:hover svg, .pl-button--reversed.pl-button--variation-tertiary:focus svg, .pl-button--reversed.pl-button--variation-tertiary-small:hover svg, .pl-button--reversed.pl-button--variation-tertiary-small:focus svg {
  color: #e6e6e6;
}
.pl-button:focus-visible {
  outline: 2px solid #0970e6;
  outline-offset: 0.125rem;
}
.pl-button--reversed.pl-button--variation-tertiary, .pl-button--reversed.pl-button--variation-tertiary:hover, .pl-button--reversed.pl-button--variation-tertiary:focus, .pl-button--reversed.pl-button--variation-tertiary-small, .pl-button--reversed.pl-button--variation-tertiary-small:hover, .pl-button--reversed.pl-button--variation-tertiary-small:focus {
  border: none;
}
.pl-button--tone-main.pl-button--variation-primary {
  background-color: #0970e6;
  border: 1px solid #0970e6;
}
.pl-button--tone-main.pl-button--variation-primary:hover, .pl-button--tone-main.pl-button--variation-primary:focus {
  background-color: #0863cc;
  border: 1px solid #0863cc;
}
.pl-button--tone-main.pl-button--variation-primary:active {
  background-color: #0757b2;
  border: 1px solid #0757b2;
}
.pl-button--tone-main.pl-button--variation-primary .pl-button__loader {
  border-top-color: #0970e6;
  border-left-color: #fff;
  border-right-color: #fff;
  border-bottom-color: #fff;
}
.pl-button--tone-main.pl-button--variation-secondary:not(.pl-button--reversed) {
  color: #0970e6;
  border: 1px solid #0970e6;
}
.pl-button--tone-main.pl-button--variation-secondary:not(.pl-button--reversed) svg {
  fill: #0970e6;
}
.pl-button--tone-main.pl-button--variation-secondary:not(.pl-button--reversed) .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #0970e6;
  border-right-color: #0970e6;
  border-bottom-color: #0970e6;
}
.pl-button--tone-main.pl-button--variation-secondary:not(.pl-button--reversed):hover, .pl-button--tone-main.pl-button--variation-secondary:not(.pl-button--reversed):focus {
  color: #0863cc;
  border: 1px solid #0863cc;
}
.pl-button--tone-main.pl-button--variation-secondary:not(.pl-button--reversed):hover svg, .pl-button--tone-main.pl-button--variation-secondary:not(.pl-button--reversed):focus svg {
  color: #0863cc;
}
.pl-button--tone-main.pl-button--variation-secondary:not(.pl-button--reversed):active {
  color: #0757b2;
  border-left-color: #0757b2;
  border-right-color: #0757b2;
  border-bottom-color: #0757b2;
}
.pl-button--tone-main.pl-button--variation-tertiary:not(.pl-button--reversed), .pl-button--tone-main.pl-button--variation-tertiary-small:not(.pl-button--reversed) {
  color: #0970e6;
}
.pl-button--tone-main.pl-button--variation-tertiary:not(.pl-button--reversed) svg, .pl-button--tone-main.pl-button--variation-tertiary-small:not(.pl-button--reversed) svg {
  color: #0970e6;
}
.pl-button--tone-main.pl-button--variation-tertiary:not(.pl-button--reversed) .pl-button__loader, .pl-button--tone-main.pl-button--variation-tertiary-small:not(.pl-button--reversed) .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #0970e6;
  border-right-color: #0970e6;
  border-bottom-color: #0970e6;
}
.pl-button--tone-main.pl-button--variation-tertiary:not(.pl-button--reversed):hover, .pl-button--tone-main.pl-button--variation-tertiary:not(.pl-button--reversed):focus, .pl-button--tone-main.pl-button--variation-tertiary-small:not(.pl-button--reversed):hover, .pl-button--tone-main.pl-button--variation-tertiary-small:not(.pl-button--reversed):focus {
  color: #0863cc;
}
.pl-button--tone-main.pl-button--variation-tertiary:not(.pl-button--reversed):hover svg, .pl-button--tone-main.pl-button--variation-tertiary:not(.pl-button--reversed):focus svg, .pl-button--tone-main.pl-button--variation-tertiary-small:not(.pl-button--reversed):hover svg, .pl-button--tone-main.pl-button--variation-tertiary-small:not(.pl-button--reversed):focus svg {
  color: #0863cc;
}
.pl-button--tone-main.pl-button--variation-tertiary:not(.pl-button--reversed):active, .pl-button--tone-main.pl-button--variation-tertiary-small:not(.pl-button--reversed):active {
  color: #0757b2;
}
.pl-button--reversed.pl-button--tone-main.pl-button--variation-primary, .pl-button--reversed.pl-button--tone-main.pl-button--variation-primary svg {
  color: #0970e6;
  background-color: #fff;
}
.pl-button--reversed.pl-button--tone-main.pl-button--variation-primary .pl-button__loader, .pl-button--reversed.pl-button--tone-main.pl-button--variation-primary svg .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #0970e6;
  border-right-color: #0970e6;
  border-bottom-color: #0970e6;
}
.pl-button--reversed.pl-button--tone-main.pl-button--variation-primary:hover, .pl-button--reversed.pl-button--tone-main.pl-button--variation-primary:focus, .pl-button--reversed.pl-button--tone-main.pl-button--variation-primary svg:hover, .pl-button--reversed.pl-button--tone-main.pl-button--variation-primary svg:focus {
  color: #0863cc;
}
.pl-button--reversed.pl-button--tone-main.pl-button--variation-primary:active, .pl-button--reversed.pl-button--tone-main.pl-button--variation-primary svg:active {
  color: #0757b2;
}
.pl-button--tone-loyalty.pl-button--variation-primary {
  background-color: #004f9b;
  border: 1px solid #004f9b;
}
.pl-button--tone-loyalty.pl-button--variation-primary:hover, .pl-button--tone-loyalty.pl-button--variation-primary:focus {
  background-color: #004282;
  border: 1px solid #004282;
}
.pl-button--tone-loyalty.pl-button--variation-primary:active {
  background-color: #003569;
  border: 1px solid #003569;
}
.pl-button--tone-loyalty.pl-button--variation-primary .pl-button__loader {
  border-top-color: #004f9b;
  border-left-color: #fff;
  border-right-color: #fff;
  border-bottom-color: #fff;
}
.pl-button--tone-loyalty.pl-button--variation-secondary:not(.pl-button--reversed) {
  color: #004f9b;
  border: 1px solid #004f9b;
}
.pl-button--tone-loyalty.pl-button--variation-secondary:not(.pl-button--reversed) svg {
  fill: #004f9b;
}
.pl-button--tone-loyalty.pl-button--variation-secondary:not(.pl-button--reversed) .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #004f9b;
  border-right-color: #004f9b;
  border-bottom-color: #004f9b;
}
.pl-button--tone-loyalty.pl-button--variation-secondary:not(.pl-button--reversed):hover, .pl-button--tone-loyalty.pl-button--variation-secondary:not(.pl-button--reversed):focus {
  color: #004282;
  border: 1px solid #004282;
}
.pl-button--tone-loyalty.pl-button--variation-secondary:not(.pl-button--reversed):hover svg, .pl-button--tone-loyalty.pl-button--variation-secondary:not(.pl-button--reversed):focus svg {
  color: #004282;
}
.pl-button--tone-loyalty.pl-button--variation-secondary:not(.pl-button--reversed):active {
  color: #003569;
  border-left-color: #003569;
  border-right-color: #003569;
  border-bottom-color: #003569;
}
.pl-button--tone-loyalty.pl-button--variation-tertiary:not(.pl-button--reversed), .pl-button--tone-loyalty.pl-button--variation-tertiary-small:not(.pl-button--reversed) {
  color: #004f9b;
}
.pl-button--tone-loyalty.pl-button--variation-tertiary:not(.pl-button--reversed) svg, .pl-button--tone-loyalty.pl-button--variation-tertiary-small:not(.pl-button--reversed) svg {
  color: #004f9b;
}
.pl-button--tone-loyalty.pl-button--variation-tertiary:not(.pl-button--reversed) .pl-button__loader, .pl-button--tone-loyalty.pl-button--variation-tertiary-small:not(.pl-button--reversed) .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #004f9b;
  border-right-color: #004f9b;
  border-bottom-color: #004f9b;
}
.pl-button--tone-loyalty.pl-button--variation-tertiary:not(.pl-button--reversed):hover, .pl-button--tone-loyalty.pl-button--variation-tertiary:not(.pl-button--reversed):focus, .pl-button--tone-loyalty.pl-button--variation-tertiary-small:not(.pl-button--reversed):hover, .pl-button--tone-loyalty.pl-button--variation-tertiary-small:not(.pl-button--reversed):focus {
  color: #004282;
}
.pl-button--tone-loyalty.pl-button--variation-tertiary:not(.pl-button--reversed):hover svg, .pl-button--tone-loyalty.pl-button--variation-tertiary:not(.pl-button--reversed):focus svg, .pl-button--tone-loyalty.pl-button--variation-tertiary-small:not(.pl-button--reversed):hover svg, .pl-button--tone-loyalty.pl-button--variation-tertiary-small:not(.pl-button--reversed):focus svg {
  color: #004282;
}
.pl-button--tone-loyalty.pl-button--variation-tertiary:not(.pl-button--reversed):active, .pl-button--tone-loyalty.pl-button--variation-tertiary-small:not(.pl-button--reversed):active {
  color: #003569;
}
.pl-button--reversed.pl-button--tone-loyalty.pl-button--variation-primary, .pl-button--reversed.pl-button--tone-loyalty.pl-button--variation-primary svg {
  color: #004f9b;
  background-color: #fff;
}
.pl-button--reversed.pl-button--tone-loyalty.pl-button--variation-primary .pl-button__loader, .pl-button--reversed.pl-button--tone-loyalty.pl-button--variation-primary svg .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #004f9b;
  border-right-color: #004f9b;
  border-bottom-color: #004f9b;
}
.pl-button--reversed.pl-button--tone-loyalty.pl-button--variation-primary:hover, .pl-button--reversed.pl-button--tone-loyalty.pl-button--variation-primary:focus, .pl-button--reversed.pl-button--tone-loyalty.pl-button--variation-primary svg:hover, .pl-button--reversed.pl-button--tone-loyalty.pl-button--variation-primary svg:focus {
  color: #004282;
}
.pl-button--reversed.pl-button--tone-loyalty.pl-button--variation-primary:active, .pl-button--reversed.pl-button--tone-loyalty.pl-button--variation-primary svg:active {
  color: #003569;
}
.pl-button--tone-negative.pl-button--variation-primary {
  background-color: #aa0d11;
  border: 1px solid #aa0d11;
}
.pl-button--tone-negative.pl-button--variation-primary:hover, .pl-button--tone-negative.pl-button--variation-primary:focus {
  background-color: #910b0f;
  border: 1px solid #910b0f;
}
.pl-button--tone-negative.pl-button--variation-primary:active {
  background-color: #78090c;
  border: 1px solid #78090c;
}
.pl-button--tone-negative.pl-button--variation-primary .pl-button__loader {
  border-top-color: #aa0d11;
  border-left-color: #fff;
  border-right-color: #fff;
  border-bottom-color: #fff;
}
.pl-button--tone-negative.pl-button--variation-secondary:not(.pl-button--reversed) {
  color: #aa0d11;
  border: 1px solid #aa0d11;
}
.pl-button--tone-negative.pl-button--variation-secondary:not(.pl-button--reversed) svg {
  fill: #aa0d11;
}
.pl-button--tone-negative.pl-button--variation-secondary:not(.pl-button--reversed) .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #aa0d11;
  border-right-color: #aa0d11;
  border-bottom-color: #aa0d11;
}
.pl-button--tone-negative.pl-button--variation-secondary:not(.pl-button--reversed):hover, .pl-button--tone-negative.pl-button--variation-secondary:not(.pl-button--reversed):focus {
  color: #910b0f;
  border: 1px solid #910b0f;
}
.pl-button--tone-negative.pl-button--variation-secondary:not(.pl-button--reversed):hover svg, .pl-button--tone-negative.pl-button--variation-secondary:not(.pl-button--reversed):focus svg {
  color: #910b0f;
}
.pl-button--tone-negative.pl-button--variation-secondary:not(.pl-button--reversed):active {
  color: #78090c;
  border-left-color: #78090c;
  border-right-color: #78090c;
  border-bottom-color: #78090c;
}
.pl-button--tone-negative.pl-button--variation-tertiary:not(.pl-button--reversed), .pl-button--tone-negative.pl-button--variation-tertiary-small:not(.pl-button--reversed) {
  color: #aa0d11;
}
.pl-button--tone-negative.pl-button--variation-tertiary:not(.pl-button--reversed) svg, .pl-button--tone-negative.pl-button--variation-tertiary-small:not(.pl-button--reversed) svg {
  color: #aa0d11;
}
.pl-button--tone-negative.pl-button--variation-tertiary:not(.pl-button--reversed) .pl-button__loader, .pl-button--tone-negative.pl-button--variation-tertiary-small:not(.pl-button--reversed) .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #aa0d11;
  border-right-color: #aa0d11;
  border-bottom-color: #aa0d11;
}
.pl-button--tone-negative.pl-button--variation-tertiary:not(.pl-button--reversed):hover, .pl-button--tone-negative.pl-button--variation-tertiary:not(.pl-button--reversed):focus, .pl-button--tone-negative.pl-button--variation-tertiary-small:not(.pl-button--reversed):hover, .pl-button--tone-negative.pl-button--variation-tertiary-small:not(.pl-button--reversed):focus {
  color: #910b0f;
}
.pl-button--tone-negative.pl-button--variation-tertiary:not(.pl-button--reversed):hover svg, .pl-button--tone-negative.pl-button--variation-tertiary:not(.pl-button--reversed):focus svg, .pl-button--tone-negative.pl-button--variation-tertiary-small:not(.pl-button--reversed):hover svg, .pl-button--tone-negative.pl-button--variation-tertiary-small:not(.pl-button--reversed):focus svg {
  color: #910b0f;
}
.pl-button--tone-negative.pl-button--variation-tertiary:not(.pl-button--reversed):active, .pl-button--tone-negative.pl-button--variation-tertiary-small:not(.pl-button--reversed):active {
  color: #78090c;
}
.pl-button--reversed.pl-button--tone-negative.pl-button--variation-primary, .pl-button--reversed.pl-button--tone-negative.pl-button--variation-primary svg {
  color: #aa0d11;
  background-color: #fff;
}
.pl-button--reversed.pl-button--tone-negative.pl-button--variation-primary .pl-button__loader, .pl-button--reversed.pl-button--tone-negative.pl-button--variation-primary svg .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #aa0d11;
  border-right-color: #aa0d11;
  border-bottom-color: #aa0d11;
}
.pl-button--reversed.pl-button--tone-negative.pl-button--variation-primary:hover, .pl-button--reversed.pl-button--tone-negative.pl-button--variation-primary:focus, .pl-button--reversed.pl-button--tone-negative.pl-button--variation-primary svg:hover, .pl-button--reversed.pl-button--tone-negative.pl-button--variation-primary svg:focus {
  color: #910b0f;
}
.pl-button--reversed.pl-button--tone-negative.pl-button--variation-primary:active, .pl-button--reversed.pl-button--tone-negative.pl-button--variation-primary svg:active {
  color: #78090c;
}
.pl-button--tone-promotion.pl-button--variation-primary {
  background-color: #d30d1f;
  border: 1px solid #d30d1f;
}
.pl-button--tone-promotion.pl-button--variation-primary:hover, .pl-button--tone-promotion.pl-button--variation-primary:focus {
  background-color: #ba0b1b;
  border: 1px solid #ba0b1b;
}
.pl-button--tone-promotion.pl-button--variation-primary:active {
  background-color: #a10a18;
  border: 1px solid #a10a18;
}
.pl-button--tone-promotion.pl-button--variation-primary .pl-button__loader {
  border-top-color: #d30d1f;
  border-left-color: #fff;
  border-right-color: #fff;
  border-bottom-color: #fff;
}
.pl-button--tone-promotion.pl-button--variation-secondary:not(.pl-button--reversed) {
  color: #d30d1f;
  border: 1px solid #d30d1f;
}
.pl-button--tone-promotion.pl-button--variation-secondary:not(.pl-button--reversed) svg {
  fill: #d30d1f;
}
.pl-button--tone-promotion.pl-button--variation-secondary:not(.pl-button--reversed) .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #d30d1f;
  border-right-color: #d30d1f;
  border-bottom-color: #d30d1f;
}
.pl-button--tone-promotion.pl-button--variation-secondary:not(.pl-button--reversed):hover, .pl-button--tone-promotion.pl-button--variation-secondary:not(.pl-button--reversed):focus {
  color: #ba0b1b;
  border: 1px solid #ba0b1b;
}
.pl-button--tone-promotion.pl-button--variation-secondary:not(.pl-button--reversed):hover svg, .pl-button--tone-promotion.pl-button--variation-secondary:not(.pl-button--reversed):focus svg {
  color: #ba0b1b;
}
.pl-button--tone-promotion.pl-button--variation-secondary:not(.pl-button--reversed):active {
  color: #a10a18;
  border-left-color: #a10a18;
  border-right-color: #a10a18;
  border-bottom-color: #a10a18;
}
.pl-button--tone-promotion.pl-button--variation-tertiary:not(.pl-button--reversed), .pl-button--tone-promotion.pl-button--variation-tertiary-small:not(.pl-button--reversed) {
  color: #d30d1f;
}
.pl-button--tone-promotion.pl-button--variation-tertiary:not(.pl-button--reversed) svg, .pl-button--tone-promotion.pl-button--variation-tertiary-small:not(.pl-button--reversed) svg {
  color: #d30d1f;
}
.pl-button--tone-promotion.pl-button--variation-tertiary:not(.pl-button--reversed) .pl-button__loader, .pl-button--tone-promotion.pl-button--variation-tertiary-small:not(.pl-button--reversed) .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #d30d1f;
  border-right-color: #d30d1f;
  border-bottom-color: #d30d1f;
}
.pl-button--tone-promotion.pl-button--variation-tertiary:not(.pl-button--reversed):hover, .pl-button--tone-promotion.pl-button--variation-tertiary:not(.pl-button--reversed):focus, .pl-button--tone-promotion.pl-button--variation-tertiary-small:not(.pl-button--reversed):hover, .pl-button--tone-promotion.pl-button--variation-tertiary-small:not(.pl-button--reversed):focus {
  color: #ba0b1b;
}
.pl-button--tone-promotion.pl-button--variation-tertiary:not(.pl-button--reversed):hover svg, .pl-button--tone-promotion.pl-button--variation-tertiary:not(.pl-button--reversed):focus svg, .pl-button--tone-promotion.pl-button--variation-tertiary-small:not(.pl-button--reversed):hover svg, .pl-button--tone-promotion.pl-button--variation-tertiary-small:not(.pl-button--reversed):focus svg {
  color: #ba0b1b;
}
.pl-button--tone-promotion.pl-button--variation-tertiary:not(.pl-button--reversed):active, .pl-button--tone-promotion.pl-button--variation-tertiary-small:not(.pl-button--reversed):active {
  color: #a10a18;
}
.pl-button--reversed.pl-button--tone-promotion.pl-button--variation-primary, .pl-button--reversed.pl-button--tone-promotion.pl-button--variation-primary svg {
  color: #d30d1f;
  background-color: #fff;
}
.pl-button--reversed.pl-button--tone-promotion.pl-button--variation-primary .pl-button__loader, .pl-button--reversed.pl-button--tone-promotion.pl-button--variation-primary svg .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #d30d1f;
  border-right-color: #d30d1f;
  border-bottom-color: #d30d1f;
}
.pl-button--reversed.pl-button--tone-promotion.pl-button--variation-primary:hover, .pl-button--reversed.pl-button--tone-promotion.pl-button--variation-primary:focus, .pl-button--reversed.pl-button--tone-promotion.pl-button--variation-primary svg:hover, .pl-button--reversed.pl-button--tone-promotion.pl-button--variation-primary svg:focus {
  color: #ba0b1b;
}
.pl-button--reversed.pl-button--tone-promotion.pl-button--variation-primary:active, .pl-button--reversed.pl-button--tone-promotion.pl-button--variation-primary svg:active {
  color: #a10a18;
}
.pl-button--tone-monochrome.pl-button--variation-primary {
  background-color: #121212;
  border: 1px solid #121212;
}
.pl-button--tone-monochrome.pl-button--variation-primary:hover, .pl-button--tone-monochrome.pl-button--variation-primary:focus {
  background-color: #2b2b2b;
  border: 1px solid #2b2b2b;
}
.pl-button--tone-monochrome.pl-button--variation-primary:active {
  background-color: #454545;
  border: 1px solid #454545;
}
.pl-button--tone-monochrome.pl-button--variation-primary .pl-button__loader {
  border-top-color: #121212;
  border-left-color: #fff;
  border-right-color: #fff;
  border-bottom-color: #fff;
}
.pl-button--tone-monochrome.pl-button--variation-secondary:not(.pl-button--reversed) {
  color: #121212;
  border: 1px solid #121212;
}
.pl-button--tone-monochrome.pl-button--variation-secondary:not(.pl-button--reversed) svg {
  fill: #121212;
}
.pl-button--tone-monochrome.pl-button--variation-secondary:not(.pl-button--reversed) .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #121212;
  border-right-color: #121212;
  border-bottom-color: #121212;
}
.pl-button--tone-monochrome.pl-button--variation-secondary:not(.pl-button--reversed):hover, .pl-button--tone-monochrome.pl-button--variation-secondary:not(.pl-button--reversed):focus {
  color: #2b2b2b;
  border: 1px solid #2b2b2b;
}
.pl-button--tone-monochrome.pl-button--variation-secondary:not(.pl-button--reversed):hover svg, .pl-button--tone-monochrome.pl-button--variation-secondary:not(.pl-button--reversed):focus svg {
  color: #2b2b2b;
}
.pl-button--tone-monochrome.pl-button--variation-secondary:not(.pl-button--reversed):active {
  color: #454545;
  border-left-color: #454545;
  border-right-color: #454545;
  border-bottom-color: #454545;
}
.pl-button--tone-monochrome.pl-button--variation-tertiary:not(.pl-button--reversed), .pl-button--tone-monochrome.pl-button--variation-tertiary-small:not(.pl-button--reversed) {
  color: #121212;
}
.pl-button--tone-monochrome.pl-button--variation-tertiary:not(.pl-button--reversed) svg, .pl-button--tone-monochrome.pl-button--variation-tertiary-small:not(.pl-button--reversed) svg {
  color: #121212;
}
.pl-button--tone-monochrome.pl-button--variation-tertiary:not(.pl-button--reversed) .pl-button__loader, .pl-button--tone-monochrome.pl-button--variation-tertiary-small:not(.pl-button--reversed) .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #121212;
  border-right-color: #121212;
  border-bottom-color: #121212;
}
.pl-button--tone-monochrome.pl-button--variation-tertiary:not(.pl-button--reversed):hover, .pl-button--tone-monochrome.pl-button--variation-tertiary:not(.pl-button--reversed):focus, .pl-button--tone-monochrome.pl-button--variation-tertiary-small:not(.pl-button--reversed):hover, .pl-button--tone-monochrome.pl-button--variation-tertiary-small:not(.pl-button--reversed):focus {
  color: #2b2b2b;
}
.pl-button--tone-monochrome.pl-button--variation-tertiary:not(.pl-button--reversed):hover svg, .pl-button--tone-monochrome.pl-button--variation-tertiary:not(.pl-button--reversed):focus svg, .pl-button--tone-monochrome.pl-button--variation-tertiary-small:not(.pl-button--reversed):hover svg, .pl-button--tone-monochrome.pl-button--variation-tertiary-small:not(.pl-button--reversed):focus svg {
  color: #2b2b2b;
}
.pl-button--tone-monochrome.pl-button--variation-tertiary:not(.pl-button--reversed):active, .pl-button--tone-monochrome.pl-button--variation-tertiary-small:not(.pl-button--reversed):active {
  color: #454545;
}
.pl-button--reversed.pl-button--tone-monochrome.pl-button--variation-primary, .pl-button--reversed.pl-button--tone-monochrome.pl-button--variation-primary svg {
  color: #121212;
  background-color: #fff;
}
.pl-button--reversed.pl-button--tone-monochrome.pl-button--variation-primary .pl-button__loader, .pl-button--reversed.pl-button--tone-monochrome.pl-button--variation-primary svg .pl-button__loader {
  border-top-color: #fff;
  border-left-color: #121212;
  border-right-color: #121212;
  border-bottom-color: #121212;
}
.pl-button--reversed.pl-button--tone-monochrome.pl-button--variation-primary:hover, .pl-button--reversed.pl-button--tone-monochrome.pl-button--variation-primary:focus, .pl-button--reversed.pl-button--tone-monochrome.pl-button--variation-primary svg:hover, .pl-button--reversed.pl-button--tone-monochrome.pl-button--variation-primary svg:focus {
  color: #2b2b2b;
}
.pl-button--reversed.pl-button--tone-monochrome.pl-button--variation-primary:active, .pl-button--reversed.pl-button--tone-monochrome.pl-button--variation-primary svg:active {
  color: #454545;
}</style>
