<script lang="ts">
  import { Stages, state } from "$lib/state";
  import { setLocale } from "$i18n/i18n-svelte";
  import type { Locales } from "$i18n/i18n-types";
  import { loadLocaleAsync } from "$i18n/i18n-util.async";

  async function handleLocaleClick(locale: Locales) {
    await loadLocaleAsync(locale);
    setLocale(locale);
    $state.currentStage = Stages.NAME;
  }
</script>

<section>
  <button
    on:click={() => handleLocaleClick("cs")}
    title="Používejte češtinu jako svůj jazyk"
  >
    🇨🇿
  </button>
  <button
    on:click={() => handleLocaleClick("en")}
    title="Use english as your language"
  >
    🇬🇧
  </button>
  <button
    on:click={() => handleLocaleClick("nb")}
    title="Bruk norsk bokmål som ditt språk"
  >
    🇳🇴
  </button>
</section>

<style>
  section {
    display: flex;
    height: 100vh;
    align-items: center;
    gap: 20px;
    flex-direction: column;
    justify-content: center;
  }
  button {
    all: unset;
    cursor: pointer;
    font-size: 5em;
    padding: 10px;
    width: 50%;
    display: flex;
    justify-content: center;
  }
</style>
