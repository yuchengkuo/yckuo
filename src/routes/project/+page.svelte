<script lang="ts">
  import Head from '$lib/seo/Head.svelte'

  import Intro from '../Intro.svelte'
  import Project from './Project.svelte'

  import type { LayoutData } from './$types'

  export let data: LayoutData
</script>

<Head
  title="Projects"
  description="Experiments, fun works and explorations."
  openGraph={{ url: 'project' }}
/>

<Intro route={data.routes.find((r) => r.title === 'Project')} />

<div class="max-w">
  <ul class="mt-20 lt-sm:mt-10">
    {#each data.projects as project}
      <Project {project} />
    {/each}
  </ul>
</div>
