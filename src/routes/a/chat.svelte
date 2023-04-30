<script>
  //@ts-nocheck
  import LL from "$i18n/i18n-svelte";
  import { Stages, state } from "$lib/state";
  import { onMount } from "svelte";
  import autosize from "autosize";
  import { profilePictureFallback } from "$lib/utils";
  const caret = document.createElement("div");
  let display;
  caret.className = "caret";
  let messages;
  let sendButton;
  let textarea;
  let sendTimeout = null;
  let timeout;
  let strings;

  function startFillWordTimer() {
    const stopPunctuationPattern = /[.?!]$/;
    const text = textarea.value.trim();

    stopFillWordTimer();

    // Only start timer if there is no stop punctuation
    if (!stopPunctuationPattern.test(text)) {
      timeout = setTimeout(fillWord, 6000);
      console.log("Started fill word timeout");
    }
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
    }${spaceBetween}${getRandomStringFromArray(strings)} `;
    autosize.update(textarea);

    updateDisplay();
    startFillWordTimer();
  }

  function startSendTimeout() {
    if (sendTimeout === null) {
      console.log("Start send timeout");
      sendTimeout = setTimeout(send, 5 * 1000);
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

  function send() {
    console.log("Send");

    resetSendTimeout();

    const text = textarea.value;

    if (text.trim().length) {
      textarea.value = "";
      textarea.blur();

      autosize.update(textarea);
      updateDisplay();

      if (messages.lastElementChild.classList.contains("to")) {
        const newMessage = document.createElement("p");
        newMessage.textContent = text;
        messages.lastElementChild.lastElementChild.appendChild(newMessage);
      } else {
        const date = document.createElement("div");
        date.classList.add("date");

        const hours = `${new Date().getHours()}`.padStart(2, "0");
        const minutes = `${new Date().getMinutes()}`.padStart(2, "0");

        date.textContent = `${hours}:${minutes}`;

        const newMessage = document.createElement("div");
        newMessage.classList.add("message", "to", "new");

        newMessage.innerHTML = `
        <div class="texts written">
          <p>
            ${text}
          </p>
        </div>
      `;

        messages.appendChild(date);
        messages.appendChild(newMessage);
      }
      scrollToBottom();
      setTimeout(() => {
        $state.currentStage = Stages.THOUGHT;
      }, 1500);
    }
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
    textarea.addEventListener("keydown", (event) => {
      if (event.code === "Backspace") {
        event.preventDefault();
      }
      if (event.code === "Enter") {
        send();
      }
    });
    strings = (
      await import("../../lib/assets/strings." + $state.locale + ".json")
    ).wordlist;
  });
</script>

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
    <div class="date">{$LL.yesterday() + ", 18:40"}</div>
    <div class="system-message">
      * {$LL.personHasActivatedHonestTxt({ person: $state.name })}
    </div>
    <div class="date">{$LL.now()}</div>
  </main>

  <footer>
    <div class="input">
      <textarea class="input" bind:this={textarea} />
      <div class="display" bind:this={display} />
    </div>

    <div class="actions">
      <button type="button" class="button" bind:this={sendButton}>Send</button>
    </div>
  </footer>
</section>

<style>
  @import url("/chat.css");
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
</style>
