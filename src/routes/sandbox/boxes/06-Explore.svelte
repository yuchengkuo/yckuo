<script context="module">
  export const meta = {
    title: 'Action Button',
    date: '2022/12/18',
  }
</script>

<button> Start Exploring<span class="i-bxs-chevron-right ml-1 transition" /></button>

<style>
  button {
    --uno: 'block my-16 py-3 px-4 leading-none bg-rx-cyan-9 dark:bg-rx-green9 text-white rounded-lg font-700 relative';
  }
  button::before {
    --uno: 'transition opacity-0';
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    background-image: linear-gradient(180deg, rgba(255, 255, 255, 0.1), transparent);
    background-blend-mode: normal;
  }
  button:hover::before {
    --uno: 'shadow-lg opacity-100';
  }
  button:active::before {
    --uno: 'shadow-md opacity-50';
  }
  button:hover span {
    --uno: 'translate-x-0.75';
  }
  button:active span {
    --uno: 'translate-x-1';
  }
</style>
