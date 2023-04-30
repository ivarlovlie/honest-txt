<script>
  import LL from "$i18n/i18n-svelte";
  import { Stages, state } from "$lib/state";
  import { capitalise } from "$lib/utils";

  let name = "";
  function submit() {
    if (!name) return;
    $state.name = capitalise(name);
    $state.currentStage = Stages.INFO;
  }
</script>

<section>
  <div id="instructions">
    <p id="instruct-1">{$LL.nameOfFriend()}</p>
    <p id="instruct-2">{$LL.nameOfFriend2()}</p>
  </div>
  <form on:submit={submit}>
    <input type="text" bind:value={name} required />
    <input type="submit" value="Go" />
  </form>
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
  input[type="text"],
  input[type="submit"] {
    font-size: 30px;
    padding: 18px 22px;
    border-radius: 10px;
    background-color: #fff8f2;
    border: 0;
    color: #56525c;
  }
  input[type="text"] {
    width: 220px;
  }
  input[type="submit"] {
    cursor: pointer;
  }
  form {
    max-width: 400px;
    display: flex;
    justify-content: flex-end;
    gap: 5px;
  }
  #instructions {
    text-align: center;
    width: 320px;
  }
  #instruct-1 {
    color: #56525c;
    font-size: 30px;
  }

  #instruct-2 {
    color: #9f98a8;
    font-size: 20px;
  }
</style>
