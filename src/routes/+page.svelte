<script lang="ts">
  import { spring } from 'motion'

  import Head from '$lib/seo/Head.svelte'
  import { motion } from '$lib/animation/motion'
  import tooltip from '$lib/tooltip/tooltip'

  import type { PageServerData } from './$types'

  export let data: PageServerData

  let copied: boolean | 'failed' = false

  const easing = spring({ mass: 1, damping: 20 })
  const initial = { y: '20%', opacity: 0.001 }
  const animate = { y: 0, opacity: 1 }

  async function copy() {
    try {
      await navigator.clipboard.writeText('hey@yuchengkuo.com')
      copied = true
    } catch (e) {
      copied = 'failed'
      console.error(e)
    }
    setTimeout(() => (copied = false), 5000)
  }
</script>

<Head>
  <script>
    document.documentElement.removeAttribute('data-theme')
  </script>
</Head>

<section class="max-w-640px mx-auto">
  <div class="text-fg-secondary child-last:mt-4 child-last:md:mt-8 leading-1.75rem">
    <h1>YuCheng Kuo</h1>
    <div>
      <i>Hello</i>, I'm YuCheng. I am a product designer and UI developer from Taiwan. I'm currently
      working as designer/engineer building <a class="attr" href="https://oen.tw">Oen Tech</a>,
      which involves:
      <ul mt="4">
        <li>UX flows</li>
        <li>Component library in Figma</li>
        <li>Interaction & Visual</li>
        <li>Prototyping</li>
        <li>Front-end (UI development)</li>
      </ul>
    </div>
  </div>
</section>

<section class="max-w-640px mx-auto">
  <div id="projects">
    <h2>Projects</h2>

    <ul>
      {#each data.projects as project}
        <li before="!hidden">
          <a
            class="block py-4 transition"
            href={project.link || `/project/${project.slug}`}
            hover="invert-50 dark:(invert-none brightness-80)"
            active="invert-70 dark:(invert-none brightness-60)"
          >
            <div class="flex justify-between">
              <h3>{project.title}</h3>
              <time class="text-xs tabular-nums slashed-zero">{project.time.substring(0, 4)}</time>
            </div>
            <p class="mt-3 text-fg-secondary">
              {project.excerpt}
            </p>
          </a>
        </li>
      {/each}
    </ul>

    <a class="block attr mt-6 w-fit" href="/project">See all {data.projectsAmount} →</a>
  </div>
</section>

<style>
  section h2 {
    --uno: mb-6;
  }

  section h2:not(:first-of-type) {
    --uno: mt-8;
  }

  section {
    --uno: mb-30;
  }

  ul li {
    --uno: list-outside mb-0.5;
  }

  li::before {
    --uno: font-500 mr-2 text-sm text-border inline-block;
    content: '—';
  }
</style>
