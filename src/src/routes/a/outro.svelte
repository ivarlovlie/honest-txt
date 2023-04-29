<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import Logo from "$lib/components/logo.svelte";
  import { Stages, reset, state } from "$lib/state";

  function startOver() {
    reset();
    // In some cases svelte does not catch the state update, so we make sure we get back to start here
    $state.currentStage = Stages.WELCOME;
  }
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
    gap: 15px;
    height: 100vh;
  }

  p {
    text-align: center;
    max-width: 330px;
  }

  button {
    all: unset;
    font-size: 36px;
    font-weight: 300;
    color: #fff8f2;
    background-color: red;
    padding: 12px 14px;
    border: 0;
    border-radius: 10px;
    cursor: pointer;
    user-select: none;
  }

  h1 {
    font-size: 24px;
    font-weight: 300;
    text-align: center;
    margin-bottom: -10px;
  }

  #logo {
    width: 190px;
    margin: 15px;
  }
</style>
