<script lang="ts">
  import Head from '$lib/seo/Head.svelte'
  import Header from '../Header.svelte'

  const boxes = import.meta.glob<any>('./boxes/*.svelte')
</script>

<Head title="Sandbox" description="A little playground." openGraph={{ url: 'sandbox' }} />

<Header
  title="Sandbox"
  desc="This is a little playground mainly for playing around and learning what's behind interesting UI elements seen on the web."
/>

<ul
  class="grid grid-cols-1 gap-4 place-items-center mt-10"
  md="grid-cols-2 gap-2 px-2 mt-20"
  xl="grid-cols-3"
  children="min-h-24rem w-full grid place-items-center relative"
>
  {#each Object.keys(boxes) as key}
    <li class="bg-surface rounded-md drop-shadow-sm">
      <small class="tag-olive absolute right-1 bottom-1"
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
</style>
