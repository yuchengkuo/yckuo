<script lang="ts">
  import { formatDate } from '$lib/util'

  let year = $state(Date.now())
</script>

{formatDate(year, { year: 'numeric' })}
