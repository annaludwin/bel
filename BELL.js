// DO ZROBIENIA
/*
    edycja dodatku - guzik edycji dodatku nakłada mi sie z guzikiem edycji posiłku
    LISTA ZAKUPÓW - nie działa dla drugiej sekcji
    Lista zakupów - zrobić wyświetlanie w dodatkowym menu u góry
*/

import mealBase from "./mealBase.js";

const satMonButton = document.getElementById("satMonButton");
const tueFriButton = document.getElementById("tueFriButton");
const editButtonsList = document.querySelectorAll(".edit")
const mealCategoriesList = document.getElementById("categories");
const sectionSatMon = document.getElementById("satMon");
const sectionTueFri = document.getElementById("tueFri");
const modal = document.getElementById("modal");
const additionalModal = document.getElementById("addModal");
const closeModalButton = document.querySelector("#modal button");
const closeAddModalButton = document.querySelector("#addModal button");
const recipeList = document.querySelector("#modal .content .columns .stack .list");
const additionList = document.querySelector("#addModal .content .columns .stack .list");
const displaySection = document.querySelector("#disp1")
const displayAddSection = document.querySelector("#disp2")
const displayTitle = document.querySelector("#disp1 h3");
const displayCalories = document.querySelector("#disp1 p");
const displayIngrediensList = document.querySelector("#disp1 ul");
const displayRecipeList = document.querySelector("#disp1 ol");
const additionAttachment = document.querySelector(".additionList");
const saveButton = document.querySelector(".success");
const additionButton = document.querySelector(".success2");
const saveAddButton = document.querySelector(".success3");
const shoppingListSatMon = document.getElementById("shoppingListSatMon");
const shoppingListTueFri = document.getElementById("shoppingListTueFri");

//tworzę tablice z nazwami kategorii odpowiednimi dla posiłku
const sniadanieCategoriesBase = Object.keys(mealBase.sniadanie);
const drugieSniadanieCategoriesBase = Object.keys(mealBase.drugieSniadanie);
const obiadCategoriesBase = Object.keys(mealBase.obiad);
const podwieczorekCategoriesBase = Object.keys(mealBase.podwieczorek);
const kolacjaCategoriesBase = Object.keys(mealBase.kolacja);

// EVENT LISTENERS

// Event listeners for button in nav
satMonButton.addEventListener("click", goToSection);
tueFriButton.addEventListener("click", goToSection);

// edytowanie
document.addEventListener("click", openMealEditor)
// zamykanie edycji
closeModalButton.addEventListener("click", closeModalMenu)
// zamykanie edycji dodatków
closeAddModalButton.addEventListener("click", closeAddModalMenu)
// ładowanie tytułów przepisów
mealCategoriesList.addEventListener("click", loadRecipeTitleList)
// ładowanie przepisów
recipeList.addEventListener("click", loadRecipeContent)
// zapisywanie przepisu
saveButton.addEventListener("click", saveRecipe)
// wgrywanie wykonania do menu głownego oraz dodatku
document.addEventListener("click", loadMore)
// otwieranie okna dla dodatków
additionButton.addEventListener("click", openAdditionEditor)
// ładuję podgląd dodatków
additionList.addEventListener("click", loadAdditionsContent)
// zapisuje dodatek
saveAddButton.addEventListener("click", saveAddition)
// edycja dodatku
document.addEventListener("click", editAdditionCard)
// stworzenie listy zakupów
document.addEventListener("click", doShoppingList)
// zaznaczeni checkboxow w liście zakupów
shoppingListSatMon.addEventListener('change', checkListItem)
shoppingListTueFri.addEventListener('change', checkListItem)


// FUNCTIONS

// main page
function doShoppingList(e) {
  if (e.target.className === "shop") {
    // wyciągam wszystkie składniki z kart i zapisuje je do tablicy
    const itemsNodes = e.target.closest(".screen").querySelectorAll("ul li")

    const itemsArray = []

    itemsNodes.forEach(function (itemsElement) {
      // umieszczam w tablicy wszystkie składniki oprócz przypraw
      if ((itemsElement.textContent.includes("Przyprawy")) || (itemsElement.textContent.includes("PASTA:")) || (itemsElement.textContent.includes("POZOSTAŁE"))) {
        console.log("Te elementy nie są dodawane do listy zakupów")
      } else {
        const item = itemsElement.textContent
        itemsArray.push(item)
      }
    })

    // segreguję tablicę alfabetycznie
    const sortedItemsArray = itemsArray.sort()

    // tworzę string z całości do dodania w innerHTML
    const elementsArray = []

    for (let i = 0; i < sortedItemsArray.length; i++) {
      const element = `<div><input type="checkbox"><label> ${sortedItemsArray[i]}</label></div>`
      elementsArray.push(element)
    }

    const elementString = elementsArray.join("")

    // dodaję checkboxy do listy zakupów
    e.target.closest("section").querySelector("div.meal-card").innerHTML = elementString

    // zmieniam napis na guziku
    e.target.textContent = "aktualizuj listę zakupów"
  }
}

