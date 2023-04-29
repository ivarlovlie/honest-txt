<script lang="ts">
  import { reset } from "$lib/state";
  import { onMount } from "svelte";

  onMount(() => {
    // The frontpage serves as a total reset, just in case
    reset();
  });
</script>

<h1>Welcome to honest.txt</h1>
<a href="/a">Start</a>
