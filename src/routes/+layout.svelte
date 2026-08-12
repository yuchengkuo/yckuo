<script lang="ts">
  import 'uno.css'
  import '../styles/theme.css'
  import '../styles/main.css'
  import '../styles/prose.css'

  import Time from '$lib/view/Current/Time.svelte'
  import Year from '$lib/view/Current/Year.svelte'

  import { page } from '$app/state'
  import { afterNavigate, beforeNavigate } from '$app/navigation'
  import { fade } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'
  import { dev } from '$app/environment'
  import { injectAnalytics } from '@vercel/analytics/sveltekit'
  import { scramble } from '$lib/action/scramble/scramble.svelte'
  import { glitch } from '$lib/action/scramble/param'

  injectAnalytics({ mode: dev ? 'development' : 'production' })

  let { data, children } = $props()

  let footerName: HTMLSpanElement | null = $state(null)
  let homeLink: HTMLSpanElement | null = $state(null)

  $effect(() => {
    const timer = setInterval(() => {
      setTimeout(() => {
        footerName?.scramble?.()
      }, Math.random() * 3000)
    }, 3000)

    return () => clearInterval(timer)
  })

  beforeNavigate((n) => {
    document.documentElement.classList.add('is-navigating')
  })

  afterNavigate(() => {
    document.documentElement.classList.remove('is-navigating')
  })
</script>

<svelte:head>
  <meta name="description" content={page.data.description} />
  <meta name="robots" content="index, follow" />
  <meta name="googlebot" content="index, follow" />

  <meta property="og:title" content={page.data.title} />
  <meta property="og:description" content={page.data.description} />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://yuchengkuo.com{page.url.pathname}" />
  <meta property="og:image" content="https://yuchengkuo.com/og/default.png" />

  <meta name="twitter:title" content={page.data.title} />
  <meta name="twitter:description" content={page.data.description} />
  <meta name="twitter:url" content="https://yuchengkuo.com{page.url.pathname}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="https://yuchengkuo.com/og/default.png" />
</svelte:head>

<header class="span-full">
  {#if page.url.pathname !== '/'}
    <a
      onmouseenter={() => homeLink?.scramble?.()}
      aria-label="Homepage"
      href="/"
      class="reset fixed text-tertiary font-mono text-sm z-99 font-medium hover:text-primary group"
      >yuchengkuo.com <span
        class="hidden group-hover:(inline) text-xs"
        bind:this={homeLink}
        use:scramble={{
          text: '[BACK ←]',
          step: '[BACK ←]'.length,
          speed: 0.15,
          scramble: 3
        }}>[BACK ←]</span
      >
    </a>
  {/if}
</header>

<!-- TODO: Outro animation -->
{#key page.url}
  <main in:fade={{ duration: 1000, easing: cubicOut }}>
    {@render children?.()}
  </main>
{/key}

<footer class="layout-content mt-30 grid-subgrid">
  <hr class="border-dash span-full" />

  <ul class="span-full md:span-3 flex flex-col gap-1.5 lt-md:gap-1">
    {#each data.navigation as nav}
      <li><a href={nav.url}>{nav.label}</a></li>
    {/each}

    <li class="my-8">
      <a href="/resume">Resume</a>
      <span class="text-tertiary font-mono text-xs">[.pdf] [48kb]</span>
    </li>
  </ul>

  <ul class="span-full md:span-3 flex flex-col gap-1.5 mb-8 lt-md:gap-1">
    {#each data.contact as contact}
      <li>
        <a href={contact.url}>{contact.label}</a>
        <span class="text-tertiary font-mono text-xs ml-1">{contact.key}</span>
      </li>
    {/each}
  </ul>

  <div class="span-full">
    <p class="font-medium">
      <span class="i-custom-logo size-3 align--2%" role="presentation"></span>
      <span
        bind:this={footerName}
        use:scramble={{
          text: 'YuCheng Kuo',
          step: 'YuCheng Kuo'.length,
          ...glitch
        }}>YuCheng Kuo</span
      >
    </p>
    <div class="flex justify-between font-mono text-xs mt-1">
      <p class="text-tertiary">©<Year /></p>
      <p class="text-right">GMT+8 <Time /></p>
    </div>
  </div>
</footer>

<div data-layer role="presentation"></div>

<style>
  main {
    /* Intro animation */
    transition: opacity 1s cubic-bezier(0.25, 0.46, 0.45, 0.94);

    @starting-style {
      opacity: 0;
    }
  }
</style>
