<script lang="ts">
  import Head from '$lib/seo/Head.svelte'
  import Context from './Context.svelte'
  import Glow from './Glow.svelte'
  import Polar from './Polar.svelte'
  import Tabs from './Tabs.svelte'
  import Thumb from './Thumb.svelte'
  import Wip from './WIP.svelte'
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
  <li><Glow /></li>
  <li><Tabs /></li>
  <li><Polar /></li>
  <li><Thumb /></li>
  <li><Context /></li>
  <li><Wip /></li>
</ul>
