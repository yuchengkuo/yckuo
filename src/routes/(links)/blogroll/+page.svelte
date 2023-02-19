<script lang="ts">
  import { tagColors } from '$lib/config'
  import Image from '$lib/image/Image.svelte'
  import Head from '$lib/seo/Head.svelte'

  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<Head
  title="Blogrolls"
  description="Newsletters and blogs that I enjoy."
  openGraph={{ url: 'blogroll' }}
/>

<section class="max-w">
  <ul>
    {#each data.blogrolls as item}
      <li
        class="bg-surface rounded-lg not-last:(mb-6 lt-sm:mb-2) -mx-6 lt-sm:-mx-2 drop-shadow-sm"
        hover="bg-surface-subtle"
      >
        <a href={item.link}>
          <main class="flex p-6 gap-x-6 items-start lt-sm:(p-2 gap-x-4)">
            <div class="size-10 lt-sm:size-8 bg-bg rounded-lg shrink-0">
              <Image
                id={item.cover}
                alt="Url cover image of {item.title}"
                class="object-cover children:(size-10 lt-sm:size-8)"
                widths={[120, 240]}
              />
            </div>

            <div class="grow">
              <h2 class="lev3">{item.title}</h2>
              <div class="flex gap-2 items-end">
                <p text="fg-secondary mr-auto">{item.excerpt}</p>
              </div>
            </div>
          </main>
          <footer class="flex gap-2 py-2 px-3 border-t border-border">
            <p class="w-fit text-xs text-fg-secondary font-500 hover:text-fg mr-auto">
              {item.domain}
            </p>

            {#each item.tags as tag}
              {@const index = Object.keys(Object.fromEntries(data.tags)).indexOf(tag)}
              <p class="{tagColors[index] || 'tag-gray'} shrink-0 inline-block">
                {tag}
              </p>
            {/each}
          </footer>
        </a>
      </li>
    {/each}
  </ul>
</section>