function goToSection(e) {
  if (e.target === satMonButton) {
    sectionSatMon.style.display = "flex";
    sectionTueFri.style.display = "none";
    modal.style.display = "none";
    shoppingListSatMon.style.display = "grid";
    shoppingListTueFri.style.display = "none";
  } else if (e.target === tueFriButton) {
    sectionSatMon.style.display = "none";
    sectionTueFri.style.display = "flex";
    modal.style.display = "none";
    shoppingListSatMon.style.display = "none";
    shoppingListTueFri.style.display = "grid";
  }
  e.preventDefault
};

function loadMore(e) {

  if (e.target.classList.value === "more") {
    const divRecipe = e.target.previousElementSibling

    divRecipe.style.display = "block"
    e.target.textContent = "mniej"
    e.target.className = "less"
  } else if (e.target.classList.value === "less") {
    const divRecipe = e.target.previousElementSibling

    divRecipe.style.display = "none"
    e.target.textContent = "więcej"
    e.target.className = "more"
  }
}

function checkListItem(e) {
  if (e.target.checked) {
    e.target.nextElementSibling.className = "cross"
  } else {
    e.target.nextElementSibling.className = ""
  }
};

// modals helpers

function makeList(dataBase, listElement) {
  const elementsListArray = [];

  // tworze element listy
  dataBase.forEach(function (item) {
    const listItem = `<li>${item}</li>`
    elementsListArray.push(listItem)
  })
  const listToInsert = elementsListArray.join("")

  // przypisuje element listy
  listElement.innerHTML = listToInsert
}

function createListToInnerHTML(myHTMLCollection) {

  // tworzę z HTML Collection tablicę, by móc policzyc ile jest elementów
  const numberOfElements = Array.from(myHTMLCollection.children)

  // pobieram teksty z li i wrzucam je w tagi. Całość dorzucam do tablicy i łączę w jeden string, który będzie można umieścić w innerHTML
  const elementsArray = []

  for (let i = 0; i < numberOfElements.length; i++) {
    const element = "<li>" + myHTMLCollection.children[i].innerHTML + "</li>"
    elementsArray.push(element)
  }

  const elementString = elementsArray.join("")
  return elementString
}

function copyReceipe(e) {
  // nazwa przepisu
  const title = e.target.closest(".content").querySelector(".display h3").textContent

  // składniki
  // pobieram ul ze składnikami
  const ingredientsList = e.target.closest(".content").querySelector(".display ul")

  // zamieniam ją w stringa do umieszczenia w innerHTML
  const ingredients = createListToInnerHTML(ingredientsList)

  // przepis
  // pobieram ol z przepisem
  const recipeSteps = e.target.closest(".content").querySelector(".display ol")

  // zamieniam ją w stringa do umieszczenia w innerHTML
  const receipeSteps = createListToInnerHTML(recipeSteps)

  return [title, ingredients, receipeSteps]
}

function addReceipeToMainCard(section, title, ingredients, receipeSteps, subcategory) {
  const divContent = section.querySelector("div.content")
  divContent.innerHTML = `<p class="title" data-sub="${subcategory}">${title}</p><h5>Składniki</h5><ul>${ingredients}</ul>`
  const divRecipe = section.querySelector("div.recipe")
  divRecipe.innerHTML = `<h5>Przepis</h5><ol>${receipeSteps}</ol>`
}

// main modal

function openMealEditor(e) {

  if (e.target.classList.contains("edit")) {

    // czyszcze listę przepisów i załącznik dodatku
    recipeList.innerHTML = "";
    additionAttachment.innerHTML = "";

    // pobiera nazwę dnia (potem dodaje ją do elementu listy jako dataset)
    const dayName = e.target.closest(".day-panel").querySelector("h3").textContent

    // otwiera modal
    modal.style.display = "flex";

    // modyfikuje jego nagłówek
    const mealHeading = modal.querySelector("h3")
    const mealName = e.target.parentElement.querySelector("h4").textContent

    mealHeading.textContent = `Dodaj ${mealName}`

    // ładuje kategorię produktów odpowiednią do posiłku, ustawiam listę w dropdownie kategorii
    if (mealName === "śniadanie") {
      addCategoryList(sniadanieCategoriesBase, "sniadanie", dayName)
    } else if (mealName === "drugie śniadanie") {
      addCategoryList(drugieSniadanieCategoriesBase, "drugieSniadanie", dayName)
    } else if (mealName === "obiad") {
      addCategoryList(obiadCategoriesBase, "obiad", dayName)
    } else if (mealName === "podwieczorek") {
      addCategoryList(podwieczorekCategoriesBase, "podwieczorek", dayName)
    } else if (mealName === "kolacja") {
      addCategoryList(kolacjaCategoriesBase, "kolacja", dayName)
    }
  }
}

