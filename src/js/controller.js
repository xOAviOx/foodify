import { icons } from '../img/icons.svg';

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
const getJson = async function () {
  const data = await fetch(
    'https://forkify-api.jonas.io/api/v2/recipes/5ed6604591c37cdc054bc990'
  );
  const rec = await data.json();
  console.log(rec);
  console.log(rec.data.recipe.publisher);

  const recipeData = {
    cookingTime: rec.data.recipe.cooking_time,
    id: rec.data.recipe.id,
    image: rec.data.recipe.image_url,
    ingredients: rec.data.recipe.ingredients,
    publisher: rec.data.recipe.publisher,
    servings: rec.data.recipe.servings,
    sourceURL: rec.data.recipe.source_url,
    title: rec.data.recipe.title,
    quantity: rec.data.recipe.ingredients,
    unit: rec.data.recipe.ingredients,
    description: rec.data.recipe.ingredients.forEach(el => el.description),
  };
  console.log(recipeData.ingredients);

  const markup = `
   <figure class="recipe__fig">
          <img src= ${recipeData.image} alt="Tomato" class="recipe__img" />
          <h1 class="recipe__title">
            <span>${recipeData.title}</span>
          </h1>
        </figure>

        <div class="recipe__details">
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-clock"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--minutes">${
              recipeData.cookingTime
            }</span>
            <span class="recipe__info-text">minutes</span>
          </div>
          <div class="recipe__info">
            <svg class="recipe__info-icon">
              <use href="src/img/icons.svg#icon-users"></use>
            </svg>
            <span class="recipe__info-data recipe__info-data--people">${
              recipeData.servings
            }</span>
            <span class="recipe__info-text">servings</span>

            <div class="recipe__info-buttons">
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-minus-circle"></use>
                </svg>
              </button>
              <button class="btn--tiny btn--increase-servings">
                <svg>
                  <use href="src/img/icons.svg#icon-plus-circle"></use>
                </svg>
              </button>
            </div>
          </div>

          <div class="recipe__user-generated">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div>
          <button class="btn--round">
            <svg class="">
              <use href="src/img/icons.svg#icon-bookmark-fill"></use>
            </svg>
          </button>
        </div>

        <div class="recipe__ingredients">
          <h2 class="heading--2">Recipe ingredients</h2>
          <ul class="recipe__ingredient-list">
            <li class="recipe__ingredient">
            ${recipeData.ingredients
              .map(ing => {
                return `
              <li class="recipe__ingredient">
              <svg class="recipe__icon">
                <use href="src/img/icons.svg#icon-check"></use>
              </svg>
              <div class="recipe__quantity">${ing.quantity}</div>
              <div class="recipe__description">
                <span class="recipe__unit">${ing.unit}</span>
                  ${ing.description}
              </div>
            </li>
              
              `;
              })
              .join('')}
             

          
        </div>

        <div class="recipe__directions">
          <h2 class="heading--2">How to cook it</h2>
          <p class="recipe__directions-text">
            This recipe was carefully designed and tested by
            <span class="recipe__publisher">${
              recipeData.publisher
            }</span>. Please check out
            directions at their website.
          </p>
          <a
            class="btn--small recipe__btn"
            href= ${recipeData.sourceURL}
            target="_blank"
          >
            <span>Directions</span>
            <svg class="search__icon">
              <use href=${icons}#icon-arrow-right></use>
            </svg>
          </a>
        </div>`;

  recipeContainer.innerHTML = '';
  recipeContainer.insertAdjacentHTML('afterbegin', markup);
};

getJson();
