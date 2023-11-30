<script lang="ts">
  import { page } from '$app/stores'

  import Avatar from './Avatar.svelte'
</script>

<div class="mt-16">
  <div>
    <Avatar />
    <small>ヅ</small>
  </div>

  <nav>
    <ul>
      {#each $page.data.connect as link}
        <li>
          <a href={link.url} data-splitbee-event="Open Link" data-splitbee-target={link.label}>
            {link.label}
          </a>
        </li>
      {/each}
    </ul>
  </nav>
</div>

<style>
  div div {
    --uno: 'flex items-end gap-2';
  }
  nav ul {
    --uno: 'mt-6 flex gap-6 flex-wrap children:shrink-0';
  }
  li {
    --uno: 'list-none';
  }
</style>
