<script lang="ts">
  import { formatDate } from '$lib/util.js'

  let { data } = $props()

  let { notes } = $derived(data)
</script>

<svelte:head>
  <title>Notes — YuCheng Kuo</title>
</svelte:head>

<nav>
  <ul>
    {#each notes as note}
      <li>
        <a href={note.slug}>
          {note.title}
        </a>
        <time datetime={note.updated}>{formatDate(note.updated)}</time>
      </li>
    {/each}
  </ul>
</nav>

<style>
  nav ul {
    --uno: 'list-none p-0 m-0';
  }

  nav li {
    --uno: 'mb-4';
  }

  nav a {
    --uno: 'text-fg';
  }

  time {
    --uno: 'text-sm text-tertiary ml-2';
  }
</style>
