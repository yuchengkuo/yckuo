<script lang="ts">
  import { onMount } from 'svelte'

  import { formatDate } from '$lib/util'

  let now: string = $state(formatTime(Date.now()))
  function formatTime(date: number) {
    return formatDate(date, { timeStyle: 'medium', hour12: false })
  }

  onMount(() => {
    const timer = setInterval(() => {
      now = formatTime(Date.now())
    }, 10)

    return () => clearInterval(timer)
  })
</script>

<time class="lining-nums tabular-nums text-secondary" datetime={now}>{now}</time>
