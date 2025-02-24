export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  const res = await fetch(`https://forkify-api.jonas.io/api/v2/recipes/${id}`);
  const data = await res.json();

  if (!res.ok) throw new Error(`${data.message} (${res.status})`);
  // if (data.status === 'fail') throw new Error(`${data.message}`);

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
  console.log(res, data, state.recipe);
};
