let gameName = "Guess Word Game";
document.title = gameName;
document.querySelector("h1").textContent = gameName;
document.querySelector("footer").textContent = `${gameName} Created By Mosab`;

// Setting Game Options
let numbersOfTries = 5;
let numbersOfLetters = 5;
let currentTry = 1;
let numberOfHints = 2;

// manage word
let wordToGuess = "";
let words = ["messi", "nimar", "bruno", "ramos", "henry", "terry"];
wordToGuess =
  words[Math.floor(Math.random() * words.length)].toLocaleLowerCase();

let msgArea = document.querySelector(".message");

function generateInput() {
  let inputsContainer = document.querySelector(".inputs");
  //   create try
  for (let i = 1; i <= numbersOfTries; i++) {
    let tryDiv = document.createElement("div");
    tryDiv.classList.add(`try-${i}`);
    tryDiv.innerHTML = `<span>Try ${i}</span>`;

    if (i !== 1) tryDiv.classList.add("disabled-input");
    // create input
    for (let j = 1; j <= numbersOfLetters; j++) {
      let input = document.createElement("input");
      input.type = "text";
      input.id = `guess-${i}-letter-${j}`;
      input.setAttribute("maxlength", "1");
      tryDiv.appendChild(input);
    }

    inputsContainer.appendChild(tryDiv);
  }
  inputsContainer.children[0].children[1].focus();

  let inputsInDisabledDiv = document.querySelectorAll(".disabled-input input");
  inputsInDisabledDiv.forEach((input) => {
    input.disabled = true;
  });

  let inputs = document.querySelectorAll("input");
  inputs.forEach((inp, index) => {
    inp.addEventListener("input", function () {
      this.value = this.value.toUpperCase();

      let nextInp = inputs[index + 1];
      if (nextInp) nextInp.focus();
    });

    inp.addEventListener("keydown", function (event) {
      let currentIndex = Array.from(inputs).indexOf(event.target);

      if (event.key === "ArrowRight") {
        let nextInp = currentIndex + 1;
        if (nextInp < inputs.length) inputs[nextInp].focus();
      }
      if (event.key === "ArrowLeft") {
        let prevInp = currentIndex - 1;
        if (prevInp >= 0) inputs[prevInp].focus();
      }
    });
  });
}

let guessBtn = document.querySelector(".check");
guessBtn.addEventListener("click", handleguesses);

function handleguesses() {
  let successGuess = true;
  for (let i = 1; i <= numbersOfLetters; i++) {
    let inpField = document.querySelector(`#guess-${currentTry}-letter-${i}`);
    let letter = inpField.value.toLowerCase();
    let actualLetter = wordToGuess[i - 1];

    if (letter === actualLetter) {
      inpField.classList.add("yes-in-place");
    } else if (wordToGuess.includes(letter) && letter !== "") {
      inpField.classList.add("not-in-place");
      successGuess = false;
    } else {
      inpField.classList.add("no");
      successGuess = false;
    }
  }
  if (successGuess) {
    msgArea.innerHTML = `You Win The Word Is <span>${wordToGuess}</span>`;

    let allTries = document.querySelectorAll(".inputs > div");
    allTries.forEach((tryDiv) => tryDiv.classList.add("disabled-input"));
    guessBtn.disabled = true;
  } else {
    document
      .querySelector(`.try-${currentTry}`)
      .classList.add("disabled-input");
    let currTryInp = document.querySelectorAll(`.try-${currentTry} input`);
    currTryInp.forEach((input) => {
      input.disabled = true;
    });
    currentTry++;

    let nextTryInp = document.querySelectorAll(`.try-${currentTry} input`);
    nextTryInp.forEach((input) => {
      input.disabled = false;
    });

    let el = document.querySelector(`.try-${currentTry}`);
    if (el) {
      document
        .querySelector(`.try-${currentTry}`)
        .classList.remove("disabled-input");
      el.children[1].focus();
    } else {
      guessBtn.disabled = true;
      msgArea.innerHTML = `You Lose The Word Is <span>${wordToGuess}</span>`;
    }
  }
}

let reset = document.querySelector(".reset");
reset.onclick = function () {
  location.reload();
};

console.log(wordToGuess);
window.onload = function () {
  generateInput();
};
