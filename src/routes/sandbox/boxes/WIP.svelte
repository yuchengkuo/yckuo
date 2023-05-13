<script>
  import { wrap } from 'popmotion'
  import { onMount } from 'svelte'

  let amount = 0

  onMount(() => {
    const interval = setInterval(() => {
      amount++
    }, 500)
    return () => {
      clearInterval(interval)
    }
  })
</script>

<div class="my-40 text-fg-secondary">
  WIP{#each new Array(wrap(0, 4, amount)).fill('.') as dot}{dot}{/each}
</div>
