import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    // console.log(this._data);
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // console.log(numPages);

    //page 1 , with other pages
    if (this._data.page === 1 && numPages > 1) {
      return `1 and others`;
    }
    //last page
    if (this._data.page === numPages) {
      return ` last page`;
    }
    //other pages with more pages
    if (this._data.page < numPages) {
      return ` other pages`;
    }

    // // page 1,  no other pages
    return ` only 1 page`;
  }
}

export default new PaginationView();
