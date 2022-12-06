<script lang="ts">
  import Head from '$lib/seo/Head.svelte'
  import Stack from './Stack.svelte'

  import type { PageServerData } from './$types'

  export let data: PageServerData

  const openGraph = { images: [{ url: 'project.png' }], url: 'projects' }
</script>

<Head title="Projects" {openGraph}>
  <script>
    document.documentElement.setAttribute('data-theme', 'project')
  </script>
</Head>

<section class="mb-20 max-w-640px mx-auto">
  <h1 class="mb-4">Projects</h1>
  <p class="text-fg-secondary">Lists of fun experiments, works and explorations.</p>
</section>

<ul>
  {#each data.allProjects as project}
    <li class="grid gap-6 grid-cols-[1fr_640px_1fr]">
      <a
        class="block py-4 col-start-2"
        sm="pb-8"
        href={project.link ? project.link : `/project/${project.slug}`}
      >
        <div class="lt-sm:mb-8 col-start-2">
          <h2 class="lev3">{project.title}</h2>
          <p class="mt-2 text-fg-secondary">
            {project.excerpt}
          </p>
        </div>
        <div class="hidden">
          <Stack images={project.image} />
        </div>
      </a>
    </li>
  {/each}
</ul>
