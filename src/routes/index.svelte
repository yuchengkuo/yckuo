<script lang="ts" context="module">
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

  import motion from '$lib/animation'
  import { fadeup } from '$lib/animation/keyframes'

  import type { Load } from '@sveltejs/kit'

  export let data

  const easing = spring({ mass: 1, damping: 20 })
</script>

<svelte:head>
  <title>YuCheng Kuo · Designer, Engingeer</title>
  <script>
    document.documentElement.removeAttribute('data-theme')
  </script>
</svelte:head>

<section class="min-h-screen *grid">
  <div class="col-span-3 children:mb-8">
    <h1 use:motion={{ keyframes: fadeup, options: { easing, delay: 0.4 } }}>YuCheng Kuo</h1>
    <div use:motion={{ keyframes: fadeup, options: { easing, delay: 0.5 } }} class="text-lg">
      <Markdoc content={data.overview.markdown} />
    </div>

    <nav
      use:motion={{ keyframes: fadeup, options: { easing, delay: 0.8 } }}
      class="flex font-Azeret font-400 text-sm gap-2 justify-between uppercase"
    >
      <a href="/about">About</a>
      <a href="/project">Project</a>
      <a href="/bookmark">Bookmark</a>
      <a href="/listening">Listening</a>
      <a href="/watching">Watching</a>
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

  <div class="text-lg col-start-4">
    <h2>{data.work.title}</h2>

    <Markdoc content={data.work.markdown} />
  </div>
</section>

<style>
  section h2 {
    @apply mb-6;
  }
</style>
