<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import type { RenderableTreeNodes } from '@markdoc/markdoc'

  import Image from '$lib/media/Image.svelte'
  import Expand from './Expand.svelte'
  import Video from '$lib/media/Video.svelte'
  import CodeBlock from './CodeBlock.svelte'
  import Gallery from './Gallery.svelte'

  interface Props {
    content: RenderableTreeNodes
    components?: Record<string, any>
  }

  let { content, components = {} }: Props = $props()

  const shared: Record<string, any> = {
    img: Image,
    vid: Video,
    CodeBlock,
    Expand,
    Gallery
  }
</script>

<Markdoc {content} components={{ ...shared, ...components }} />
