<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import { state, Stages, reset } from "$lib/state";
  import Welcome from "./welcome.svelte";
  import ChooseLang from "./choose-lang.svelte";
  import ChooseName from "./choose-name.svelte";
  import Chat from "./chat.svelte";
  import Info from "./info.svelte";
  import Thought from "./thought.svelte";
  import Outro from "./outro.svelte";

  function b2s() {
    reset();
    $state.currentStage = Stages.WELCOME;
  }
</script>

{#if $state.currentStage !== Stages.WELCOME && $state.currentStage !== Stages.LANG}
  <button id="b2s" on:click={b2s}>&lt;&lt;&lt; {$LL.backToStart()}</button>
{/if}

{#if $state.currentStage === Stages.WELCOME}
  <Welcome />
{/if}

{#if $state.currentStage === Stages.LANG}
  <ChooseLang />
{/if}

{#if $state.currentStage === Stages.NAME}
  <ChooseName />
{/if}

{#if $state.currentStage === Stages.INFO}
  <Info />
{/if}

{#if $state.currentStage === Stages.CHAT}
  <Chat />
{/if}

{#if $state.currentStage === Stages.THOUGHT}
  <Thought />
{/if}

{#if $state.currentStage === Stages.OUTRO}
  <Outro />
{/if}

<style>
  #b2s {
    all: unset;
    position: absolute;
    top: 0;
    color: black;
    cursor: pointer;
    padding: 5px;
    z-index: 2000;
  }
</style>
