class SearchView {
  #parentElement = document.querySelector('.search');

  getQuery() {
    return this.#parentElement.querySelector('.search__field').value;
    this.#clearInput();
  }

  #clearInput() {
    this.#parentElement.querySelector('.search__field').value = '';
  }
  addHandlerRender(handler) {
    this.#parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
