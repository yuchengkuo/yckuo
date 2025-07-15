<script lang="ts">
  import portal from './action'

  interface Props {
    target?: string
    children?: import('svelte').Snippet
  }

  let { target = 'body', children }: Props = $props()
</script>

<div use:portal={target} data-portal-hidden>
  {@render children?.()}
</div>
