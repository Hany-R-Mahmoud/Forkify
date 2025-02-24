import { async } from 'regenerator-runtime';

import { API_URL, RES_PER_PAGE } from './config';

import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    page: 1,
    resultsPerPage: RES_PER_PAGE,
  },
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}${id}`);
    // renaming recipe object from data + destructuring
    const { recipe } = data.data;
    state.recipe = {
      cookingTime: recipe.cooking_time,
      id: recipe.id,
      image: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      title: recipe.title,
      servings: recipe.servings,
    };
    // console.log(state.recipe);
  } catch (err) {
    console.log(Error(err));
    throw err;
  }
};
export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    const data = await getJSON(`${API_URL}?search=${query}`);
    // mapping over the array of results
    state.search.results = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });
    state.search.page = 1;
    // console.log(state.search.results);
  } catch (err) {
    console.log(Error(err));
    throw err;
  }
};

// creating search pages
export const getSearchResultPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage; // 0
  const end = page * state.search.resultsPerPage; // 1

  return state.search.results.slice(start, end);
};

// update servings functions
export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    return (ing.quantity =
      (ing.quantity * newServings) / state.recipe.servings);
  });
  state.recipe.servings = newServings;
};

export const addBookmark = function () {};
