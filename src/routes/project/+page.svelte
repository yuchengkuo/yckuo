<script lang="ts">
  import Head from '$lib/seo/Head.svelte'
  import Image from '$lib/image/Image.svelte'

  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<Head title="Projects · YuCheng Kuo">
  <script>
    document.documentElement.setAttribute('data-theme', 'grass')
  </script>
</Head>

<section class="mb-40">
  <h1 class="w-fit">Projects</h1>
  <p class="mt-8 text-fg-secondary w-fit">Lists of experiments, fun works</p>
</section>

<section>
  <ul>
    {#each data.allProjects as project}
      <li class="mb-30 *grid items-baseline tablet:(gap-y-16) phone:(gap-y-12) ">
        <div class="col-span-3 phone:(col-span-full mb-8) ">
          <h2>{project.title}</h2>
          <p class="mt-2 text-fg-secondary text-lg">
            {project.excerpt}
          </p>
          <a
            class="font-Azeret mt-4 text-fg-secondary text-sm w-fit block"
            href={project.link ? project.link : `/project/${project.slug}`}
            >{project.link ? 'link ↗' : 'more ->'}</a
          >
        </div>
        <div
          class="grid col-span-4 self-center place-items-center tablet:(col-span-1) phone:(col-span-full) children:(row-start-1 col-start-1 shadow-md) "
        >
          {#each project.image ?? [] as id (id)}
            {@const deg = Math.floor(Math.random() * 20 - 10) % 10}
            <Image
              class="rounded-sm h-160px transform aspect-video rotate-[{deg}deg] bg-surafce phone:(h-fit) "
              {id}
              alt={`${project.title} project images`}
            />
          {/each}
        </div>
      </li>
    {/each}
  </ul>
</section>
