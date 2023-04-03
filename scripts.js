const norwegianWords = [
  "spontan",
  "kald",
  "hårete",
  "frossen",
  "kort",
  "treg",
  "hul",
  "ambivalent",
  "desertert",
  "plutselig",
  "smal",
  "smidig",
  "halv",
  "glatt",
  "tørr",
  "forkortende",
  "varm",
  "produktiv",
  "ekstra",
  "direkte",
  "felles",
  "hoppende",
  "ubestemt",
  "sakte",
  "frivillig",
  "kjent",
  "opprinnelig",
  "vaiende",
  "utt",
  "bidra",
  "utfolde",
  "binde",
  "haste",
  "drive",
  "rot",
  "nøle",
  "flyte",
  "følge",
  "kartlegge",
  "late",
  "spire",
  "synse",
  "slenge",
  "treffe",
  "gåsehud",
  "ark",
  "hjem",
  "tråd",
  "manus",
  "pose",
  "tegn",
  "scene",
  "muskel",
  "tare",
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
  "bevegelse",
  "drøm",
  "ujevn",
  "pinne",
];

const czechWords = [
  "spontánní",
  "studený",
  "chmýří",
  "zmrzlý",
  "krátký",
  "pomalý",
  "dutý",
  "ambivalentní",
  "dezertérský",
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
  "přímý",
  "společný",
  "skákající",
  "neurčitý",
  "pomalý",
  "dobrovolný",
  "známý",
  "původní",
  "vlající",
  "výstup",
  "přispět",
  "rozvinout",
  "vázat",
  "spěchat",
  "vést",
  "zmatek",
  "zaváhat",
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
  "fix",
  "pochodová holí",
  "hlava",
  "náplast",
  "inkoust",
  "objížďka",
  "nežádoucí služba",
  "protéza",
  "kancelář",
  "linka",
  "řízek",
  "držák",
  "obrazovka",
  "aktualizace",
  "perspektiva",
  "práce",
  "pohyb",
  "sen",
  "nerovný",
  "hůl",
];

const textarea = document.querySelector("textarea");
const display = document.querySelector(".display");

// Automatic resizing of textarea height
window.autosize(textarea);

// Fake caret
const caret = document.createElement("div");

caret.className = "caret";

textarea.addEventListener("input", updateDisplay);

function updateDisplay() {
  display.innerText = textarea.value;

  if (document.activeElement === textarea) {
    display.appendChild(caret);
  }
}

textarea.addEventListener("focus", (event) => {
  display.appendChild(caret);
});

textarea.addEventListener("blur", (event) => {
  display.removeChild(caret);
});

// Prevent backspace
textarea.addEventListener("keydown", (event) => {
  if (event.code === "Backspace") {
    event.preventDefault();
  }
});

// Go to end of text (no selection)
function goToEnd() {
  const length = textarea.value.length;
  textarea.setSelectionRange(length, length);
}

textarea.addEventListener("select", goToEnd);
textarea.addEventListener("input", goToEnd);
textarea.addEventListener("focus", goToEnd);
textarea.addEventListener("keydown", goToEnd);
textarea.addEventListener("keyup", goToEnd);

// Add fillword after five timeout
let timeout;

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

function fillWord() {
  console.log("Fill word");

  const word = norwegianWords[~~(Math.random() * norwegianWords.length)];
  const spaceBetween = textarea.value.endsWith(" ") ? "" : " ";

  textarea.value = `${textarea.value}${spaceBetween}${word} `;
  window.autosize.update(textarea);

  updateDisplay();
  startFillWordTimer();
}

textarea.addEventListener("input", startFillWordTimer);
textarea.addEventListener("focus", startFillWordTimer);
textarea.addEventListener("blur", stopFillWordTimer);

// Send messages
function send() {
  console.log("Send");

  resetSendTimeout();

  const messages = document.querySelector(".messages");
  const text = textarea.value;

  if (text.trim().length) {
    textarea.value = "";
    textarea.blur();

    window.autosize.update(textarea);
    updateDisplay();

    if (!ghostMessageTimeoutStarted) {
      startGhostMessageTimeout();
    }

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

const sendButton = document.querySelector(".button");
sendButton.addEventListener("click", send);

// Send message automatically after

let sendTimeout = null;

function startSendTimeout() {
  if (sendTimeout === null) {
    console.log("Start send timeout");
    setTimeout(send, 5 * 1000);
  }
}

function resetSendTimeout() {
  console.log("Reset send timeout");
  clearTimeout(sendTimeout);
  sendTimeout = null;
}

textarea.addEventListener("focus", startSendTimeout);

// Add system message automatically after 2 seconds

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
  setTimeout(
    () =>
      addSystemMessage(`
    Hei! William er ikke tilgjengelig akkurat nå, han sliter litt etter broren hans døde. Han blir nok glad for en melding. Hilsen kompis Espen (mob 47086630 hvis du lurer på no)
  `),
    5 * 1000
  );
}

window.addEventListener("load", startSystemMessageTimeout);

// Send ghost message
function addGhostMessage(message) {
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

  startResetScreenTimeout();

  messages.appendChild(newMessage);
}

let ghostMessageTimeoutStarted = false;

function startGhostMessageTimeout() {
  console.log("Start ghost message timeout");
  ghostMessageTimeoutStarted = true;

  setTimeout(
    () =>
      addGhostMessage(`
    Halla.. Takk for meldingen. Den var jo interessant heh 😉 Jeg har det ikke så bra egentlig, kanskje vi kan møtes til uka?
  `),
    15 * 1000
  );
}

// Add reset screen after ghost message

function startResetScreenTimeout() {
  console.log("Start reset screen timeout");
  setTimeout(addResetScreen, 10 * 1000);
}

function addResetScreen() {
  const resetScreen = document.createElement("div");
  resetScreen.classList.add("reset");
  resetScreen.addEventListener("click", () => window.location.reload(true));

  document.body.appendChild(resetScreen);
}
