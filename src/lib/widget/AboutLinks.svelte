<script lang="ts">
  import Arena from './AboutLinks/Arena.svelte'
  import Avatar from './AboutLinks/Avatar.svelte'
  import Figma from './AboutLinks/Figma.svelte'
  import Github from './AboutLinks/Github.svelte'
  import Readcv from './AboutLinks/Readcv.svelte'
  import Savee from './AboutLinks/Savee.svelte'
</script>

<div class="my-8 flex gap-6 justify-end items-end lt-sm:gap-4 lt-md:flex-row-reverse">
  <small class="mb-0 xl:mr-auto">ヅ</small>
  <Readcv />
  <Github />
  <Figma />
  <Arena />
  <Savee />
  <Avatar />
</div>
