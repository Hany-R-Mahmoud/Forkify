import { async } from 'regenerator-runtime';

import { API_URL } from './config';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
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
    console.log(state.recipe);
  } catch (err) {
    console.log(err);
  }
};
