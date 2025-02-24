//import problem-solving
import * as problems from '../../problem-solving.js';
//polyfilling

import 'core-js/stable';
// polyfilling async await
import 'regenerator-runtime/runtime';
// import all from model.js
import * as model from './model.js';
//importing object from views/recipeView.js
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
// injecting new edits without reloading the page
// if (module.hot) module.hot.accept();

const recipeContainer = document.querySelector('.recipe');

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
    // console.log(err);
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  try {
    // 1- get search query
    const query = searchView.getQuery();
    // console.log(query);~
    if (!query) return;

    // 2- load search results
    await model.loadSearchResults(query);

    // 3- render results
    // console.log(model.state.search.results);
  } catch (err) {
    console.log(err);
    // recipeView.renderError();
  }
};

/////
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerRender(controlSearchResults);
};
init();
////////////////////////////