function addCategoryList(mealCategoriesBase, dbtype, day) {

  const categoryListArray = ["<option selected disabled>Wybierz kategorię posiłku</option>"]

  for (let i = 0; i < mealCategoriesBase.length; i++) {

    // w elemencie listy zaszyte jest w dataset też jaki to posiłek i jaki dzień
    const categories = `<option value="${mealCategoriesBase[i]}" data-category="${dbtype}" data-day="${day}">${mealCategoriesBase[i]}</option>`

    categoryListArray.push(categories)
  }

  let categoryItem = categoryListArray.join("")

  mealCategoriesList.innerHTML = categoryItem
  return mealCategoriesList
}

function loadRecipeTitleList(e) {

  // podkategoria
  const subcategory = e.target.value

  // posilek
  const mealName = e.target.options[e.target.selectedIndex].dataset.category

  // ściezka do podkategorii
  const reciepeArray = mealBase[mealName][subcategory]

  // pobieram tytuł i przypisuję go do elementu listy
  const recipeTitleArray = [];

  reciepeArray.forEach(function (item) {
    const title = item.title;
    const recipeTitle = `<button>${title}</button>`
    recipeTitleArray.push(recipeTitle)
  })
  const reciepeTitleToAdd = recipeTitleArray.join("")
  recipeList.innerHTML = `${reciepeTitleToAdd}`

  clearPreviewWindow()
}

function loadRecipeContent(e) {

  // podkategoria
  const subcategory = e.target.closest(".stack").querySelector("select").value;

  // posiłek
  const subcategoryElement = e.target.closest(".stack").querySelector("select")
  const mealName = subcategoryElement.options[subcategoryElement.selectedIndex].dataset.category

  // nazwa przepisu
  const title = e.target.textContent

  // ściezka do podkategorii
  const reciepesArray = mealBase[mealName][subcategory]

  // uzupełnianie przepisu
  reciepesArray.forEach(function (item) {
    if (item.title === title) {
      // obiekt z wybranym przepisem
      const receipe = item

      // tytuł
      displayTitle.textContent = receipe.title

      // kalorie
      displayCalories.textContent = receipe.calories

      // lista składników
      makeList(receipe.ingredients, displayIngrediensList)

      // sposób przygotowania
      makeList(receipe.reciepe, displayRecipeList)
    }

    // pokazuję sekcję z przepisem
    displaySection.style.display = "block";
    saveButton.style.display = "block";
    additionButton.style.display = "block";
  })
  e.preventDefault
}

function saveRecipe(e) {

  // pobierz elementy do wyświetlenia i pomagające zlokalizować gdzie to wstawic

  // dzień
  const subcategoryElement = e.target.closest(".content").querySelector(".columns #categories")
  const dayName = subcategoryElement.options[subcategoryElement.selectedIndex].dataset.day

  // podkategoria
  const subcategory = e.target.closest(".content").querySelector(".columns #categories").value

  // posiłek
  const heading = e.target.closest(".content").querySelector(".navigation h3").textContent
  const mealName = heading.substring(6)

  // pobieram przepis
  let receipeData = copyReceipe(e);
  let title = receipeData[0];
  let ingredients = receipeData[1];
  let receipeSteps = receipeData[2];

  // znajduję dzień i posiłek i wpisuję do niego dane
  document.querySelectorAll("h3").forEach(function (dayCard) {
    if (dayCard.textContent === dayName) {

      const mealCategoriesList = dayCard.nextElementSibling.querySelectorAll(".meal-card h4")
      mealCategoriesList.forEach(function (mealCard) {

        if (mealCard.textContent === mealName) {
          const section = mealCard.parentElement

          addReceipeToMainCard(section, title, ingredients, receipeSteps, subcategory)

          // zmieniam widoczność guzika "more" dla tej karty
          const moreButton = mealCard.parentElement.querySelector(".more")
          moreButton.style.display = "flex"
          moreButton.textContent = "więcej"
        }
      })
    }
  })

  // czyszczenie podglądu
  clearPreviewWindow()

  // zamykanie okna edycji
  closeModalMenu()
}

function clearPreviewWindow() {
  // czyszcze podgląd przepisu z innej kategorii (jeśli był)
  displaySection.style.display = "none";
  saveButton.style.display = "none";
  additionButton.style.display = "none";
}

