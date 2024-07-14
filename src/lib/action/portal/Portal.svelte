<script lang="ts">
  import portal from './action'

  export let target = 'body'
</script>

<div use:portal={target} data-portal-hidden>
  <slot />
</div>
