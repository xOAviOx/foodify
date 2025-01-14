import View from './View.js';
import icons from '../../img/icons.svg';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsperpage
    );
    console.log(numPages);

    // Page 1 and tehre are other pages
    if (this._data.page === 1 && numPages > 1) {
      return 'Page 1 and others ';
    }
    //Last page
    if (this._data.page === numPages) {
      return 'Last page';
    }
    //other page

    if (this._data.page < numPages) {
      return 'other pages';
    }
    //Page 1, and tehre are no other pages
    return 'Only 1 page';
  }
}

export default new paginationView();
