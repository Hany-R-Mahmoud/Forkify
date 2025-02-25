import View from './View';
import previewView from './previewView.js';
import icons from 'url:../../img/icons.svg';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _list = document.querySelector('.bookmarks');
  _overlay = document.querySelector('.overlay-bookmarks');
  _btnOpen = document.querySelector('.nav__btn--bookmarks');
  _btnClose = document.querySelector('.bookmarks .btn--close-modal');

  _errorMessage = `No bookmarks yet. Find a nice recipe and bookmark it :)`;
  _message = ``;

  constructor() {
    super();
    this._addHandlerShowWindow();
    this._addHandlerCloseWindow();
  }

  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._list.classList.toggle('hidden');
  }
  _addHandlerShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerCloseWindow() {
    // this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
}

export default new BookmarksView();
