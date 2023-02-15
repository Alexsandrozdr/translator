const thatComesFromTheText = document.querySelector(".from-text");
(useForText = document.querySelector(".to-text")),
  (iconToExchange = document.querySelector(".exchange")),
  (selectTheBrand = document.querySelectorAll("select")),
  (icons = document.querySelectorAll(".row i"));
translateBtn = document.querySelector("button");
selectTheBrand.forEach((tag, id) => {
  for (let codeForEachCountry in countries) {
    let selected =
      id == 0
        ? codeForEachCountry == "pt-PT"
          ? "selected"
          : ""
        : codeForEachCountry == "en-GB"
        ? "selected"
        : "";
    let theOptions = `<option ${selected} value="${codeForEachCountry}"> ${countries[codeForEachCountry]} </option> `;
    tag.insertAdjacentHTML("beforeend", theOptions);
  }
});

iconToExchange.addEventListener("click", () => {
  let textThatWillBeTemporary = thatComesFromTheText.value,
    LangToBeTemporary = selectTheBrand[0].value;
  thatComesFromTheText.value = useForText.value;
  useForText.value = textThatWillBeTemporary;
  selectTheBrand[0].value = selectTheBrand[1].value;
  selectTheBrand[1].value = LangToBeTemporary;
});

thatComesFromTheText.addEventListener("keyup", () => {
  if (!thatComesFromTheText.value) {
    useForText.value = "";
  }
});

translateBtn.addEventListener("click", () => {
  let theText = thatComesFromTheText.value.trim();
  (translateFromTheLanguage = selectTheBrand[0].value),
    (translateToTheLanguage = selectTheBrand[1].value);
  if (!theText) return;
  useForText.setAttribute("placeholder", "Translating ...");
  let apiUrl = `https://api.mymemory.translated.net/get?q=${theText}&langpair=${translateFromTheLanguage}|${translateToTheLanguage}`;
  fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
      useForText.value = data.responseData.translatedText;
      data.matches.forEach((data) => {
        if (data.id === 0) {
          useForText.value = data.translation;
        }
      });
      useForText.setAttribute("placeholder", "Translating");
    });
});

icons.forEach((icon) => {
  icon.addEventListener("click", ({ target }) => {
    if (!thatComesFromTheText.value || !useForText.value) return;
    if (target.classList.contains("fa-copy")) {
      if (target.id == "from") {
        navigator.clipboard.writeText(thatComesFromTheText.value);
      } else {
        navigator.clipboard.writeText(useForText.value);
      }
    } else {
      let usedForText;
      if (target.id == "from") {
        usedForText = new SpeechSynthesisUtterance(thatComesFromTheText.value);
        usedForText.lang = selectTheBrand[0].value;
      } else {
        usedForText = new SpeechSynthesisUtterance(useForText.value);
        usedForText.lang = selectTheBrand[1].value;
      }
      speechSynthesis.speak(usedForText);
    }
  });
});
