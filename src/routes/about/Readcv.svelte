<script lang="ts">
  import { motion } from '$lib/animation/motion'
</script>

<readcv
  data-theme="pink"
  class="bg-bg ml-auto rounded-3xl h-52 shadow-lg p-5 w-52 block relative overflow-hidden"
>
  <div
    use:motion={{ hover: { y: -16 } }}
    class="rounded-md mx-auto shadow-md mt-1/3 block overflow-hidden"
  >
    <a href="https://read.cv/yuchengkuo"><img src="/images/cv.png" alt="cv" /></a>
  </div>

  <overlay class="inset-0 absolute pointer-events-none" />

  <a href="https://read.cv" class="h-10 text-fg-secondary top-4 right-4 w-10 absolute block">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"
      ><path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.809 5.242a1.25 1.25 0 00-1.531.884L6.042 18.2a1.25 1.25 0 00.884 1.53l9.66 2.59a1.25 1.25 0 001.53-.885l3.236-12.074a1.25 1.25 0 00-.884-1.53l-9.66-2.589zm-2.98.496a2.75 2.75 0 013.368-1.945l9.66 2.588A2.75 2.75 0 0122.8 9.75l-3.236 12.074a2.75 2.75 0 01-3.368 1.945L6.538 21.18a2.75 2.75 0 01-1.944-3.368L7.829 5.738z"
        fill="currentColor"
      /><path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M10.518 8.27a.75.75 0 01.919-.53l7.241 1.94a.75.75 0 01-.388 1.449l-7.242-1.94a.75.75 0 01-.53-.919zM9.677 11.41a.75.75 0 01.918-.531l7.242 1.94a.75.75 0 11-.388 1.45l-7.242-1.941a.75.75 0 01-.53-.919zM8.836 14.549a.75.75 0 01.918-.53l4.83 1.293a.75.75 0 11-.388 1.45l-4.83-1.295a.75.75 0 01-.53-.918z"
        fill="currentColor"
      /></svg
    >
  </a>
</readcv>

<style>
  overlay {
    background-image: linear-gradient(to bottom, transparent 90%, rgb(var(--colors-bg)));
  }
</style>
