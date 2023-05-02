<script>
  //@ts-nocheck
  import LL from "$i18n/i18n-svelte";
  import { Stages, state } from "$lib/state";
  import { onDestroy, onMount } from "svelte";
  import autosize from "autosize";
  import { profilePictureFallback } from "$lib/utils";
  import Dots from "$lib/components/dots.svelte";
  const caret = document.createElement("div");
  caret.className = "caret";
  let messages;
  let display;
  let sendButton;
  let textarea;
  let sendTimeout = null;
  let timeout;
  const timeouts = [];

  const strings = {
    cs: [
      "náhle",
      "úzký",
      "hbitý",
      "poloviční",
      "kluzký",
      "suchý",
      "zkracující",
      "teplý",
      "produktivní",
      "extra",
      "plout",
      "následovat",
      "mapovat",
      "přetvařovat se",
      "klíčit",
      "domnívat se",
      "házet",
      "setkat se",
      "husí kůže",
      "list",
      "domov",
      "nit",
      "ručně psaný text",
      "sáček",
      "znak",
      "scéna",
      "sval",
      "vřeteno",
      "bez zápachu",
      "deska",
      "bublina",
      "rada",
    ],
    en: [
      "ambivalent",
      "deserted",
      "sudden",
      "narrow",
      "flexible",
      "half",
      "smooth",
      "dry",
      "abbreviating",
      "warm",
      "smooth",
      "productive",
      "extra",
      "direct",
      "common",
      "jumping",
      "indefinite",
      "slow",
      "voluntary",
      "known",
      "original",
      "wavy",
      "out",
      "contribute",
      "unfold",
      "bind",
      "hurry",
      "operate",
      "mess",
    ],
    nb: [
      "direkte",
      "felles",
      "hoppende",
      "ubestemt",
      "sakte",
      "frivillig",
      "kjent",
      "opprinnelig",
      "vaiende",
      "luktfri",
      "perm",
      "boble",
      "råd",
      "tusj",
      "krykke",
      "hode",
      "plaster",
      "blekk",
      "omvei",
      "bjørnetjeneste",
      "protese",
      "kontor",
      "linje",
      "stikling",
      "fatning",
      "skjerm",
      "oppdatering",
      "perspektiv",
      "arbeid",
    ],
  };

  let showContinueTooltip = false;
  let showDots = false;

  const timings = {
    wordFill: 2000,
    autoSend: 30000,
  };

  function rollOn() {
    $state.currentStage = Stages.THOUGHT;
  }

  function startFillWordTimer() {
    const stopPunctuationPattern = /[.?!]$/;
    const text = textarea.value.trim();

    stopFillWordTimer();
    timeout = setTimeout(fillWord, timings.wordFill);
    timeouts.push(timeout);
    console.log("Started fill word timeout");
    // // Only start timer if there is no stop punctuation
    // if (!stopPunctuationPattern.test(text)) {
    //   timeout = setTimeout(fillWord, timings.wordFill);
    //   timeouts.push(timeout);
    //   console.log("Started fill word timeout");
    // }
  }

  function stopFillWordTimer() {
    if (timeout !== null) {
      console.log("Stopped fill word timeout");
      clearTimeout(timeout);
      timeout = null;
    }
  }

  function getRandomStringFromArray(strings) {
    return strings[~~(Math.random() * strings.length)];
  }

  function fillWord() {
    console.log("Fill word");
    const spaceBetween = textarea.value.endsWith(" ") ? "" : " ";
    textarea.value = `${
      textarea.value
    }${spaceBetween}${getRandomStringFromArray(strings[$state.locale])}`;
    autosize.update(textarea);
    updateDisplay();
    startFillWordTimer();
    textarea.style.color = "transparent";
  }

  function startSendTimeout() {
    if (sendTimeout === null) {
      console.log("Start send timeout");
      sendTimeout = setTimeout(send, timings.autoSend);
      timeouts.push(sendTimeout);
    }
  }

  function resetSendTimeout() {
    console.log("Reset send timeout");
    clearTimeout(sendTimeout);
    sendTimeout = null;
  }

  function goToEnd() {
    const length = textarea.value.length;
    textarea.setSelectionRange(length, length);
  }

  function addGhostMessage(message) {
    const newMessage = document.createElement("div");
    newMessage.classList.add("message", "from", "new");
    newMessage.innerHTML = `
    <div class="picture"></div>
    <div class="texts">
      <p>
        ${message}
      </p>
    </div>
  `;
    messages.appendChild(newMessage);
    scrollToBottom();
  }

  let dotsTimeout;

  function startDots() {
    if (dotsTimeout) return;
    dotsTimeout = setTimeout(() => {
      showDots = true;
      let t = setTimeout(() => {
        showDots = false;
        addGhostMessage($LL.theResponse());
        showContinueTooltip = true;
      }, 4000);
      timeouts.push(t);
    }, 4000);
    timeouts.push(dotsTimeout);
  }

  function send() {
    const text = textarea.value.trim();
    if (!text) return;

    textarea.value = "";
    textarea.blur();
    autosize.update(textarea);
    updateDisplay();
    resetSendTimeout();
    startDots();

    if (messages.lastElementChild.classList.contains("to")) {
      const newMessage = document.createElement("p");
      newMessage.textContent = text;
      messages.lastElementChild.lastElementChild.appendChild(newMessage);
    } else {
      const newMessage = document.createElement("div");
      newMessage.classList.add("message", "to", "new");
      newMessage.innerHTML = `
        <div class="texts written">
          <p>
            ${text}
          </p>
        </div>
      `;
      messages.appendChild(newMessage);
    }

    scrollToBottom();
  }

  function scrollToBottom() {
    messages.lastElementChild.scrollIntoView();
  }

  function updateDisplay() {
    display.innerText = textarea.value;
    if (document.activeElement === textarea) {
      display.appendChild(caret);
    }
  }

  onMount(async () => {
    autosize(textarea);
    textarea.addEventListener("input", updateDisplay);
    textarea.addEventListener("select", goToEnd);
    textarea.addEventListener("input", goToEnd);
    textarea.addEventListener("focus", goToEnd);
    textarea.addEventListener("keydown", goToEnd);
    textarea.addEventListener("keyup", goToEnd);
    textarea.addEventListener("input", startFillWordTimer);
    textarea.addEventListener("focus", startFillWordTimer);
    textarea.addEventListener("blur", stopFillWordTimer);
    sendButton.addEventListener("click", send);
    textarea.addEventListener("focus", startSendTimeout);
    textarea.addEventListener("focus", () => {
      display.appendChild(caret);
    });
    textarea.addEventListener("blur", () => {
      display.removeChild(caret);
    });
    textarea.addEventListener("input", () => {
      textarea.style.color = "transparent";
    });
    textarea.addEventListener("keydown", (event) => {
      if (event.code === "Backspace") {
        event.preventDefault();
      }
      if (event.code === "Enter") {
        send();
      }
    });
  });
  onDestroy(() => {
    timeouts.forEach((t) => clearTimeout(t));
  });
