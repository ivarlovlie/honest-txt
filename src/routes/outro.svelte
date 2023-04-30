<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import Logo from "$lib/components/logo.svelte";
  import { Stages, reset, state } from "$lib/state";
  import { onDestroy } from "svelte";

  let timeout = setTimeout(startOver, 60000);

  function startOver() {
    reset();
    // In some cases svelte does not catch the state update, so we make sure we get back to start here
    $state.currentStage = Stages.WELCOME;
    clearTimeout(timeout);
  }

  onDestroy(() => {
    clearTimeout(timeout);
  });
</script>

<section>
  <div id="logo">
    <h1>honest.txt</h1>
    <Logo fill="red" />
  </div>
  <h2>{$LL.about()}</h2>
  <p>{$LL.outro()}</p>
  <p>{$LL.outro1()}</p>
  <p>{$LL.outro2()}</p>
  <button on:click={startOver}>{$LL.tryAgain()}</button>
</section>

<style>
  section {
    background-color: #fff8f2;
    color: red;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  p {
    text-align: center;
    max-width: 330px;
    margin-bottom: 0;
    font-weight: 300;
  }

  button {
    all: unset;
    font-size: 20px;
    font-weight: 300;
    color: #fff8f2;
    background-color: red;
    padding: 12px 14px;
    border: 0;
    border-radius: 15px;
    cursor: pointer;
    user-select: none;
    margin-top: 15px;
  }

  h1 {
    font-size: 24px;
    font-weight: 300;
    text-align: center;
    margin-bottom: -10px;
  }

  h2 {
    margin: 0;
    font-weight: 300;
    font-size: 20px;
  }

  #logo {
    width: 160px;
  }
</style>
