import View from './View';
import icons from 'url:../../img/icons.svg';

class AddRecipeView extends View {
  _parentElement = document.querySelector('.upload');

  _window = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');

  constructor() {
    super();
    this._addHanlderShowWindow();
    this._addHandlerCloseWindow();
  }
  toggleWindow() {
    this._overlay.classList.toggle('hidden');
    this._window.classList.toggle('hidden');
  }
  _addHanlderShowWindow() {
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));
  }
  _addHandlerCloseWindow() {
    if (!this._btnClose) return;
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  _generateMarkup() {}
}
export default new AddRecipeView();
