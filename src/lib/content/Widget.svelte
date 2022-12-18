<script lang="ts">
  export let component: string
</script>

{#await import(`../widget/${component}.svelte`)}
  <div>Loading</div>
{:then component}
  <svelte:component this={component.default} />
{/await}
