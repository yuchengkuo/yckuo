<script lang="ts">
  import Head from '$lib/seo/Head.svelte'

  const boxes = import.meta.glob<any>('./boxes/*.svelte')
</script>

<Head title="Sandbox" description="A little playground.">
  <script>
    document.documentElement.setAttribute('data-theme', 'gray')
  </script>
</Head>

<ul
  class="place-items-center mt-16 mb-40"
  md="grid grid-cols-2"
  xl="grid-cols-3"
  children="min-h-24rem w-full grid place-items-center relative hover:bg-light-400 dark:hover:bg-dark-700"
>
  {#each Object.keys(boxes) as key}
    <li>
      <small
        class="text-xs text-fg-secondary font-600 opacity-0 transition absolute right-1 bottom-1 py-px px-2 bg-surface rounded-full"
        >{key.split('/').at(-1).split('.').at(0)}</small
      >
      {#await boxes[key]() then component}
        <svelte:component this={component.default} />
      {/await}
    </li>
  {/each}
</ul>

<style>
  li:last-child small {
    --uno: hidden;
  }
  li:hover small {
    --uno: opacity-100;
  }
</style>
