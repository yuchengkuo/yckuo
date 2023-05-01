<script context="module">
  export const meta = {
    title: 'Simple Tabs',
    date: '2022/12/18',
  }
</script>

<button
  class="my-16 py-3 px-4 leading-none bg-rx-cyan-9 text-white rounded-lg font-700 relative"
  dark="bg-green-900"
  before="transition opacity-0"
>
  Start Exploring<span class="i-bxs-chevron-right align-mid ml-1 transition" /></button
>

<style>
  button::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent);
    background-blend-mode: normal;
  }
  button:hover::before {
    --uno: shadow-lg opacity-100;
  }
  button:active::before {
    --uno: shadow-md opacity-50;
  }
  button:hover span {
    --uno: translate-x-0.75;
  }
  button:active span {
    --uno: translate-x-1;
  }
</style>
