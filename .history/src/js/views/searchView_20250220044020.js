class SearchView {
  #parentElement = document.querySelector('.search');

  qetQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }
  addHandlerRender(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  }
}
export default new SearchView();
