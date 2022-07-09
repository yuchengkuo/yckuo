<script lang="ts">
  type Project = {
    title: string
    excerpt: string
    tags: string[]
    url: string
  }

  export let project: Project
</script>

<li class="rounded-lg flex flex-col mb-16 gap-2">
  <h3>
    <a href={project.url} class="rounded-sm w-fit">
      {project.title}
    </a>
  </h3>
  <p>{project.excerpt}</p>
  <div class="flex flex-wrap w-full gap-2">
    {#each project.tags as tag}
      <small
        class="bg-$colors-surface font-Azeret rounded-[4px] font-450 text-xs py-0.5 px-1 capitalize"
        >{tag}</small
      >
    {/each}
  </div>
</li>
