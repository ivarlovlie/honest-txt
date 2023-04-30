<script>
  import { setLocale } from "$i18n/i18n-svelte";
  import { loadLocaleAsync } from "$i18n/i18n-util.async";
  import { onMount } from "svelte";
  import { state } from "$lib/state";

  onMount(async () => {
    await loadLocaleAsync($state.locale);
    setLocale($state.locale);
  });
</script>

<svelte:head>
  <title>
    honest.txt
  </title>
</svelte:head>

<slot />

<style>
  :global(html) {
    height: 100%;
  }
  :global(body) {
    height: 100%;
    background: #f5f5f5;
    font-family: system-ui, -apple-system, BlinkMacSystemFont,
      ".SFNSText-Regular", sans-serif;
    font-size: 16px;
    line-height: 1.34;
    margin: 0;
    padding: 0;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
</style>
