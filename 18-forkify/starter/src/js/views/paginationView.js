import View from './View.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
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
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1 - other pages available [more results to be shown] [only forward button]
    if (curPage === 1 && numPages > 1) {
      return `
      <button data-goto="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <span>Page ${curPage + 1}</span>
      <svg class="search__icon">
      <use href="&{icons}#icon-arrow-right"></use>
      </svg>
      </button>
      `;
    }
    // Last Page [only button to go back]
    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto="${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
      <use href="&{icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
      </button>
      `;
    }
    // In between pages [forward and back button]
    if (curPage < numPages) {
      return `
        <button data-goto="${
          curPage - 1
        }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
        <use href="&{icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
        </button>
        <button data-goto="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
        <span>Page ${curPage + 1}</span>
        <svg class="search__icon">
        <use href="&{icons}#icon-arrow-right"></use>
        </svg>
        </button>
        `;
    }
    // Page 1 - no other pages available [less results than default results per page] [no buttons shown]
    return '';
  }
}

export default new PaginationView();

// <div class="pagination">
//   <!-- <button class="btn--inline pagination__btn--prev">
//     <svg class="search__icon">
//       <use href="src/img/icons.svg#icon-arrow-left"></use>
//     </svg>
//     <span>Page 1</span>
//   </button>
//   <button class="btn--inline pagination__btn--next">
//     <span>Page 3</span>
//     <svg class="search__icon">
//       <use href="src/img/icons.svg#icon-arrow-right"></use>
//     </svg>
//   </button> -->
// </div>
