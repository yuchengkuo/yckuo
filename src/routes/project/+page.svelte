<script lang="ts">
  import Head from '$lib/seo/Head.svelte'
  import Stack from './Stack.svelte'

  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<Head title="Projects · YuCheng Kuo">
  <script>
    document.documentElement.setAttribute('data-theme', 'grass')
  </script>
</Head>

<section class="mb-20 md:mb-40">
  <h1 class="mb-4 md:mb-8">Projects</h1>
  <p class="text-fg-secondary">Lists of experiments, fun works</p>
</section>

<ul>
  {#each data.allProjects as project}
    <li class="mb-40 gap-6 items-start block sm:grid sm:grid-cols-2 lg:grid-cols-[3fr_5fr]">
      <div class="<sm:mb-8">
        <h2>{project.title}</h2>
        <p class="mt-2 text-fg-secondary text-lg">
          {project.excerpt}
        </p>
        <a
          class="rounded font-Azeret -my-1 -mx-2 mt-4 text-fg-secondary text-sm w-fit py-1 px-2 block"
          href={project.link ? project.link : `/project/${project.slug}`}
          >{project.link ? 'link ↗' : 'more ->'}</a
        >
      </div>
      <div class="mt-6 justify-self-center sm:mt-0 xl:h-0">
        <Stack images={project.image} />
      </div>
    </li>
  {/each}
</ul>