function closeModalMenu(e) {
  modal.style.display = "none";
  clearPreviewWindow()
}

// additional modal

function openAdditionEditor(e) {

  if (e.target.classList.contains("success2")) {

    // otwieram modal
    additionalModal.style.display = "flex";

    // tablica z przepisami
    const additionalArray = mealBase.dodatki

    // pobieram tytuły dodatków i przypisuje je do elementu listy
    const additionTitleArray = [];

    additionalArray.forEach(function (item) {
      const title = item.title;
      const elementList = `<button>${title}</button>`
      additionTitleArray.push(elementList)
    })
    const additionTitleToAdd = additionTitleArray.join("")

    additionList.innerHTML = `${additionTitleToAdd}`

    clearAdditionalPreviewWindow()
  }
}

function loadAdditionsContent(e) {

  // zmienne lokalne (nadpisują globalne)
  const displayTitle = document.querySelector("#disp2 h3");
  const displayCalories = document.querySelector("#disp2 p");
  const displayIngrediensList = document.querySelector("#disp2 ul");
  const displayRecipeList = document.querySelector("#disp2 ol");

  // nazwa przepisu
  const title = e.target.textContent

  // ściezka do przepisu
  const additionsArray = mealBase.dodatki

  // uzupełnianie przepisu
  additionsArray.forEach(function (item) {
    if (item.title === title) {
      // obiekt z wybranym przepisem
      const receipe = item

      // tytuł
      displayTitle.textContent = receipe.title

      // lista składników
      makeList(receipe.ingredients, displayIngrediensList)

      // sposób przygotowania
      makeList(receipe.reciepe, displayRecipeList)
    }

    // pokazuję sekcję z przepisem i guzik zapisz
    displayAddSection.style.display = "block";
    saveAddButton.style.display = "block";
  })
  e.preventDefault
}

function saveAddition(e) {

  // pobieram dane

  // dzień
  const subcategoryElement = e.target.closest("body").querySelector("#modal .columns #categories")

  const dayName = subcategoryElement.options[subcategoryElement.selectedIndex].dataset.day

  // nazwa posiłku
  const mealHeader = e.target.closest("body").querySelector("#modal .content .navigation h3").textContent
  const mealName = mealHeader.substr(6)

  // pobieram przepis
  let receipeData = copyReceipe(e);
  let title = receipeData[0];
  let ingredients = receipeData[1];
  let receipeSteps = receipeData[2];

  // zamyka dodatkowy baner
  closeAddModalMenu()

  // dodaje załacznik na głównym modalu
  additionAttachment.innerHTML = `<div style="display: flex">Dodatek: ${title}</div>`

  // włącza karte dodatek i uzupełnia ją dla odpowiedniego dnia i posiłku

  // szukam dnia do którego ma byc dodany dodatek
  const dayCards = document.querySelectorAll("h3")

  dayCards.forEach(function (dayCard) {
    if (dayCard.textContent === dayName) {

      // szukam posiłku do którego ma być dodany dodatek
      const mealCardsList = dayCard.nextElementSibling.querySelectorAll("h4")

      mealCardsList.forEach(function (mealCard) {
        if (mealCard.textContent === mealName) {
          // wyświetla sekcję z dodatkiem
          const addition = mealCard.parentElement.querySelector(".addition")

          addition.style.display = "block"
          const subcategory = "none"

          // umieszcza przepis
          addReceipeToMainCard(addition, title, ingredients, receipeSteps, subcategory)

          // zmieniam widoczność guzika "more" dla tej karty
          const moreButton = addition.querySelector(".more")
          moreButton.style.display = "flex"
          moreButton.textContent = "więcej"
        }
      })
    }
  })
}

function editAdditionCard(e) {
  if (e.target.classList.contains("edit2")) {

    // otwieram modal
    additionalModal.style.display = "flex";

    // tablica z przepisami
    const additionalArray = mealBase.dodatki

    // pobieram tytuły dodatków i przypisuje je do elementu listy
    const additionTitleArray = [];

    additionalArray.forEach(function (item) {
      const title = item.title;
      const elementList = `<button>${title}</button>`
      additionTitleArray.push(elementList)
    })
    const additionTitleToAdd = additionTitleArray.join("")

    additionList.innerHTML = `${additionTitleToAdd}`

    clearAdditionalPreviewWindow()

  }
}

function clearAdditionalPreviewWindow() {
  // czyszcze podgląd przepisu z innej kategorii (jeśli był)
  displayAddSection.style.display = "none";
  saveAddButton.style.display = "none";
}

function closeAddModalMenu(e) {
  additionalModal.style.display = "none";
  clearAdditionalPreviewWindow()
}
