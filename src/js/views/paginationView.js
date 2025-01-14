import View from './View.js';
import icons from '../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsperpage
    );
    console.log(numPages);
    const btnLeft = `
    <button data-goto=${
      currentPage - 1
    } class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href=${icons}#icon-arrow-left></use>
      </svg>
      <span>Page ${currentPage - 1}</span>
    </button>`;

    const btnRight = `
    <button data-goto=${
      currentPage + 1
    } class="btn--inline pagination__btn--next">
      <span>Page ${currentPage + 1}</span>
      <svg class="search__icon">
        <use href=${icons}#icon-arrow-right></use>
      </svg>
    </button>`;

    // Page 1 and tehre are other pages
    if (currentPage === 1 && numPages > 1) {
      return btnRight;
    }
    //Last page
    if (currentPage === numPages && numPages > 1) {
      return btnLeft;
    }
    //other page
    if (currentPage < numPages) {
      return `${btnLeft} ${btnRight}`;
    }

    //Page 1, and tehre are no other pages
    return '';
  }
}

export default new paginationView();
