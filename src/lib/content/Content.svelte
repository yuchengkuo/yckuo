<script lang="ts">
  import Markdoc from 'sveltejs-markdoc'

  import type { RenderableTreeNodes } from '@markdoc/markdoc'

  import Image from '$lib/media/Image.svelte'
  import Expand from './Expand.svelte'
  import Video from '$lib/media/Video.svelte'
  import CodeBlock from './CodeBlock.svelte'

  export let content: RenderableTreeNodes
  export let components: Record<string, any> = {}

  const shared: Record<string, any> = {
    img: Image,
    vid: Video,
    CodeBlock,
    Expand
  }
</script>

<Markdoc {content} components={{ ...shared, ...components }} />
