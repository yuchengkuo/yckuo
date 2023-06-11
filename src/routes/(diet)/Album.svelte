<script lang="ts">
  import Image from '$lib/media/Image.svelte'

  import type { Album } from '$lib/api/spotify'

  export let album: Album
</script>

<li>
  <a href={album.url} title="{album.name} by {album.artist}">
    <Image
      src={album.image}
      alt="Album artwork of {album.name} by {album.artist}"
      aspectRatio="1/1"
      class="size-30 shadow-md"
    />
    <div class="flex flex-col">
      <p class="text-fg">{album.name} ↗</p>
      <p class="text-fg-muted text-sm">{album.artist}</p>

      <div class="mt-auto flex gap-2">
        <p class="tag-gray">
          <span class="i-ri-calendar-2-fill mr-1" />{new Date(album.release_date).getFullYear()}
        </p>
        <p class="tag-gray"><span class="i-ri-music-2-fill mr-1" />{album.total_tracks} tracks</p>
      </div>
    </div>
  </a>
</li>

<style>
  li {
    --uno: 'px-4 -mx-4 rounded';
  }
  li:not(:first-child) a {
    --uno: 'border-t';
  }
  a {
    --uno: 'py-5 flex gap-4 border-solid border-border-muted';
  }
  li:hover {
    --uno: 'bg-bg';
  }
  li:active {
    --uno: 'scale-99 bg-bg-muted';
  }
  li:hover a,
  li:hover + * a {
    --uno: 'border-transparent';
  }
</style>
