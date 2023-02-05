<script lang="ts">
  import { aboutLinks } from '$lib/config'
  import Avatar from './AboutLinks/Avatar.svelte'
</script>

<div class="mt-8 flex flex-wrap gap-6 justify-end items-end lt-sm:gap-4 lt-md:flex-row-reverse">
  <small class="mb-0 xl:mr-auto">ヅ</small>

  {#each aboutLinks as link}
    <a
      href={link.url}
      data-splitbee-event="Open Link"
      data-splitbee-target={link.label}
      class="font-600 shrink-0"
    >
      <span class="{link.icon} mr-2 w-5 h-5 text-fg-secondary" />{link.label}
    </a>
  {/each}

  <Avatar />
</div>
