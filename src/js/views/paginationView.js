import icons from 'url:../../img/icons.svg';
import View from './View.js';

class PaginaionView extends View {
  _parentEl = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentEl.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const gotoPage = +btn.dataset.goto;
      handler(gotoPage);
    });
  }
  _generateMarkup() {
    const currPage = this._data.page;
    const numPage = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    if (currPage === 1 && numPage > 1) {
      return `
    <button data-goto="${
      currPage + 1
    }" class="btn--inline pagination__btn--next">
        <span>${currPage + 1}</span>
           <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
    </button>`;
    }

    if (numPage === currPage && numPage > 1) {
      return `
    <button data-goto="${
      currPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>${currPage - 1}</span>
    </button>`;
    }

    if (currPage < numPage) {
      return `
    <button data-goto="${
      currPage - 1
    }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>${currPage - 1}</span>
    </button>
      <button data-goto="${
        currPage + 1
      }" class="btn--inline pagination__btn--next">
        <span>${currPage + 1}</span>
           <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
    </button>`;
    }
    return '';
  }
}
export default new PaginaionView();
