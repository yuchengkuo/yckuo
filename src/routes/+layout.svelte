<script lang="ts">
  import '@unocss/reset/tailwind-compat.css'
  import 'uno.css'
  import '../styles/main.css'

  import Time from '$lib/view/Current/Time.svelte'
  import Year from '$lib/view/Current/Year.svelte'

  import { page } from '$app/state'
  import { fade } from 'svelte/transition'
  import { cubicOut } from 'svelte/easing'
  import { formatDate } from '$lib/util'

  let { data, children } = $props()
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

  <script data-no-cookie async data-api="/_hive" src="/bee.js"></script>
</svelte:head>

<header>
  <div class="w-4.5">
    <a href="/" title="Go to home page" aria-label="Go to home page"
      ><svg viewBox="0 0 20 15" fill="none" xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M1.41578 12.1684C0.765321 13.4694 1.71131 15 3.16578 15V15C3.90687 15 4.58435 14.5813 4.91578 13.9184L10.9705 1.80902C11.3861 0.97789 10.7817 0 9.85246 0L6.66667 0H2.02254C1.09331 0 0.488945 0.97789 0.904508 1.80902L3.57162 7.14325C3.68391 7.36783 3.68391 7.63217 3.57163 7.85675L1.41578 12.1684Z"
          fill="currentColor"
        /><path
          d="M16.4284 7.85675C16.3161 7.63217 16.3161 7.36783 16.4284 7.14325L18.5842 2.83156C19.2347 1.53064 18.2887 0 16.8342 0V0C16.0931 0 15.4156 0.418708 15.0842 1.08156L9.02951 13.191C8.61394 14.0221 9.21831 15 10.1475 15H13.3333H17.9775C18.9067 15 19.5111 14.0221 19.0955 13.191L16.4284 7.85675Z"
          fill="currentColor"
        /></svg
      ></a
    >
  </div>

  <div>
    <h1>{page.data.title}</h1>
    <p>{page.data?.subtitle}</p>
    <p>{page.data?.sidenote}</p>
  </div>

  <p class="text-sm text-tertiary">
    Updated <time datetime={page.data.updated}>{formatDate(page.data.updated ?? null)}</time>
  </p>

  {#if page.url.pathname === '/'}
    <nav>
      <ul>
        {#each data.navigation as nav}
          <li>
            <a
              href={nav.url}
              class:current={page.url.pathname.startsWith(nav.url) ||
                nav.include?.some((l) => page.url.pathname.startsWith(l))}
              class="inline-block"
            >
              {nav.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>
  {/if}
</header>

<!-- TODO: Outro animation -->
{#key page.url}
  <main in:fade={{ duration: 800, easing: cubicOut }}>
    {@render children?.()}
  </main>
{/key}

<footer class="col-span-full mt-auto text-xs text-tertiary font-medium">
  <p class="mb-0.5">GMT+8 <Time /></p>
  <p><Year /> YuCheng Kuo</p>
</footer>

<div data-layer role="presentation"></div>

<style>
  header {
    --uno: 'col-span-full flex flex-col gap-4 mb-14 lt-md:mb-8 z-10';
  }

  nav ul {
    --uno: 'flex gap-4';
  }
</style>
