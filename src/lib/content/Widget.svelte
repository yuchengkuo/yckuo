<script lang="ts">
  interface Props {
    component: string
  }

  let { component }: Props = $props()
</script>

{#await import(`../widget/${component}.svelte`)}
  <div>Loading</div>
{:then component}
  <component.default />
{:catch e}
  <p>Failed importing Widget. {e}</p>
{/await}
