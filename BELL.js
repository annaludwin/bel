import mealBase from "./mealBase.js";

const satMonButton = document.getElementById("satMonButton");
const tueFriButton = document.getElementById("tueFriButton");
const editButtonsList = document.querySelectorAll(".edit")
const mealCategoriesList = document.getElementById("categories");
const sectionSatMon = document.getElementById("satMon");
const sectionTueFri = document.getElementById("tueFri");
const editModal = document.getElementById("modal");
const closeModalButton = document.querySelector("#modal button");
const recipeList = document.querySelector(".stack .list");
const displaySection = document.querySelector(".display")
const displayTitle = document.querySelector(".display h3");
const displayCalories = document.querySelector(".display p");
const displayIngrediensList = document.querySelector(".display ul");
const displayRecipeList = document.querySelector(".display ol");
const saveButton = document.querySelector(".success")


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
// ładowanie tytułów przepisów
mealCategoriesList.addEventListener("click", loadRecipeTitleList)
// ładowanie przepisów
recipeList.addEventListener("click", loadRecipeContent)


// FUNCTIONS

function makeList(dataBase, listElement){
    const elementsListArray = [];

    // tworze element listy
    dataBase.forEach(function(item){
        const listItem = `<li>${item}</li>`
        elementsListArray.push(listItem)
    })
    const listToInsert = elementsListArray.join("")

    // przypisuje element listy
    listElement.innerHTML = listToInsert
}

function loadRecipeContent(e){

    // podkategoria
    const subcategory = e.target.closest(".stack").querySelector("select").value;

    // posiłek
    const subcategoryElement = e.target.closest(".stack").querySelector("select")
    const mealName = subcategoryElement.options[subcategoryElement.selectedIndex].dataset.category

    // nazwa przepisu
    const title = e.target.textContent
    console.log(title);

   // ściezka do podkategorii
   const reciepesArray = mealBase[mealName][subcategory]
   console.log(reciepesArray);

   // uzupełnianie przepisu
   reciepesArray.forEach(function(item){
    if(item.title === title){
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
   })
    e.preventDefault
}


function loadRecipeTitleList(e){

    // czyszcze podgląd przepisu z innej kategorii (jeśli był)
    displaySection.style.display = "none";
    saveButton.style.display = "none";

    // podkategoria
    const subcategory = e.target.value

    // posilek
    const mealName = e.target.options[e.target.selectedIndex].dataset.category

    // ściezka do podkategorii
    const reciepeArray = mealBase[mealName][subcategory]

    // pobieram tytuł i przypisuję go do elementu listy
    const recipeTitleArray = [];

    reciepeArray.forEach(function(item){
        const title = item.title;
        const recipeTitle = `<button>${title}</button>`
        recipeTitleArray.push(recipeTitle)
    })
    const reciepeTitleToAdd = recipeTitleArray.join("")
    recipeList.innerHTML =  `${reciepeTitleToAdd}`
}

function goToSection(e){
    if(e.target === satMonButton){
        sectionSatMon.style.display = "grid";
        sectionTueFri.style.display = "none";
        editModal.style.display = "none";
    } else if (e.target === tueFriButton) {
        sectionSatMon.style.display = "none";
        sectionTueFri.style.display = "grid";
        editModal.style.display = "none";
    }
    e.preventDefault
};

function openMealEditor(e){
    if (e.target.classList.contains("edit")){
        // otwiera modal
        editModal.style.display = "flex";

        // modyfikuje jego nagłówek
        const mealHeading = editModal.querySelector("h3")
        const mealName = e.target.parentElement.firstElementChild.textContent
        mealHeading.textContent = `Dodaj ${mealName}`

        // ładuje kategorię produktów odpowiednią do posiłku, ustawiam listę w dropdownie kategorii
        if(mealName === "śniadanie"){
            addCategoryList(sniadanieCategoriesBase, "sniadanie")
        } else if(mealName === "drugie śniadanie"){
            addCategoryList(drugieSniadanieCategoriesBase, "drugieSniadanie")
        } else if(mealName === "obiad"){
            addCategoryList(obiadCategoriesBase, "obiad")
        } else if(mealName === "podwieczorek"){
            addCategoryList(podwieczorekCategoriesBase, "podwieczorek")
        } else if(mealName === "kolacja"){
            addCategoryList(kolacjaCategoriesBase, "kolacja")
        }
    }
}

function addCategoryList(mealCategoriesBase, dbtype){

    const categoryListArray = ["<option selected disabled>Wybierz kategorię posiłku</option>"]

    for(let i=0; i<mealCategoriesBase.length; i++){

        const categories = `<option value="${mealCategoriesBase[i]}" data-category="${dbtype}">${mealCategoriesBase[i]}</option>`

        categoryListArray.push(categories)
    }

    let categoryItem = categoryListArray.join("")

    mealCategoriesList.innerHTML = categoryItem
    return mealCategoriesList
}

function closeModalMenu(e){
    editModal.style.display = "none";
}