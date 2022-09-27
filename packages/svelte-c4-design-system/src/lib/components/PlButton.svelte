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

<svelte:options tag="c4-button" />
  
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

<style lang="scss">
.pl-button {
  width: auto;
  cursor: pointer;
  position: relative;
  align-items: center;
  display: inline-flex;
  justify-content: center;
  font-size: $ds-font-size-m;
  border-radius: $ds-radius-m;
  font-weight: $ds-font-weight-bold;
  padding: $ds-spacing-xs $ds-spacing-s;

  transition: background-color 0.3s, color 0.3s;

  &__content {
    width: 100%;
    flex-direction: row;
    align-items: center;
    gap: $ds-spacing-xs;
    display: inline-flex;
    justify-content: center;
  }

  // Props

  &--full-width {
    width: 100%;
  }

  &--disabled {
    opacity: 0.5;
    cursor: initial;
    pointer-events: none;
  }

  &--loading {
    cursor: initial;
    pointer-events: none;

    .pl-button__content {
      opacity: 0;
    }
  }

  // Icons

  &__icon-container {
    width: $ds-icon-sizing-m;
    height: $ds-icon-sizing-m;
    padding: $ds-spacing-xxxs;

    svg, img {
      width: 100%;
      height: 100%;
    }
  }

  // Loader

  &__loader {
    width: 100%;
    height: 100%;
    border-width: $ds-border-width-2;
    border-top-color: $ds-color-icon-reversed-primary;

    &__container {
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      position: absolute;
      width: $ds-icon-sizing-m;
      height: $ds-icon-sizing-m;
      padding: $ds-spacing-xxxs;
    }
  }

  // Variations

  &--variation-primary {
    color: $ds-color-action-reversed-primary;

    svg {
      fill: $ds-color-action-reversed-primary;
    }
  }

  &--variation-secondary {
    background-color: $ds-color-action-reversed-primary;

    svg {
      fill: $ds-color-action-reversed-primary;
    }
  }

  &--variation-tertiary {
    padding: 0;
    border: none;
    background: none;
    font-size: $ds-font-size-m;

    &-small {
      padding: 0;
      border: none;
      background: none;
      font-size: $ds-font-size-s;

      &__icon-container {
        width: $ds-icon-sizing-s;
        height: $ds-icon-sizing-s;
      }
    }
  }

  // Reversed

  &--reversed#{&}--variation-secondary,
  &--reversed#{&}--variation-tertiary,
  &--reversed#{&}--variation-tertiary-small {
    background: none;
    color: $ds-color-action-reversed-primary;
    border: $ds-border1 $ds-color-action-reversed-primary;

    svg {
      color: $ds-color-action-reversed-primary;
    }

    .pl-button__loader {
      border-left-color: $ds-color-action-reversed-primary;
      border-right-color: $ds-color-action-reversed-primary;
      border-bottom-color: $ds-color-action-reversed-primary;
      border-top-color: $ds-color-background-reversed-primary;
    }

    &:hover,
    &:focus {
      color: $ds-color-action-reversed-primary-hover;
      border: $ds-border1 $ds-color-action-reversed-primary-hover;

      svg {
        color: $ds-color-action-reversed-primary-hover;
      }
    }
  }

  // States

  &:focus-visible {
    outline: $ds-border2 $ds-color-interactive-1;
    outline-offset: $ds-spacing-xxxs;
  }

  &--reversed#{&}--variation-tertiary,
  &--reversed#{&}--variation-tertiary-small {

    &,
    &:hover,
    &:focus {
      border: none;
    }
  }

  // TONES

  $pl-button-colors: (
    main: $ds-color-action-main-primary,
    main-hover: $ds-color-action-main-primary-hover,
    main-active: $ds-color-action-main-primary-active,
    promotion: $ds-color-action-promotion-primary,
    promotion-hover: $ds-color-action-promotion-primary-hover,
    promotion-active: $ds-color-action-promotion-primary-active,
    loyalty: $ds-color-action-loyalty-primary,
    loyalty-hover: $ds-color-action-loyalty-primary-hover,
    loyalty-active: $ds-color-action-loyalty-primary-active,
    monochrome: $ds-color-action-monochrome-primary,
    monochrome-hover: $ds-color-action-monochrome-primary-hover,
    monochrome-active: $ds-color-action-monochrome-primary-active,
    negative: $ds-color-action-negative-primary,
    negative-hover: $ds-color-action-negative-primary-hover,
    negative-active: $ds-color-action-negative-primary-active,
  );

  @mixin pl-button-tone($tone) {

    &--tone-#{$tone}#{&}--variation-primary {
      background-color: map-get($pl-button-colors, #{$tone});
      border: $ds-border1 map-get($pl-button-colors, #{$tone});

      &:hover,
      &:focus {
        background-color: map-get($pl-button-colors, #{$tone}-hover);
        border: $ds-border1 map-get($pl-button-colors, #{$tone}-hover);
      }

      &:active {
        background-color: map-get($pl-button-colors, #{$tone}-active);
        border: $ds-border1 map-get($pl-button-colors, #{$tone}-active);
      }

      .pl-button__loader {
        border-top-color: map-get($pl-button-colors, #{$tone});
        border-left-color: $ds-color-action-reversed-primary;
        border-right-color: $ds-color-action-reversed-primary;
        border-bottom-color: $ds-color-action-reversed-primary;
      }
    }

    &--tone-#{$tone}#{&}--variation-secondary:not(&--reversed) {
      color: map-get($pl-button-colors, #{$tone});
      border: $ds-border1 map-get($pl-button-colors, #{$tone});

      svg {
        fill: map-get($pl-button-colors, #{$tone});
      }

      .pl-button__loader {
        border-top-color: $ds-color-action-reversed-primary;
        border-left-color: map-get($pl-button-colors, #{$tone});
        border-right-color: map-get($pl-button-colors, #{$tone});
        border-bottom-color: map-get($pl-button-colors, #{$tone});
      }

      &:hover,
      &:focus {
        color: map-get($pl-button-colors, #{$tone}-hover);
        border: $ds-border1 map-get($pl-button-colors, #{$tone}-hover);

        svg {
          color: map-get($pl-button-colors, #{$tone}-hover);
        }
      }

      &:active {
        color: map-get($pl-button-colors, #{$tone}-active);
        border-left-color: map-get($pl-button-colors, #{$tone}-active);
        border-right-color: map-get($pl-button-colors, #{$tone}-active);
        border-bottom-color: map-get($pl-button-colors, #{$tone}-active);
      }
    }

    &--tone-#{$tone}#{&}--variation-tertiary:not(&--reversed),
    &--tone-#{$tone}#{&}--variation-tertiary-small:not(&--reversed) {
      color: map-get($pl-button-colors, #{$tone});

      svg {
        color: map-get($pl-button-colors, #{$tone});
      }

      .pl-button__loader {
        border-top-color: $ds-color-action-reversed-primary;
        border-left-color: map-get($pl-button-colors, #{$tone});
        border-right-color: map-get($pl-button-colors, #{$tone});
        border-bottom-color: map-get($pl-button-colors, #{$tone});
      }

      &:hover,
      &:focus {
        color: map-get($pl-button-colors, #{$tone}-hover);

        svg {
          color: map-get($pl-button-colors, #{$tone}-hover);
        }
      }

      &:active {
        color: map-get($pl-button-colors, #{$tone}-active);
      }
    }

    &--reversed#{&}--tone-#{$tone}#{&}--variation-primary,
    &--reversed#{&}--tone-#{$tone}#{&}--variation-primary svg {
      color: map-get($pl-button-colors, #{$tone});
      background-color: $ds-color-action-reversed-primary;

      .pl-button__loader {
        border-top-color: $ds-color-background-main-primary;
        border-left-color: map-get($pl-button-colors, #{$tone});
        border-right-color: map-get($pl-button-colors, #{$tone});
        border-bottom-color: map-get($pl-button-colors, #{$tone});
      }

      &:hover,
      &:focus {
        color: map-get($pl-button-colors, #{$tone}-hover);
      }

      &:active {
        color: map-get($pl-button-colors, #{$tone}-active);
      }
    }
  }

  @include pl-button-tone(main);

  @include pl-button-tone(loyalty);

  @include pl-button-tone(negative);

  @include pl-button-tone(promotion);

  @include pl-button-tone(monochrome);

}
</style>
