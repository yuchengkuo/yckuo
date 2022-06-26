<script context="module" lang="ts">
  export const prerender = true
</script>

<script lang="ts">
  import { spring } from 'motion'
  import motion from '$lib/animation'
  import { fadeup } from '$lib/animation/keyframes'

  const easing = spring({ mass: 1, damping: 20 })
</script>

<svelte:head>
  <title>YuCheng Kuo → Designer, Engingeer</title>
</svelte:head>

<section class="flex gap-6">
  <div class="w-3/8">
    <h1 use:motion={{ keyframes: fadeup, options: { easing, delay: 0.4 } }}>YuCheng Kuo</h1>
    <p use:motion={{ keyframes: fadeup, options: { easing, delay: 0.5 } }} class="mt-8 text-lg">
      Hello, I'm YuCheng. I am a self-taught designer and engineer from Taiwan. I'm currently
      helping building Oen.tw
    </p>

    <nav
      use:motion={{ keyframes: fadeup, options: { easing, delay: 0.8 } }}
      class="flex flex-col mt-8 gap-2 items-start"
    >
      <a href="/about">About</a>
    </nav>
  </div>
</section>

<section class="grid gap-6 grid-cols-16">
  <div id="projects" class="col-start-1 col-end-5">
    <h2>Projects</h2>

    ...
  </div>
  <div class="col-start-6 col-end-10">
    <h2>Work</h2>

    <p>...</p>
  </div>

  <div class="col-end-15 col-start-11">
    <h2>Log</h2>

    <div class="bg-$colors-surface rounded h-72px w-full" />

    <h4>Recently</h4>
    <div class="bg-$colors-surface rounded h-60 w-full" />
  </div>
</section>

<style>
  section {
    @apply mb-40;
  }

  section h2 {
    @apply mb-6;
  }
</style>
