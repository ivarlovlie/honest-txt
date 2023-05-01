<script lang="ts">
  import Logo from "$lib/components/logo.svelte";
  import { state, Stages } from "$lib/state";

  function start() {
    $state.currentStage = Stages.LANG;
  }
</script>

<section on:click={start} on:keypress={start}>
  <h1>Don't fear the griever</h1>
  <div id="logo">
    <Logo fill="white" />
  </div>
  <h2>honest.txt</h2>
  <button>tap to start >>></button>
</section>

<style>
  section {
    background-color: red;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 30px;
    height: 100%;
    cursor: pointer;
  }

  button {
    all: unset;
    font-size: 36px;
    font-weight: 300;
  }

  h1 {
    font-size: 64px;
    font-weight: 300;
    text-align: center;
    margin: 0 15px;
  }

  h2 {
    font-size: 24px;
    font-weight: 300;
    margin-top: -30px;
  }

  #logo {
    width: 190px;
    margin: 15px;
  }
</style>
