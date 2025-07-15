<script lang="ts">
  import Content from '$lib/content/Content.svelte'
  import List from '$lib/view/List/List.svelte'
  import ListGroupHeader from '$lib/view/List/ListGroupHeader.svelte'
  import ListItem from '$lib/view/List/ListItem.svelte'

  import { scramble } from '$lib/action/scramble/scramble.svelte.js'
  import { glitch } from '$lib/action/scramble/param.js'

  let { data } = $props()

  let workAnchor: HTMLAnchorElement[] | null[] = $state([])
  let workParagraph: HTMLParagraphElement[] | null[] = $state([])
  let sideAnchor: HTMLAnchorElement[] | null[] = $state([])
  let sideParagraph: HTMLParagraphElement[] | null[] = $state([])
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<div class="prose">
  <Content content={data.content} />
</div>

<section id="work">
  <h2>Work</h2>

  {#each data.worksByOrg as org}
    <ListGroupHeader>
      <h3>
        {org.name}
        <span class="text-tertiary text-sm ml-2"
          >(<a href={org.url}>{org.url.replace(/https:\/\//, '')}</a>)</span
        >
      </h3>

      {#snippet trailing()}
        <p class="text-tertiary">{org.duration}</p>
      {/snippet}
    </ListGroupHeader>
    <List>
      {#each org.works as work, i}
        <ListItem
          onmouseenter={() => {
            setTimeout(() => workAnchor[i]?.scramble?.(), 10)
            setTimeout(() => workParagraph[i]?.scramble?.(), 10)
          }}
        >
          <a
            bind:this={workAnchor[i]}
            use:scramble={{
              text: work.title,
              step: work.title.length,
              ...glitch,
              autoplay: false
            }}
            href={work.slug}>{work.title}</a
          >

          {#snippet trailing()}
            {@const category = work.category.join(', ')}
            <p
              bind:this={workParagraph[i]}
              use:scramble={{
                text: category,
                step: category.length,
                ...glitch,
                autoplay: false
              }}
              class="text-tertiary"
            >
              {category}
            </p>
          {/snippet}
        </ListItem>
      {/each}
    </List>
  {/each}
</section>

<section id="side">
  <h2>Side</h2>

  <List>
    {#each data.projects as project, i}
      <ListItem
        onmouseenter={() => {
          setTimeout(() => sideAnchor[i]?.scramble?.(), 10)
          setTimeout(() => sideParagraph[i]?.scramble?.(), 10)
        }}
      >
        <a
          bind:this={sideAnchor[i]}
          use:scramble={{
            text: project.title,
            step: project.title.length,
            ...glitch,
            autoplay: false
          }}
          href={project.slug}>{project.title}</a
        >

        {#snippet trailing()}
          {@const category = project.category.join(', ')}
          <p
            bind:this={sideParagraph[i]}
            use:scramble={{
              text: category,
              step: category.length,
              ...glitch,
              autoplay: false
            }}
            class="text-tertiary"
          >
            {category}
          </p>
        {/snippet}
      </ListItem>
    {/each}
  </List>
</section>

<style>
  section {
    --uno: 'mt-24 col-start-1 col-span-6';
  }

  h2 {
    --uno: 'mb-4';
  }
</style>
