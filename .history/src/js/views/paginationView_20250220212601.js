import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  generateMarkupBtn(currentPage, direction) {
    return `
          <button class="btn--inline pagination__btn--${direction}">
            <span>Page ${
              direction === 'next' ? currentPage + 1 : currentPage - 1
            }</span> 
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> 
      `;
  }

  // generateNextBtn(currentPage) {
  //   return `
  //         <button class="btn--inline pagination__btn--next">
  //           <span>Page ${currentPage + 1}</span>
  //           <svg class="search__icon">
  //             <use href="${icons}#icon-arrow-right"></use>
  //           </svg>
  //         </button>
  //     `;
  // }
  // generatePrevBtn(currentPage) {
  //   return `
  //             <button class="btn--inline pagination__btn--prev">
  //               <svg class="search__icon">
  //                 <use href="${icons}#icon-arrow-left"></use>
  //               </svg>
  //               <span>Page ${currentPage - 1}</span>
  //             </button>
  //     `;
  // }
  _generateMarkup() {
    const currentPage = this._data.page;
    // console.log(this._data);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    //page 1 , with other pages
    if (currentPage === 1 && numPages > 1) {
      return this.generateMarkupBtn(currentPage, 'next');
    }
    //last page
    if (currentPage === numPages && numPages > 1) {
      return this.generateMarkupBtn(currentPage);
    }
    //other pages with more pages
    if (currentPage < numPages) {
      return (
        this.generateMarkupBtn(currentPage) +
        this.generateMarkupBtn(currentPage, 'next')
      );
    }

    // // page 1,  no other pages
    return ``;
  }
}
export default new PaginationView();
