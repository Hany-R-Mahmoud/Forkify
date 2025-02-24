import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.rpagination');
  _generateMarkup() {
    const numPages = this._data.results / this._data.resultsPerPage;
    // page 1,  no other pages
    //page 1 , with other pages
    //other pages with more pages
    //last page
  }
}

export default new PaginationView();
