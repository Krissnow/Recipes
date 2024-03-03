import { dessertsRecipes } from "./data.js";

const recipeList = document.querySelector(".main_content");
const containerForAllRecipes = document.createElement("div");

export function renderHeaderComponents() {
  console.log(recipeList);
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

  //часть кода для создания списка сортировки

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
      containerForAllRecipes.innerHTML = "";
      sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "Sort by: Z-A") {
      containerForAllRecipes.innerHTML = "";
      sortedRecipes.sort((a, b) => b.title.localeCompare(a.title));
    }

    renderRecipes(sortedRecipes);
  }

  //создание контеинера для кнопок переключения отображения (список или плитка)
  const containerForViewButton = document.createElement("div");
  containerForViewButton.className = "view-toggle";

  //создание кнопок для переключения отображения (список или плитка)

  const listButton = document.createElement("button");
  listButton.className = "view_button active";
  const listButtonIcon = document.createElement("img");
  listButtonIcon.src = "./images/view_headline.png";
  listButton.appendChild(listButtonIcon);

  const gridButton = document.createElement("button");
  gridButton.className = "view_button";
  const gridButtonIcon = document.createElement("img");
  gridButtonIcon.src = "./images/plitka.png";
  gridButtonIcon.className = "icon_plitka";
  gridButton.appendChild(gridButtonIcon);

  listButton.addEventListener("click", function () {
    document.querySelectorAll(".grid-view").forEach(function (element) {
      element.classList.remove("grid-view");
      element.classList.add("list-view");
    });
    if (listButton.classList.contains("active")) return;
    listButton.classList.toggle("active");
    gridButton.classList.toggle("active");
  });

  gridButton.addEventListener("click", function () {
    document.querySelectorAll(".list-view").forEach(function (element) {
      element.classList.remove("list-view");
      element.classList.add("grid-view");
    });
    if (gridButton.classList.contains("active")) return;
    gridButton.classList.toggle("active");
    listButton.classList.toggle("active");
  });

  containerForViewButton.appendChild(listButton);
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
      containerForAllRecipes.innerHTML = "";
      renderRecipes(dessertsRecipes);
    }
  });

  recipeList.appendChild(headerContainer);

  renderRecipes(dessertsRecipes);
}

//функция для отрисовки каждого рецепта из массива
function renderRecipes(recipes) {
  containerForAllRecipes.className = "container_for_all_recipes list-view";

  recipes.forEach((recipe, index) => {
    const contentElement = document.createElement("div");
    contentElement.className = "container_for_recipe";
    const titleContainer = document.createElement("div");
    titleContainer.textContent = recipe.title;
    titleContainer.className = "title_recipe";

    //кнопка удаления рецепта
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete_button";
    const deleteButtonIcon = document.createElement("img");
    deleteButtonIcon.src = "./images/delete.png";
    deleteButton.appendChild(deleteButtonIcon);

    deleteButton.addEventListener("click", function (e) {
      e.preventDefault();
      let item = e.target.closest(".container_for_recipe");
      item.remove();
    });

    titleContainer.appendChild(deleteButton);

    contentElement.appendChild(titleContainer);

    //добавление главных картинок рецепта
    const imagesContainer = document.createElement("div");
    imagesContainer.className = "image_container";
    recipe.mainImages.forEach((image) => {
      const img = document.createElement("img");
      img.className = "main_pecipe_image";
      img.src = image;
      imagesContainer.appendChild(img);
    });
    contentElement.appendChild(imagesContainer);
    //добавление списка ингридиентов из массива
    const containerIngridientsList = document.createElement("ul");
    containerIngridientsList.className = "container_ingridients_list";
    const recipeIngridientsList = recipe.ingridientsList;
    for (let ingridient of recipeIngridientsList) {
      const recipeIngridient = document.createElement("li");
      recipeIngridient.textContent = ingridient;
      containerIngridientsList.appendChild(recipeIngridient);
    }

    contentElement.appendChild(containerIngridientsList);

    //добавление пошаговых картинок и текст описание к ним
    const stepContainer = document.createElement("div");
    stepContainer.className = "step_container";

    const containerStepImage = document.createElement("div");
    const recipeStepImage = recipe.stepsImage;
    const stepNumber = recipe.numberStep;
    const stepDuration = recipe.stepDuration;

    for (let i = 0; i < recipeStepImage.length; i++) {
      const stepImg = document.createElement("img");
      stepImg.className = "step_img";
      stepImg.src = recipeStepImage[i];

      const stepOfNumber = document.createElement("span");
      stepOfNumber.className = "number_step";
      stepOfNumber.textContent = stepNumber[i];

      const stepOfDuration = document.createElement("span");
      stepOfDuration.className = "step_duration";
      stepOfDuration.textContent = stepDuration[i];

      const recipeStepText = document.createElement("span");
      recipeStepText.textContent = recipe.steps[i];

      stepContainer.appendChild(stepOfNumber);
      stepContainer.appendChild(stepOfDuration);
      stepContainer.appendChild(recipeStepText);
      stepContainer.appendChild(stepImg);

      containerStepImage.appendChild(stepContainer);
    }

    contentElement.appendChild(containerStepImage);
    containerForAllRecipes.appendChild(contentElement);
    recipeList.appendChild(containerForAllRecipes);
    return contentElement;
  });
}
