<script lang="ts">
  interface Props {
    code: string
  }

  let { code }: Props = $props()
</script>

{@html code}
