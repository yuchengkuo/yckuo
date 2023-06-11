<script context="module">
  export const meta = {
    title: 'Like Button',
    date: '2022/11/27',
  }
</script>

<script lang="ts">
  import { spring } from 'motion'
  import { Confetti } from 'svelte-confetti'
  import { motion } from '$lib/animation/motion'

  let up = false
  let down = false
  let count = 0

  function upvote() {
    count++
    up = true
    down = false
  }
  function downvote() {
    down = true
    up = false
  }
</script>

<div>
  <button on:click={upvote}>
    {#if up}
      <Confetti
        amount="15"
        x={[-0.4, 0.4]}
        y={[-0.1, 0.3]}
        duration={1700}
        fallDistance="4px"
        rounded
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="20"
        height="20"
        use:motion={{
          animate: {
            transform: [
              'none',
              'translate3d(-4px,-8px,1px) scale3d(0.8,1.2,1) rotate3d(0,0,1,-12deg)',
              'none',
            ],
          },
          transition: { easing: spring({ damping: 60, stiffness: 100 }) },
        }}
      >
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M2 9h3v12H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1zm5.293-1.293l6.4-6.4a.5.5 0 0 1 .654-.047l.853.64a1.5 1.5 0 0 1 .553 1.57L14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H8a1 1 0 0 1-1-1V8.414a1 1 0 0 1 .293-.707z"
          fill="currentColor"
          use:motion={{
            animate: {
              fill: ['pink', 'yellow', 'lightgreen', 'lightblue', 'pink', 'currentColor'],
            },
            transition: { duration: 2 },
          }}
        />
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h3.482a1 1 0 0 0 .817-.423L11.752.85a.5.5 0 0 1 .632-.159l1.814.907a2.5 2.5 0 0 1 1.305 2.853L14.6 8zM7 10.588V19h11.16L21 12.104V10h-6.4a2 2 0 0 1-1.938-2.493l.903-3.548a.5.5 0 0 0-.261-.571l-.661-.33-4.71 6.672c-.25.354-.57.644-.933.858zM5 11H3v8h2v-8z"
          fill="currentColor"
        />
      </svg>
    {/if}
    {count}
  </button>

  <button on:click={downvote}>
    {#if down}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M22 15h-3V3h3a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1zm-5.293 1.293l-6.4 6.4a.5.5 0 0 1-.654.047L8.8 22.1a1.5 1.5 0 0 1-.553-1.57L9.4 16H3a2 2 0 0 1-2-2v-2.104a2 2 0 0 1 .15-.762L4.246 3.62A1 1 0 0 1 5.17 3H16a1 1 0 0 1 1 1v11.586a1 1 0 0 1-.293.707z"
          fill="currentColor"
        />
      </svg>
    {:else}
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
        <path fill="none" d="M0 0h24v24H0z" />
        <path
          d="M9.4 16H3a2 2 0 0 1-2-2v-2.104a2 2 0 0 1 .15-.762L4.246 3.62A1 1 0 0 1 5.17 3H22a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-3.482a1 1 0 0 0-.817.423l-5.453 7.726a.5.5 0 0 1-.632.159L9.802 22.4a2.5 2.5 0 0 1-1.305-2.853L9.4 16zm7.6-2.588V5H5.84L3 11.896V14h6.4a2 2 0 0 1 1.938 2.493l-.903 3.548a.5.5 0 0 0 .261.571l.661.33 4.71-6.672c.25-.354.57-.644.933-.858zM19 13h2V5h-2v8z"
          fill="currentColor"
        />
      </svg>
    {/if}
  </button>
</div>

<style>
  div {
    --uno: 'rounded-full my-20 bg-rx-gray-3 flex items-center divide-x divide-border';
  }
  button {
    --uno: 'py-2 hover:bg-rx-gray-4 active:bg-rx-gray-5 rounded-inherit';
  }
  button:first-child {
    --uno: 'pl-5 pr-3 rounded-r-none font-Azeret';
  }
  button:last-child {
    --uno: 'pl-3 pr-5 rounded-l-none';
  }
  svg {
    --uno: 'inline';
  }
</style>
