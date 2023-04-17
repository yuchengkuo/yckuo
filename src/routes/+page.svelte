<script lang="ts">
  import { contact, routes } from '$lib/config'
  import Head from '$lib/seo/Head.svelte'
  import tooltip from '$lib/action/tooltip/action'

  import Header from './Header.svelte'
  import Stack from './project/Stack.svelte'

  import type { PageServerData } from './$types'

  export let data: PageServerData

  let copied: false | 'Failed' | 'Copied' = false

  async function copy() {
    try {
      await navigator.clipboard.writeText('hey@yuchengkuo.com')
      copied = 'Copied'
    } catch (e) {
      copied = 'Failed'
      console.error(e)
    }
    setTimeout(() => (copied = false), 5000)
  }

  const desc = `
  _Hello_, I'm YuCheng, a product designer/engineer from Taiwan, now based in Kaohsiung, Taiwan. Currently working as UI/UX designer at [Oen Tech](https://oen.tw).
  
  Can find more [about me](/about) or take a look at some of my previous [personal projects](/project), which are mostly about learning something and keeping myself entertained.

  Enjoying music & films and (started to love reading) books, learn more in [DDiet](/listening). Also enjoying surfing around the internet learning and taking inspirations, more in [Links](/bookmark).

  Reachable through hey[at]yuchengkuo.com. ヅ
  `
</script>

<Head />

<Header {desc} />

<nav class="max-w mt-10 mb-20 rounded-lg">
  <p class="text-xs font-600 text-fg-secondary mb-2">Navigate</p>
  {#each routes as route}
    <a
      href={route.url}
      class="flex gap-2 items-center text-sm font-600 p-2 -mx-2 not-last:mb-2 rounded-md bg-surface transition shadow-sm"
      hover="bg-surface-subtle"
      ><div class="p-1 bg-bg rounded">
        <span class="{route.icon} block w-3 h-3 bg-fg-secondary" />
      </div>
      {route.label}<span class="text-xs font-500 text-fg-secondary">{route.desc}</span><kbd
        class="text-0.75em py-0.5 px-1 text-fg-secondary ml-auto"
        use:tooltip={{ content: 'Press key to navigate', offset: 4 }}>{route.kbd}</kbd
      ></a
    >
  {/each}
</nav>

<section id="projects">
  <div class="w-full flex justify-between items-baseline">
    <h2>Projects</h2>
    <a class="btn-pill" href="/project">View All</a>
  </div>

  <ul>
    {#each data.projects as project}
      {@const info = project.image?.length > 1}
      <li class="mb-10 group">
        <a
          class="flex sm:gap-6 transition items-baseline lt-sm:grid"
          href={project.link || `/project/${project.slug}`}
        >
          <time class="sm:basis-20 shrink-0 text-sm slashed-zero text-fg-secondary font-500"
            >{project.time}</time
          >
          <div class="lt-sm:col-start-1">
            <p class="font-600">{project.title}</p>
            <p class="text-fg-secondary">
              {project.excerpt}
            </p>
          </div>
          <div class="lt-sm:(col-start-2) sm:basis-30 shrink-0 relative self-start">
            {#if project.image}
              <Stack images={project.image} />
            {/if}
            <div
              class="absolute left-120% top-2/3 p-1 whitespace-nowrap rotate-6 opacity-0 transition group-hover:opacity-100 lt-md:hidden"
              class:hidden={!info}
            >
              <span class="text-xs font-600 text-fg-secondary leading-none"
                >← Try clicking images!</span
              >
            </div>
          </div>
        </a>
      </li>
    {/each}
  </ul>
</section>

<section>
  <h2>Work</h2>

  {#each data.works as work}
    <div class="flex sm:gap-6 transition items-baseline lt-sm:flex-col">
      <time class="sm:basis-20 shrink-0 text-sm slashed-zero text-fg-secondary font-500"
        >{work.duration}</time
      >
      <div>
        <a href={work.url} class="font-600">{work.title} ↗</a>
        <p class="text-fg-secondary">{work.excerpt}</p>
      </div>
      <div />
    </div>
  {/each}
</section>

<section>
  <h2>Connect</h2>

  <ul>
    <li class="pb-4 mb-4 border-b border-border flex items-end gap-4">
      <div>
        <p class="font-600">Email</p>
        <p class="text-fg-secondary">hey@yuchengkuo.com</p>
      </div>

      <div class="ml-auto flex gap-2">
        <a href="mailto:hey@yuchengkuo.com" class="btn-pill"
          ><span class="i-ri-send-plane-fill size-3 text-fg-secondary mr-1" />Send</a
        >
        <button on:click={copy} class="btn-pill" aria-label="Copy email"
          ><span class="i-ri-file-copy-fill size-3 text-fg-secondary mr-1" />{copied
            ? copied
            : 'Copy'}</button
        >
      </div>
    </li>
    <li class="flex gap-4 items-end">
      <div>
        <p class="font-600">Elsewhere</p>
        <p class="text-fg-secondary">Me in other places</p>
      </div>
      <div class="ml-auto flex gap-2">
        {#each contact as link}
          <a
            href={link.url}
            data-splitbee-event="Open Link"
            data-splitbee-target={link.label}
            class="btn-pill h-fit"
            ><span class="size-3 text-fg-secondary mr-1 {link.icon}" />{link.label}</a
          >
        {/each}
      </div>
    </li>
  </ul>
</section>

<style>
  section {
    --uno: mb-24 max-w child-first:(mb-10 lt-sm:mb-6);
  }
</style>
