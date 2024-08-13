<script lang="ts">
  import type { ComponentType } from 'svelte'

  export let condition: boolean
  export let wrapper: ComponentType | string
</script>

{#if condition}
  {#if typeof wrapper === 'string'}
    <svelte:element this={wrapper} {...$$restProps}>
      <slot />
    </svelte:element>
  {:else}
    <svelte:component this={wrapper} {...$$restProps}>
      <slot />
    </svelte:component>
  {/if}
{:else}
  <slot />
{/if}
