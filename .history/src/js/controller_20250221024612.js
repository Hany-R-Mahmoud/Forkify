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
import resultView from './views/resultView.js';
import paginationView from './views/paginationView.js';

// injecting new edits without reloading the page
// if (module.hot) module.hot.accept();

const recipeContainer = document.querySelector('.recipe');

// NEW API URL (instead of the one shown in the video)
// https://forkify-api.jonas.io

///////////////////////////////////////
// loading recipe
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

    // TEST
    // controlServings();
  } catch (err) {
    // console.log(err);
    recipeView.renderError();
  }
};

// loading research results
const controlSearchResults = async function () {
  try {
    // 1- get search query
    const query = searchView.getQuery();
    // console.log(query);~
    if (!query) return;

    // 2- load search results
    resultView.renderSpinner();
    await model.loadSearchResults(query);

    // 3- render results
    // resultView.render(model.state.search.results);
    resultView.render(model.getSearchResultPage());
    // console.log(model.state.search.results);

    // 4- render initial pagination
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
    // recipeView.renderError();
  }
};
const controlPagination = function (goToPage) {
  // console.log(goToPage);

  // 3- render new results
  // resultView.render(model.state.search.results);
  resultView.render(model.getSearchResultPage(goToPage));
  // console.log(model.state.search.results);

  // 4- render new pagination
  paginationView.render(model.state.search);
};
/////
const controlServings = function (newServings) {
  //update recipe servings in state
  model.updateServings(newServings);
  // update recipe view- rendering recipe again
  recipeView.render(model.state.recipe);
};
///
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);

  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
////////////////////////////
