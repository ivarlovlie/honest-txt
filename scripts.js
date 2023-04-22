const textarea = document.querySelector("textarea");
const display = document.querySelector(".display");
const caret = document.createElement("div");
caret.className = "caret";
const messages = document.querySelector(".messages");
const sendButton = document.querySelector(".button");
const scenes = document.querySelectorAll(".scene");
let currentScene = null;
let sendTimeout = null;
let timeout;
let ghostMessageTimeoutStarted = false;
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

  textarea.value = `${textarea.value}${spaceBetween}${getRandomStringFromArray(
    strings.wordlist
  )} `;
  window.autosize.update(textarea);

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

    window.autosize.update(textarea);
    updateDisplay();

    if (messages.lastElementChild.classList.contains("to")) {
      const newMessage = document.createElement("div");
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
        <div class="texts">
          <div>
            ${text}
          </div>
        </div>
      `;

      messages.appendChild(date);
      messages.appendChild(newMessage);
    }
  }
}

function updateDisplay() {
  display.innerText = textarea.value;
  if (document.activeElement === textarea) {
    display.appendChild(caret);
  }
}

function addSystemMessage(message) {
  const messages = document.querySelector(".messages");
  const systemMessage = document.createElement("div");
  systemMessage.classList.add("system-message", "new");
  systemMessage.innerHTML = `
    <i>*</i> ${message}
  `;

  messages.appendChild(systemMessage);
}

function startSystemMessageTimeout() {
  console.log("Start system message timeout");
  setTimeout(
    () =>
      addSystemMessage(`
    Willam has activated Honest text. Messages you write will be in honest.txt
  `),
    1 * 1000
  );
  setTimeout(
    () =>
      addSystemMessage(`
    If you hesitate, honest.txt gives you a random word to get you going. After 1 minute, the message will be automatically sent. Just write, don't worry.
  `),
    2 * 1000
  );
}

function addFriendMessage(message) {
  const messages = document.querySelector(".messages");
  const newMessage = document.createElement("div");
  newMessage.classList.add("message", "from", "new");
  newMessage.innerHTML = `
    <div class="picture"></div>
    <div class="texts">
      <div>
        ${message}
      </div>
    </div>
  `;

  messages.appendChild(newMessage);
}

function startGhostMessageTimeout() {
  console.log("Start ghost message timeout");
  ghostMessageTimeoutStarted = true;

  setTimeout(
    () =>
      addFriendMessage(`
    Halla.. Takk for meldingen. Den var jo interessant heh 😉 Jeg har det ikke så bra egentlig, kanskje vi kan møtes til uka?
  `),
    15 * 1000
  );
}

async function fetchStrings(locale = navigator.language ?? "en") {
  const response = await fetch("/assets/strings." + locale + ".json");
  if (response.ok) return await response.json();
}

function setScene() {
  scenes.forEach((scene) => {
    if (currentScene == null) {
      scenes[0].classList.add("active");
      currentScene = scenes[0];
      return;
    }
    console.log(currentScene.dataset.id, scene.dataset.id);
    if (currentScene.dataset.id == 0 && scene.dataset.id == 1)
      scene.classList.add("active");
    else scene.classList.remove("active");
    if (currentScene.dataset.id == 1 && scene.dataset.id == 2)
      scene.classList.add("active");
    else scene.classList.remove("active");
    if (currentScene.dataset.id == 2 && scene.dataset.id == 3)
      scene.classList.add("active");
    else scene.classList.remove("active");
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  strings = await fetchStrings();
  window.autosize(textarea);
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
  setScene();
  startSystemMessageTimeout();
});
