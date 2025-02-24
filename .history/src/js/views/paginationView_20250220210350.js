import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  generateNextBtn(currentPage) {
    return `
          <button class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
      `;
  }
  generatePrevBtn(currentPage) {
    return ` 
              <button class="btn--inline pagination__btn--prev">
                <svg class="search__icon">
                  <use href="${icons}#icon-arrow-left"></use>
                </svg>
                <span>Page ${currentPage - 1}</span>
              </button>
      `;
  }
  _generateMarkup() {
    const currentPage = this._data.page;
    // console.log(this._data);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    //page 1 , with other pages
    if (currentPage === 1 && numPages > 1) {
      return this.generateNextBtn(currentPage);
    }
    //last page
    if (currentPage === numPages && numPages > 1) {
      return this.generatePrevBtn(currentPage);
    }
    //other pages with more pages
    if (currentPage < numPages) {
      return (
        this.generatePrevBtn(currentPage); this.generateNextBtn(currentPage)
      );
    }

    // // page 1,  no other pages
    return ``;
  }
}

export default new PaginationView();
