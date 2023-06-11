<script lang="ts">
  import { page } from '$app/stores'

  import Avatar from './AboutLinks/Avatar.svelte'
</script>

<div class="mt-16">
  <div class="flex items-end gap-2">
    <Avatar />
    <small>ヅ</small>
  </div>

  <nav class="mt-6 flex gap-6 flex-wrap">
    {#each $page.data.connect as link}
      <a
        href={link.url}
        data-splitbee-event="Open Link"
        data-splitbee-target={link.label}
        class="shrink-0"
      >
        {link.label} ↗
      </a>
    {/each}
  </nav>
</div>
