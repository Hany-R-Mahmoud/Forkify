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
import bookmarksView from './views/bookmarksView.js';
import paginationView from './views/paginationView.js';
import addRecipeView from './views/addRecipeView.js';

import { MODAL_CLOSE_SEC } from './config';

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

    // 0- update result view to mark selected search result
    resultView.update(model.getSearchResultPage());
    //  1- updating bookmark list
    bookmarksView.update(model.state.bookmarks);
    recipeView.renderSpinner();

    // 2- loading recipe from API
    await model.loadRecipe(id);

    // 3- rendering recipe
    recipeView.render(model.state.recipe);

    // TEST
    // controlServings();
    // debugger;
  } catch (err) {
    // console.log(err);
    recipeView.renderError();
    console.log(err);
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
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
//
const controlAddNewBookmark = function () {
  // 1- add/remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // console.log(model.state.recipe);
  // 2- update recipe view
  recipeView.update(model.state.recipe);

  // render bookmarks
  bookmarksView.render(model.state.bookmarks);
};
///

//
const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
//
const controlAddRecipe = async function (newRecipe) {
  try {
    // loading spinner
    addRecipeView.renderSpinner();

    // console.log(newRecipe);
    // upload new Recipe
    await model.uploadRecipe(newRecipe);

    // console.log(model.state.recipe);

    // render this recipe into recipe view
    await recipeView.render(model.state.recipe);

    //success message
    addRecipeView.renderMessage();
    // addRecipeView._generateMarkup();
    // close form
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODAL_CLOSE_SEC * 1000);
    setTimeout(function () {
      addRecipeView._generateMarkup();
    }, MODAL_CLOSE_SEC * 1000 + 500);
  } catch (err) {
    // console.error(err);
    addRecipeView.renderError(err.message);
    setTimeout(function () {
      addRecipeView._generateMarkup();
    }, MODAL_CLOSE_SEC * 1000 + 500);
  }
};
//
const init = function () {
  bookmarksView.addHandlerRender(controlBookmarks);
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddNewBookmark);

  searchView.addHandlerRender(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);

  addRecipeView.addHandlerUpload(controlAddRecipe);
};
init();
////////////////////////////
