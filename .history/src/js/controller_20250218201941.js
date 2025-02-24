//polyfilling
import 'core-js/stable';
// polyfilling async await
import 'regenerator-runtime/runtime';
// import all from model.js
import * as model from './model.js';
//importing object from views/recipeView.js
import recipeView from './views/recipeView.js';

// injecting new edits without reloading the page
// if (module.hot) module.hot.accept();

const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    // Guard Clause
    if (!id) return;

    recipeView.renderSpinner();

    // 1- loading recipe from API
    await model.loadRecipe(id);

    // 2- rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.log(err);
  }
};

/////
// event listeners
// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);
['hashchange', 'load'].forEach(ev =>
  window.addEventListener(ev, controlRecipes)
);
