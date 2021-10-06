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
const saveButton = document.querySelector(".success");

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
// zapisywanie przepisu
saveButton.addEventListener("click", saveRecipe)


// FUNCTIONS

function saveRecipe(e){

    // pobierz elementy do wyświetlenia i pomagające zlokalizować gdzie to wstawic

        // dzień
        const subcategoryElement = e.target.closest(".content").querySelector(".columns #categories")
        const dayName = subcategoryElement.options[subcategoryElement.selectedIndex].dataset.day

        // podkategoria
        const subcategory = e.target.closest(".content").querySelector(".columns #categories").value

        // posiłek
        const heading = e.target.closest(".content").querySelector(".navigation h3").textContent
        const mealName = heading.substring(6)

        // nazwa przepisu
        const title = e.target.closest(".content").querySelector(".display h3").textContent

        // składniki
            // pobieram HTML collection
            const ingredientsList = e.target.closest(".content").querySelector(".display ul")
            // tworzę z tego tablicę, by móc policzyc ile jest składników
            const numberOfIngriedients = Array.from(ingredientsList.children)

            // pobieram teksty z li i wrzucam je w tagi. Całość dorzucam do tablicy i łączę w jeden string, który będzie można umieścić w innerHTML
            const ingredientsArray = []

            for(let i=0; i<numberOfIngriedients.length; i++){
                const element = "<li>"+ingredientsList.children[i].innerHTML+"</li>"
                ingredientsArray.push(element)
            }

            const ingredients = ingredientsArray.join("")

    // znajduję dzień i posiłek i wpisuję do niego dane
    document.querySelectorAll("h3").forEach(function(dayCard){
        if(dayCard.textContent === dayName){
            dayCard.nextElementSibling.querySelectorAll(".meal-card h4").forEach(function(mealCard){

                if(mealCard.textContent === mealName){
                    const div = mealCard.parentElement.querySelector("div")
                    div.innerHTML = `<p class="title">${title}</p><h5>Składniki</h5><ul>${ingredients}</ul>`
                }
            })
        }
    })

    // close modal
    closeModalMenu()
}

function clearPreviewWindow(){
    // czyszcze podgląd przepisu z innej kategorii (jeśli był)
    displaySection.style.display = "none";
    saveButton.style.display = "none";
}

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

   // ściezka do podkategorii
   const reciepesArray = mealBase[mealName][subcategory]

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

    clearPreviewWindow()
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

        // czyszcze listę przepisów
        recipeList.innerHTML = "";

        // pobiera nazwę dnia (potem dodaje ją do elementu listy jako dataset)
        const dayName = e.target.closest(".day-panel").querySelector("h3").textContent

        // otwiera modal
        editModal.style.display = "flex";

        // modyfikuje jego nagłówek
        const mealHeading = editModal.querySelector("h3")
        const mealName = e.target.parentElement.querySelector("h4").textContent

        mealHeading.textContent = `Dodaj ${mealName}`

        // ładuje kategorię produktów odpowiednią do posiłku, ustawiam listę w dropdownie kategorii
        if(mealName === "śniadanie"){
            addCategoryList(sniadanieCategoriesBase, "sniadanie", dayName)
        } else if(mealName === "drugie śniadanie"){
            addCategoryList(drugieSniadanieCategoriesBase, "drugieSniadanie", dayName)
        } else if(mealName === "obiad"){
            addCategoryList(obiadCategoriesBase, "obiad", dayName)
        } else if(mealName === "podwieczorek"){
            addCategoryList(podwieczorekCategoriesBase, "podwieczorek", dayName)
        } else if(mealName === "kolacja"){
            addCategoryList(kolacjaCategoriesBase, "kolacja", dayName)
        }
    }
}

function addCategoryList(mealCategoriesBase, dbtype, day){

    const categoryListArray = ["<option selected disabled>Wybierz kategorię posiłku</option>"]

    for(let i=0; i<mealCategoriesBase.length; i++){

        // w elemencie listy zaszyte jest w dataset też jaki to posiłek i jaki dzień
        const categories = `<option value="${mealCategoriesBase[i]}" data-category="${dbtype}" data-day="${day}">${mealCategoriesBase[i]}</option>`

        categoryListArray.push(categories)
    }

    let categoryItem = categoryListArray.join("")

    mealCategoriesList.innerHTML = categoryItem
    return mealCategoriesList
}

function closeModalMenu(e){
    editModal.style.display = "none";
}