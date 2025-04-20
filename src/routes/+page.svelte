<script lang="ts">
  import Content from '$lib/content/Content.svelte'
  import List from '$lib/view/List/List.svelte'
  import ListGroupHeader from '$lib/view/List/ListGroupHeader.svelte'
  import ListItem from '$lib/view/List/ListItem.svelte'

  let { data } = $props()
</script>

<svelte:head>
  <title>{data.title}</title>
</svelte:head>

<div class="prose">
  <Content content={data.content} />
</div>

<section>
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
      {#each org.works as work}
        <ListItem>
          <a href={work.slug}>{work.title}</a>

          {#snippet trailing()}
            <p class="text-tertiary">{work.category.join(', ')}</p>
          {/snippet}
        </ListItem>
      {/each}
    </List>
  {/each}
</section>

<section>
  <h2>Side</h2>

  <List>
    {#each data.projects as project}
      <ListItem>
        <a href={project.slug}>{project.title}</a>

        {#snippet trailing()}
          <p class="text-tertiary">{project.category}</p>
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

  p {
    --uno: 'text-tertiary';
  }
</style>
