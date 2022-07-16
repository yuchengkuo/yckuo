<script lang="ts">
  import Image from '$lib/image/Image.svelte'

  type Project = {
    title: string
    excerpt: string
    tag: string[]
    image: string[]
    slug: string
  }

  export let allProjects: Project[]
</script>

<svelte:head>
  <title>Projects · YuCheng Kuo</title>
  <script>
    document.documentElement.setAttribute('data-theme', 'grass')
  </script>
</svelte:head>

<section class="mb-40">
  <h1 class="w-fit">Projects</h1>
  <p class="mt-8 text-$colors-fg-secondary w-fit">Lists of experiments, fun works</p>
</section>

<section>
  <ul>
    {#each allProjects as project}
      <li class="mb-30 *grid items-baseline">
        <div class="col-span-3">
          <h2>{project.title}</h2>
          <p class="mt-2 text-$colors-fg-secondary text-lg">
            {project.excerpt}
          </p>
          <a
            class="font-Azeret mt-4 text-$colors-fg-secondary text-sm w-fit block"
            href={`/project/${project.slug}`}>more -></a
          >
        </div>
        <div
          class="font-Azeret font-450 text-xs text-$colors-fg-secondary w-[200%] col-span-1 children:mb-2"
        >
          {#each project.tag ?? [] as tag}
            <p>– {tag}</p>
          {/each}
        </div>
        <div
          class="grid col-span-4 self-center place-items-center children:(row-start-1 col-start-1 shadow-md) "
        >
          {#each project.image ?? [] as id (id)}
            {@const deg = Math.floor(Math.random() * 20 - 10) % 10}
            <Image
              class="rounded-sm h-160px transform aspect-video rotate-[{deg}deg] bg-$colors-surafce"
              {id}
              alt={`${project.title} project images`}
            />
          {/each}
        </div>
      </li>
    {/each}
  </ul>
</section>
