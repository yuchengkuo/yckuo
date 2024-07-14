<script lang="ts">
  export let component: string
</script>

{#await import(`../widget/${component}.svelte`)}
  <div>Loading</div>
{:then component}
  <svelte:component this={component.default} />
{:catch e}
  <p>Failed importing Widget. {e}</p>
{/await}
