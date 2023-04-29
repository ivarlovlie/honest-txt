<script lang="ts">
  import { state, Stages } from "$lib/state";
  import Welcome from "./welcome.svelte";
  import ChooseLang from "./choose-lang.svelte";
  import ChooseName from "./choose-name.svelte";
  import Chat from "./chat.svelte";
  import Info from "./info.svelte";
  import Thought from "./thought.svelte";
  import Outro from "./outro.svelte";
</script>

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
