<script lang="ts">
  import type { ComponentType } from 'svelte'

  interface Props {
    condition: boolean
    wrapper: ComponentType | string
    children?: import('svelte').Snippet
    [key: string]: any
  }

  let { condition, wrapper, children, ...rest }: Props = $props()
</script>

{#if condition}
  {#if typeof wrapper === 'string'}
    <svelte:element this={wrapper} {...rest}>
      {@render children?.()}
    </svelte:element>
  {:else}
    {@const SvelteComponent = wrapper}
    <SvelteComponent {...rest}>
      {@render children?.()}
    </SvelteComponent>
  {/if}
{:else}
  {@render children?.()}
{/if}
