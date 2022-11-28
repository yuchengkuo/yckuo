<script lang="ts">
  import { page } from '$app/stores'
  import { motion } from '$lib/animation/motion'
  import Image from '$lib/image/Image.svelte'
  import Head from '$lib/seo/Head.svelte'
</script>

<Head title={$page.data.title}>
  <script>
    document.documentElement.setAttribute('data-theme', 'violet')
  </script>
</Head>

<section class="mt-12 gap-x-10 sm:grid sm:grid-cols-[1fr_6fr_1fr] xl:grid-cols-[1fr_2fr_1fr]">
  <div
    use:motion={{ initial: { scale: 0.8 }, animate: { scale: 1 }, transition: { delay: 0.3 } }}
    class="w-full col-span-full justify-self-center sm:w-8/10"
  >
    {#if $page.data.image && !$page.data.hideCover}
      {@const image = $page.data.image[0]}
      <Image
        class="bg-surafce object-cover rounded-2xl w-full max-h-[max(520px,_65vh)] overflow-hidden lt-sm:rounded-lg"
        id={image.id}
        aspectRatio={image.aspectRatio}
        blurDataUrl={image.blurDataUrl}
        alt={`${$page.data.title} project cover image`}
        isVideo={image.isVideo}
      />
    {/if}
  </div>

  <projectmeta class="divide-y divide-border mt-8 text-fg-secondary col-start-2 block sm:mt-16">
    <h1 class="font-600 mb-4">{$page.data.title}</h1>

    <div class="pt-8 gap-6 grid-cols-2 sm:grid">
      <item class="col-span-full">
        <small>Description</small>
        <p>{$page.data.excerpt}</p>
      </item>

      {#each $page.data.meta ?? [] as meta, index}
        <item class:col-span-full={index === 0 && meta.title === 'Context'}>
          <small>{meta.title}</small>
          <p>{meta.content}</p>
        </item>
      {/each}

      {#if $page.data.tag}
        <item>
          <small>Tag</small>
          <p>{($page.data.tag ?? ['']).join(', ')}</p>
        </item>
      {/if}

      <div class="flex flex-wrap col-span-full pt-12 gap-6">
        {#each $page.data.action ?? [] as link}
          <a
            href={link.url}
            class="bg-surface border-border rounded-full border-1 shadow text-fg text-center py-2 px-8 block"
            data-splitbee-event="Open Link"
            data-splitbee-target={link.url}>{link.label}</a
          >
        {/each}
      </div>
    </div>
  </projectmeta>
</section>

<slot />

<style>
  h1 {
    font-variation-settings: 'slnt' 2;
  }

  small {
    @apply font-650 text-sm text-fg uppercase;
  }

  item p {
    @apply font-475 mt-1;
  }

  item:not(:first-of-type) {
    @apply mt-6 block;
  }

  @screen sm {
    item:not(:first-of-type) {
      @apply mt-0;
    }

    item p {
      @apply mt-2;
    }
  }
</style>
