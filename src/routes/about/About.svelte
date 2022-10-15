<script lang="ts">
  import Avatar from './Avatar.svelte'
  import Github from './Github.svelte'
  import Readcv from './Readcv.svelte'
  import Savee from './Savee.svelte'
</script>

<div class="flex flex-wrap gap-6 justify-end">
  <div class="flex flex-col gap-6 items-end justify-end">
    <Avatar />
    <Github />
    <Readcv />
  </div>
  <Savee />
</div>
