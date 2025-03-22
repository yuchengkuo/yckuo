<script lang="ts">
  import Content from '$lib/content/Content.svelte'
  import { formatDate } from '$lib/util'

  let { data } = $props()
</script>

<svelte:head>
  <title>{data.title} — Product Designer & Engineer</title>
</svelte:head>

<h1>{data.title}</h1>

<div class="prose">
  <Content content={data.content} />

  <p>
    <span class="text-primary"
      >Open to new opportunities. Seeking roles that combine UI/UX design and front-end development
      skills.</span
    >
    <a href="mailto:hey@yuchengkuo.com" class="ml-2">email</a>
  </p>

  <p class="text-sm text-fg-subtle mt-8">
    Updated on <time datetime={data.updated}>{formatDate(data.updated)}</time>
  </p>
</div>

<style>
  h1 {
    --uno: 'font-sans not-italic text-size-unset';
  }
</style>
