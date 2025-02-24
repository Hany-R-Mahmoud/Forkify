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
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
};
init();
////////////////////////////
// const promise1 = new Promise(resolve => setTimeout(() => resolve(2), 20)),
// const promise2 = new Promise(resolve => setTimeout(() => resolve(5), 60))
const addTwoPromises = async function (promise1, promise2) {
  try {
    const promise1 = new Promise(resolve =>
      setTimeout(() => resolve(num1), 20)
    ).then(data => data);
    // const data1 = await promise1.json();
    const promise2 = new Promise(resolve =>
      setTimeout(() => resolve(num2), 20)
    );
    // const data2 = await promise1.json();
    console.log(promise1);
    console.log(promise2);
  } catch (err) {
    console.log(Error(err));
  }
};

addTwoPromises(Promise.resolve(2), Promise.resolve(2)).then(console.log); // 4
