<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import { Stages, state } from "$lib/state";

  function carryOn() {
    $state.currentStage = Stages.CHAT;
  }
</script>

<section>
  <div id="build-up">
    <p>
      {$LL.buildUp({ person: $state.name })}
    </p>
    <p>{"</3"}</p>
    <p>
      {$LL.buildUp2({ person: $state.name })}
    </p>
  </div>
  <button on:click={carryOn}>{$LL.continueFromInfo()}</button>
</section>

<style>
  section {
    height: 100vh;
    background-color: #e5dcf5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }

  #build-up {
    width: 80%;
    max-width: 330px;
  }

  p {
    color: #56525c;
    font-size: 30px;
    font-weight: 300;
    text-align: center;
  }

  button {
    all: unset;
    font-size: 32px;
    margin-top: 30px;
    cursor: pointer;
    padding: 10px;
  }
</style>
