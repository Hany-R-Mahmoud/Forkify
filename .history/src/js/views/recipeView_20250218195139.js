class RecipeView {
  #parentElement = document.querySelector('.recipe');
}

// exporting an object from the class, better than exporting the class then creating an object in controller.js
export default new RecipeView();
