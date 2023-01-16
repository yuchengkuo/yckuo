<script lang="ts">
  import { page } from '$app/stores'
  import { motion } from '$lib/animation/motion'
  import Image from '$lib/image/Image.svelte'
  import Head from '$lib/seo/Head.svelte'
</script>

<Head title={$page.data.title}>
  <script>
    document.documentElement.setAttribute('data-theme', 'project_id')
  </script>
</Head>

<section md="gap-x-10 grid grid-cols-[1fr_56ch_1fr]" children="col-start-2">
  <h1 class="mb-4">{$page.data.title}</h1>

  <div
    use:motion={{ initial: { scale: 0.8 }, animate: { scale: 1 }, transition: { delay: 0.3 } }}
    md="w-12/10 justify-self-center"
  >
    {#if $page.data.image && !$page.data.hideCover}
      {@const image = $page.data.image[0]}
      <Image
        class="shadow-md rounded-lg"
        id={image.id}
        aspectRatio={image.aspectRatio}
        blurDataUrl={image.blurDataUrl}
        alt="{$page.data.title} project cover image"
        isVideo={image.isVideo}
      />
    {/if}
  </div>

  <div class="mt-6 text-fg-secondary" md="mt-6">
    <ul class="grid grid-cols-2 gap-6" md="gap-6">
      <li class="col-span-full">
        <small>Description</small>
        <p>{$page.data.excerpt}</p>
      </li>

      {#each $page.data.meta ?? [] as meta, index}
        <li class:col-span-full={index === 0 && meta.title === 'Context'}>
          <small>{meta.title}</small>
          <p>{meta.content}</p>
        </li>
      {/each}

      {#if $page.data.tag}
        <li>
          <small>Tag</small>
          <p>{($page.data.tag ?? ['']).join(', ')}</p>
        </li>
      {/if}

      <div class="flex flex-wrap col-span-full pt-6 gap-4" md="gap-6">
        {#each $page.data.action ?? [] as link}
          <a
            href={link.url}
            class="bg-surface border-border rounded-full border-1 shadow text-fg text-center py-2 px-8 block"
            transition="all ease-out 200"
            hover="bg-fg/5 shadow-md dark:bg-fg/12"
            data-splitbee-event="Open Link"
            data-splitbee-target={link.url}>{link.label}</a
          >
        {/each}
      </div>
    </ul>
  </div>
</section>

<slot />

<style>
  small {
    --uno: font-700 text-sm text-fg uppercase;
  }

  li p {
    --uno: font-475 mt-1 leading-8;
  }

  li:not(:first-of-type) {
    --uno: block;
  }

  @screen sm {
    li:not(:first-of-type) {
      --uno: mt-0;
    }

    li p {
      --uno: mt-2;
    }
  }
</style>
