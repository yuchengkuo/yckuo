<script lang="ts">
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
  <Savee />
  <Avatar />
</div>
