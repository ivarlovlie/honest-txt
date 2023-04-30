<script lang="ts">
  import LL from "$i18n/i18n-svelte";
  import { Stages, state } from "$lib/state";

  function carryOn() {
    $state.currentStage = Stages.OUTRO;
  }
</script>

<section>
  <p>
    {$LL.thoughtThatCounts()}
    <br />
    <br />
    {"</3"}
  </p>
  <button on:click={carryOn}>{">>>"}</button>
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
    color: #56525c;
  }

  p {
    font-size: 30px;
    font-weight: 300;
    text-align: center;
    width: 80%;
    max-width: 330px;
  }

  button {
    all: unset;
    font-size: 32px;
    margin-top: 30px;
    cursor: pointer;
    padding: 10px;
  }
</style>
