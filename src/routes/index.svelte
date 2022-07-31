<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit'

  export const load: Load = async function ({ fetch }) {
    const res = await fetch('/api/content/home?data')

    if (res.ok) {
      const { data } = await res.json()
      return {
        props: { data },
        cache: { maxage: 30 * 24 * 60 * 60, private: false },
      }
    }
    return {
      status: 404,
    }
  }
</script>

<script lang="ts">
  import { spring } from 'motion'
  import Markdoc from 'sveltejs-markdoc'

  import Project from '$components/Project.svelte'
  import Head from '$components/Head.svelte'

  import motion from '$lib/animation'
  import { fadeup } from '$lib/animation/keyframes'

  export let data

  const easing = spring({ mass: 1, damping: 20 })
</script>

<Head>
  <script>
    document.documentElement.removeAttribute('data-theme')
  </script>
</Head>

<section class="flex flex-col min-h-screen pb-40">
  <div class="*grid gap-y-0 items-start children:(col-start-1 col-span-3 mb-8) ">
    <h1 use:motion={{ keyframes: fadeup, options: { easing, delay: 0.4 } }}>YuCheng Kuo</h1>
    <div use:motion={{ keyframes: fadeup, options: { easing, delay: 0.5 } }} class="text-lg">
      <Markdoc content={data.overview.markdown} />
    </div>

    <nav
      use:motion={{ keyframes: fadeup, options: { easing, delay: 0.8 } }}
      class="flex font-Azeret font-400 text-sm gap-2 justify-between uppercase"
    >
      <a sveltekit:prefetch href="/about">About</a>
      <a sveltekit:prefetch href="/project">Project</a>
      <a sveltekit:prefetch href="/bookmark">Bookmark</a>
      <a sveltekit:prefetch href="/listening">Listening</a>
      <a sveltekit:prefetch href="/watching">Watching</a>
    </nav>
  </div>
</section>

<section class="*grid children:col-span-2">
  <div id="projects">
    <h2>Projects</h2>

    {#each data.projects as project}
      <Project {project} />
    {/each}

    <a href="/project">All →</a>
  </div>

  <div class="col-start-4">
    <h2>{data.work.title}</h2>

    <Markdoc content={data.work.markdown} />
  </div>
</section>

<style>
  section h2 {
    @apply mb-6;
  }
</style>
