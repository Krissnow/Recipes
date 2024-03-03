// import { renderRecipes } from "./renderRecipes.js";
// import { dessertsRecipes } from "./data.js";

// export function renderHeaderComponents() {
//   const recipeList = document.querySelector(".main_content");
//   recipeList.innerHTML = "";

//   const headerContainer = document.createElement("div");
//   headerContainer.textContent = "Recipes";

//   const addRecipeButton = document.createElement("button");
//   addRecipeButton.textContent = "Add Recipes";

//   const recipeInput = document.createElement("input");

//   headerContainer.appendChild(addRecipeButton);
//   headerContainer.appendChild(recipeInput);

//   addRecipeButton.addEventListener("click", function () {
//     const newRecipeTitle = recipeInput.value.trim();
//     if (newRecipeTitle !== "") {
//       const newRecipe = {
//         title: newRecipeTitle,
//         mainImages: [],
//         ingridientsList: [],
//         steps: [],
//         stepsImage: [],
//       };
//       dessertsRecipes.push(newRecipe);
//       recipeInput.value = "";
//       renderRecipes(recipeList, dessertsRecipes);
//     }
//   });

//   recipeList.appendChild(headerContainer);
//   renderRecipes(recipeList, dessertsRecipes);
// }
