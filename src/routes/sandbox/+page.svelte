<script lang="ts">
  import Header from '../Header.svelte'
  import Head from '$lib/seo/Head.svelte'
  import { formatDate } from '$lib/util'

  import { afterNavigate } from '$app/navigation'
  import { onMount } from 'svelte'

  import tooltip from '$lib/action/tooltip/action'

  const boxes = import.meta.glob<{
    default: ConstructorOfATypedSvelteComponent
    meta: {
      title: string
      date: string
    }
  }>('./boxes/*.svelte')
  let column = 3
  let innerWidth: number

  let focus = ''
  let copied: false | 'Failed' | 'Copied' = false

  onMount(() => {
    if (innerWidth > 960) column = 3
    if (innerWidth < 960) column = 2
    if (innerWidth < 640) column = 1
  })

  afterNavigate(({ to }) => {
    focus = to.url.hash
  })

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text)
      copied = 'Copied'
    } catch (e) {
      copied = 'Failed'
      console.error(e)
    }
    setTimeout(() => (copied = false), 1000)
  }
</script>

<svelte:window
  bind:innerWidth
  on:resize={() => {
    if (innerWidth > 960) column = 3
    if (innerWidth < 960) column = 2
    if (innerWidth < 640) column = 1
  }}
  on:hashchange={(e) => {
    const url = new URL(e.newURL)
    focus = url.hash
  }}
/>

<Head title="Sandbox" description="A little playground." openGraph={{ url: 'sandbox' }} />

<Header
  title="Sandbox"
  desc="This is a little playground mainly for playing around and learning what's behind interesting UI elements seen on the web."
/>

<ul
  class="grid gap-4 mt-10"
  md="gap-2 px-2 mt-20"
  style="grid-template-columns: repeat({column}, minmax(0, 1fr))"
>
  {#key column}
    {#each new Array(column) as _, col}
      <div>
        {#each Object.keys(boxes)
          .reverse()
          .filter((_, index) => index % column === col) as key}
          {@const id = key.split('/').at(-1).split('.').at(0)}
          <li
            {id}
            class="p-2 bg-surface rounded-lg drop-shadow-sm transition-transform relative mb-2 lt-sm:mb-4 border-border"
            hover="drop-shadow"
            style="border-width: {'#' + id === focus ? '4px' : '0'}"
            on:focusout={() => (focus = '')}
          >
            {#await boxes[key]() then component}
              {@const { default: Component, meta } = component}

              <!-- Main component -->
              <main class="grid place-items-center relative mb-2" class:py-40={!meta}>
                <svelte:component this={Component} />
              </main>

              <!-- Metadata -->
              {#if meta}
                <footer class="flex gap-2 items-center bg-bg shadow-sm rounded-md px-3 py-2">
                  <div class="grow">
                    <h2 class="text-lg leading-6">
                      {meta.title}
                    </h2>
                    <time class="block text-xs text-fg-secondary font-450"
                      >{formatDate(meta.date)}
                      <small class="ordinal text-fg-secondary ml-1"
                        >No. {key.split('/').at(-1).split('.').at(0).split('-').at(0)}</small
                      ></time
                    >
                  </div>

                  <div class="transition-all ease-out duration-200 scale-80 opacity-0" data-action>
                    <button
                      class="float-right p-1 flex rounded-full border-1 border-border bg-surface"
                      active="scale-90"
                      on:click={() => copy(`yuchengkuo.com/sandbox#${id}`)}
                      use:tooltip={{ content: copied ? '' : 'Copy link' }}
                      ><span
                        class="{copied
                          ? copied === 'Copied'
                            ? 'i-bx-check'
                            : 'i-bx-error'
                          : 'i-bx-link'} size-4 bg-fg-secondary"
                      /></button
                    >
                  </div>
                </footer>
              {/if}
            {/await}
          </li>
        {/each}
      </div>
    {/each}
  {/key}
</ul>

<style>
  small {
    font-feature-settings: 'ordn' on;
  }

  li:hover [data-action] {
    --uno: scale-100 opacity-100;
  }
</style>
