import View from './View';
// import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      // console.log(btn);
      if (!btn) return;

      const goToPage = btn.dataset.goto;
      // console.log(goToPage);

      handler(goToPage);
    });
  }

  _generateMarkupBtn(currentPage, numPages, direction) {
    // console.log(+currentPage);
    return `
          <button data-goto='${
            direction === 'next' ? +currentPage + 1 : +currentPage - 1
          }' class="btn--inline pagination__btn--${direction}">
            <span>Page ${
              direction === 'next' ? +currentPage + 1 : +currentPage - 1
            } / ${numPages}</span> 
         
            <i class="fa-solid fa-arrow-${
              direction === 'next' ? 'right' : 'left'
            }"></i>
           
          </button> 
      `;
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    // console.log(+currentPage);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);
    // console.log(numPages);

    //page 1 , with other pages
    if (+currentPage === 1 && numPages > 1) {
      return this._generateMarkupBtn(+currentPage, numPages, 'next');
    }
    //last page
    if (+currentPage === numPages && numPages > 1) {
      return this._generateMarkupBtn(+currentPage, numPages, 'prev');
    }
    //other pages with more pages
    if (+currentPage < numPages) {
      return (
        this._generateMarkupBtn(+currentPage, numPages, 'prev') +
        this._generateMarkupBtn(+currentPage, numPages, 'next')
      );
    }

    // // page 1,  no other pages

    return '';
  }
}
export default new PaginationView();
