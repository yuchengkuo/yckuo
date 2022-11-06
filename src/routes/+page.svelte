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

<section class="pb-20 lg:(grid pb-56 gap-80 grid-cols-2) ">
  <div class="last-child:md:mt-8 last-child:mt-4 ">
    <h1 use:motion={{ initial, animate, transition: { easing, delay: 0.3 } }}>YuCheng Kuo</h1>
    <div use:motion={{ initial, animate, transition: { easing, delay: 0.4 } }}>
      <i>Hello</i>, I'm YuCheng. I am a product designer and UI developer from Taiwan. I'm currently
      working as designer/engineer building <a href="https://oen.tw">Oen Tech</a>.
    </div>
  </div>
</section>

<section class="grid gap-y-10 md:(gap-40 gap-40 items-baseline grid-cols-2) lg:grid-cols-3 ">
  <div use:motion={{ initial, animate, transition: { easing, delay: 0.65 } }} id="projects">
    <h2>Projects</h2>

    {#each data.projects as project}
      <project class="block not-last:mb-8 md:not-last:mb-12">
        <h3>{project.title}</h3>
        <p class="mt-1 text-fg-secondary">
          {project.excerpt}
        </p>
        <a
          class="font-Azeret mt-3 text-fg-secondary text-sm w-fit block"
          href={project.link ? project.link : `/project/${project.slug}`}
          >{project.link ? 'link ↗' : 'more ->'}</a
        >
      </project>
    {/each}

    <a href="/project">See all →</a>
  </div>

  <info class="block" use:motion={{ initial, animate, transition: { easing, delay: 0.725 } }}>
    <h2>Work</h2>
    <p>Building experience at Oen Tech, which involves:</p>
    <ul>
      <li>UX flows</li>
      <li>Component library in Figma</li>
      <li>Interaction & Visual</li>
      <li>Prototyping</li>
      <li>Front-end (UI development)</li>
    </ul>
    <h2>Notes</h2>
    <div
      class="bg-surface rounded-md font-Azeret text-xs text-center w-full py-4 overflow-hidden whitespace-nowrap"
    >
      <wip
        class="block"
        use:motion={{
          animate: { x: ['100%', '-100%'] },
          transition: { repeat: Infinity, duration: 16, easing: 'linear' },
        }}
      >
        Work in progress... Come back later :)
      </wip>
    </div>
    <h2>Contact</h2>
    <ul class="prose">
      <li>
        Email: <a
          href="mailto:hey@yuchengkuo.com"
          use:tooltip={{
            content:
              copied === 'failed'
                ? 'Failed copying... Browser seems not supported.'
                : copied
                ? 'Copied! Hope to hear from you soon!'
                : 'Click to send, right click to copy',
          }}
          on:contextmenu|preventDefault={copy}>hey@yuchengkuo.com</a
        >
      </li>
      <li>Read.cv: <a href="https://read.cv/yuchengkuo">yuchengkuo</a></li>
      <li>Github: <a href="https://github/yuchengkuo">yuchengkuo</a></li>
      <li>Figma: <a href="https://figma.com/yuchengkuo">@yuchengkuo</a></li>
    </ul>
  </info>

  <aside
    use:motion={{ initial, animate, transition: { easing, delay: 0.8 } }}
    class="<sm:mb-12 <lg:(-order-1 col-span-full) "
  >
    <nav class="flex flex-col flex-wrap font-Azeret font-400 text-sm gap-4 uppercase items-start">
      <a href="/about">About</a>
      <a href="/project">Project</a>
      <a href="/bookmark">Bookmark</a>
      <a href="/listening">Listening</a>
      <a href="/watching">Watching</a>
      <!-- <a href="/changelog">Changelog</a> -->
    </nav>
  </aside>
</section>

<style>
  section h2 {
    @apply mb-6;
  }

  section h2:not(:first-of-type) {
    @apply mt-8;
  }

  info p {
    @apply mb-4;
  }
  info :not(ul.prose) li {
    @apply list-outside text-base mb-0.5;
  }

  info li::before {
    @apply font-500 mr-2 text-sm text-border content-['—'] inline-block;
  }
</style>
