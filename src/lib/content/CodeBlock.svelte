<script lang="ts">
  interface Props {
    code: string
  }

  /* {code} will be the transformed html from shiki (markdoc.config.ts) */
  let { code }: Props = $props()
</script>

{@html code}
