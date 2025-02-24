import { async } from 'regenerator-runtime';

import { API_URL } from './config';

import { getJSON } from './helpers';

export const state = {
  recipe: {},
  search : 
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
    const data = await getJSON(`${API_URL}?search${query}`);
    // mapping over the array of results
    data.data.recipes.map(rec => {
      return {
        id: rec.id,
        image: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });
  } catch (err) {
    console.log(Error(err));
    throw err;
  }
};
