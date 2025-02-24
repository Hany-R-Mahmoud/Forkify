class SearchView {
  #parentElement = document.querySelector('.search');

  qetQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }
  addHandlerRender(handler) {
    // event listeners
    // window.addEventListener('hashchange', controlRecipes);
    // window.addEventListener('load', controlRecipes);
    ['hashchange', 'load'].forEach(ev => window.addEventListener(ev, handler));
  }
}
export default new SearchView();