</script>

<aside
  id="continue-message"
  on:click={rollOn}
  on:keydown={rollOn}
  style="display: {showContinueTooltip ? 'block' : 'none'}"
>
  <p>{$LL.clickHereToContinue()} &gt;&gt;&gt;</p>
</aside>

<section>
  <header>
    <div class="profile">
      <div class="picture">{profilePictureFallback($state.name)}</div>
      <div class="name">{$state.name}</div>
    </div>
  </header>

  <main class="messages" bind:this={messages}>
    <div class="date">02. JAN, 11:40</div>
    <div class="message from">
      <div class="picture" />
      <div class="texts">
        <p>{$LL.initialChat[1].chat()}</p>
      </div>
    </div>
    <div class="message to">
      <div class="texts">
        <p>{$LL.initialChat[1].response()}</p>
      </div>
    </div>
    <div class="message from">
      <div class="picture" />
      <div class="texts">
        <p>{$LL.initialChat[2].chat1()}</p>
        <p>{$LL.initialChat[2].chat2()}</p>
      </div>
    </div>
    <div class="date initial-message">{$LL.yesterday() + ", 18:40"}</div>
    <div class="system-message initial-message">
      * {$LL.personHasActivatedHonestTxt({ person: $state.name })}
    </div>
    <div class="date initial-message">{$LL.now()}</div>
    {#if showDots}
      <div class="message from">
        <div class="picture" />
        <div class="texts">
          <p>
            <Dots />
          </p>
        </div>
      </div>
    {/if}
  </main>

  <footer>
    <div class="input">
      <textarea
        class="input"
        bind:this={textarea}
        placeholder={$LL.inputPlaceholder()}
      />
      <div class="display" bind:this={display} />
    </div>

    <div class="actions">
      <button type="button" class="button" bind:this={sendButton}>Send</button>
    </div>
  </footer>
</section>

<style>
  @import url("/chat.css");

  :global(#b2s) {
    color: red !important;
    left: 5px;
    top: 5px;
  }

  section {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  :global(body) {
    background-color: white;
  }

  #continue-message {
    color: #56525c;
    font-size: 14px;
    position: absolute;
    cursor: pointer;
    z-index: 10000;
    right: 5px;
    top: 5px;
  }

  #continue-message p {
    margin: 0;
  }
</style>
