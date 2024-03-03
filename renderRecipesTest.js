import { dessertsRecipes } from "./data.js";

export function renderHeaderComponents() {
  const recipeList = document.querySelector(".main_content");
  recipeList.innerHTML = "";

  //создание шапки с полем ввода и кнопками
  const headerContainer = document.createElement("div");
  headerContainer.className = "header_container";

  //контейнер в котором только надпись и кнопка добавления нового рецепта
  const containerForAddButton = document.createElement("div");
  containerForAddButton.className = "container_for_add_button";

  const headerText = document.createElement("span");
  headerText.textContent = "Recipes";
  headerText.className = "header_text";
  containerForAddButton.appendChild(headerText);

  const addRecipeButton = document.createElement("button");
  addRecipeButton.textContent = "Add Recipes";
  addRecipeButton.className = "add_recipe_button";
  containerForAddButton.appendChild(addRecipeButton);

  headerContainer.appendChild(containerForAddButton);

  //контейнер в котором поле ввода нового рецепта, кнопка сортировки и кнопки отображения рецептов
  const functionalContainer = document.createElement("div");
  functionalContainer.className = "functionalContainer";

  const recipeInput = document.createElement("input");
  recipeInput.className = "new_text_recipe";
  functionalContainer.appendChild(recipeInput);

  ///////часть кода от чата gpt для создания списка сортировки

  const sortSelect = document.createElement("select");
  sortSelect.className = "sort_select";
  const sortOptions = ["Sort by: A-Z", "Sort by: Z-A"];

  sortOptions.forEach((option) => {
    const sortOption = document.createElement("option");
    sortOption.text = option;
    sortSelect.add(sortOption);
  });

  sortSelect.addEventListener("change", function () {
    const selectedOption = sortSelect.options[sortSelect.selectedIndex].text;
    sortRecipes(selectedOption);
  });

  functionalContainer.appendChild(sortSelect);

  //функция для сортировки списка рецептов
  function sortRecipes(sortOption) {
    const sortedRecipes = [...dessertsRecipes]; // Создаем копию массива для избежания изменения оригинального массива

    if (sortOption === "Sort by: A-Z") {
      sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "Sort by: Z-A") {
      sortedRecipes.sort((a, b) => b.title.localeCompare(a.title));
    }

    renderRecipes(recipeList, sortedRecipes);
  }

  //создание контеинера для кнопок переключения отображения (список или плитка)
  const containerForViewButton = document.createElement("div");
  containerForViewButton.className = "view-toggle";

  //создание кнопок для переключения отображения (список или плитка)

  const listButton = document.createElement("button");
  listButton.textContent = "▤";

  listButton.addEventListener("click", function () {
    const contentElement = document.querySelectorAll(".list-view");
    console.log(contentElement);
    for (let i = 0; i < contentElement.length; i++) {
      if (contentElement[i].classList.contains("list-view")) {
        console.log("ifList");
        contentElement[i].classList.remove("list-view");
        contentElement[i].classList.add("grid-view");
      }
    }
  });

  containerForViewButton.appendChild(listButton);

  const gridButton = document.createElement("button");
  gridButton.textContent = "▦";

  gridButton.addEventListener("click", function () {
    const contentElement = document.querySelectorAll(".grid-view");
    console.log(contentElement);
    for (let i = 0; i < contentElement.length; i++) {
      if (contentElement[i].classList.contains("grid-view")) {
        console.log("ifGrid");
        contentElement[i].classList.remove("grid-view");
        contentElement[i].classList.add("list-view");
      }
    }
  });

  containerForViewButton.appendChild(gridButton);

  functionalContainer.appendChild(containerForViewButton);

  headerContainer.appendChild(functionalContainer);

  //слушатель и проверка при добавлении нового рецепта, создание нового рецепта
  addRecipeButton.addEventListener("click", function () {
    const newRecipeTitle = recipeInput.value.trim();
    if (newRecipeTitle !== "") {
      const newRecipe = {
        title: newRecipeTitle,
        mainImages: [],
        ingridientsList: [],
        steps: [],
        stepsImage: [],
      };
      dessertsRecipes.push(newRecipe);
      recipeInput.value = "";
      renderRecipes(recipeList, dessertsRecipes);
    }
  });

  recipeList.appendChild(headerContainer);
  console.log(recipeList);
  renderRecipes(recipeList, dessertsRecipes);
}

//функция для отрисовки каждого рецепта из массива
function renderRecipes(recipeList, recipes) {
  console.log(recipeList);
  recipes.forEach((recipe, index) => {
    //const recipeContent = renderRecipeContent(recipe, index);

    //recipeList.appendChild(recipeContent);

    const contentElement = document.createElement("div");
    contentElement.className = "container_for_recipe list-view";
    const titleContainer = document.createElement("div");
    titleContainer.textContent = recipe.title;

    //кнопка удаления рецепта
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "🗑️";
    deleteButton.onclick = (index) => {
      console.log("be delete");
      const newListRecipeWithOutDeleteElement = dessertsRecipes.splice(
        index,
        1
      );
      console.log("deleted");
      renderRecipes(newListRecipeWithOutDeleteElement, dessertsRecipes);
    };
    titleContainer.appendChild(deleteButton);

    contentElement.appendChild(titleContainer);

    //добавление главных картинок рецепта
    const imagesContainer = document.createElement("div");
    imagesContainer.className = "image_container";
    recipe.mainImages.forEach((image) => {
      const img = document.createElement("img");
      img.src = image;
      imagesContainer.appendChild(img);
    });
    contentElement.appendChild(imagesContainer);
    //добавление списка ингридиентов из массива
    const containerIngridientsList = document.createElement("ul");
    const recipeIngridientsList = recipe.ingridientsList;
    for (let ingridient of recipeIngridientsList) {
      const recipeIngridient = document.createElement("li");
      recipeIngridient.textContent = ingridient;
      containerIngridientsList.appendChild(recipeIngridient);
    }

    contentElement.appendChild(containerIngridientsList);
    //добавление пошаговых картинок и текст описание к ним
    const containerStepImage = document.createElement("div");
    const recipeStepImage = recipe.stepsImage;
    for (let i = 0; i < recipeStepImage.length; i++) {
      const stepImg = document.createElement("img");
      stepImg.src = recipeStepImage[i];

      const recipeStepText = document.createElement("span");
      recipeStepText.textContent = recipe.steps[i];

      const stepContainer = document.createElement("div");
      stepContainer.appendChild(stepImg);
      stepContainer.appendChild(recipeStepText);

      containerStepImage.appendChild(stepContainer);
    }

    contentElement.appendChild(containerStepImage);
    recipeList.appendChild(contentElement);
    return contentElement;
  });
}

// function deleteRecipe(index) {
//   dessertsRecipes.splice(index, 1);
//   renderRecipes(recipeList, dessertsRecipes);
// }
