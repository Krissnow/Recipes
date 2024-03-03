// import { dessertsRecipes } from "./data.js";

// export function renderRecipes(recipeList, recipes) {
//   recipes.forEach((recipe, index) => {
//     const recipeContent = renderRecipeContent(recipe, index);

//     recipeList.appendChild(recipeContent);
//   });
// }

// function renderRecipeContent(recipe, index) {
//   const contentElement = document.createElement("div");

//   const titleContainer = document.createElement("div");
//   titleContainer.textContent = recipe.title;

//   const deleteButton = document.createElement("button");
//   deleteButton.textContent = "🗑️";
//   deleteButton.onclick = () => deleteRecipe(index);
//   titleContainer.appendChild(deleteButton);

//   contentElement.appendChild(titleContainer);

//   const imagesContainer = document.createElement("div");
//   imagesContainer.className = "image_container";
//   recipe.mainImages.forEach((image) => {
//     const img = document.createElement("img");
//     img.src = image;
//     imagesContainer.appendChild(img);
//   });
//   contentElement.appendChild(imagesContainer);

//   const containerIngridientsList = document.createElement("ul");
//   const recipeIngridientsList = recipe.ingridientsList;
//   for (let ingridient of recipeIngridientsList) {
//     const recipeIngridient = document.createElement("li");
//     recipeIngridient.textContent = ingridient;
//     containerIngridientsList.appendChild(recipeIngridient);
//   }

//   contentElement.appendChild(containerIngridientsList);

//   const containerStepImage = document.createElement("div");
//   const recipeStepImage = recipe.stepsImage;
//   for (let i = 0; i < recipeStepImage.length; i++) {
//     const stepImg = document.createElement("img");
//     stepImg.src = recipeStepImage[i];

//     const recipeStepText = document.createElement("span");
//     recipeStepText.textContent = recipe.steps[i];

//     const stepContainer = document.createElement("div");
//     stepContainer.appendChild(stepImg);
//     stepContainer.appendChild(recipeStepText);

//     containerStepImage.appendChild(stepContainer);
//   }

//   contentElement.appendChild(containerStepImage);
//   return contentElement;
// }

// function deleteRecipe(index) {
//   dessertsRecipes.splice(index, 1);
//   renderRecipes(recipeList, dessertsRecipes);
// }
