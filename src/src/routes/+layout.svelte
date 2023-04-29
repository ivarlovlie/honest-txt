<script>
  import { loadLocale } from "$i18n/i18n-util.sync";

</script>
<slot />

<style>
  :global(body) {
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
