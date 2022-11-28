<script lang="ts">
  import Arena from './Arena.svelte'
  import Avatar from './Avatar.svelte'
  import Figma from './Figma.svelte'
  import Github from './Github.svelte'
  import Readcv from './Readcv.svelte'
  import Savee from './Savee.svelte'
</script>

<div class="flex gap-6 justify-end items-end lt-sm:gap-4 lt-md:(mt-20 flex-row-reverse) ">
  <small class="mb-0 self-center lt-sm:self-auto">ヅ</small>
  <Readcv />
  <Github />
  <Figma />
  <Arena />
  <Savee />
  <Avatar />
</div>
