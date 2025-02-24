class SearchView {
  #parentElement = document.querySelector('.search');

  qetQuery() {
    return this.#parentElement.querySelector('.search__field').value;
  }
}
export default new SearchView();
