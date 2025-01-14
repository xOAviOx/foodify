import icons from '../../img/icons.svg';

export default class View {
  _data;
  render(data) {
    if (!data || (Array.isArray(data) && data.length === 0)) {
      return this.renderError();
    }
    this._data = data;
    const markup = this._generateMarkup();
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  update(data) {
    this._data = data;
    const newMarkup = this._generateMarkup();

    const newDOM = document.createRange().createContextualFragment(newMarkup);

    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this._parentElement.querySelectorAll('*'));

    newElements.forEach((newElements, i) => {
      const curEl = curElements[i];
      console.log(curEl, newElements.isEqualNode(curEl));

      //Updates changed text
      if (
        !newElements.isEqualNode(curEl) &&
        newElements.firstChild?.nodeValue.trim() !== ''
      ) {
        // console.log('!!!!!!!', newElements.firstChild.nodeValue.trim());
        curEl.textContent = newElements.textContent;
      }
      //updates changed attributes
      if (!newElements.isEqualNode(curEl)) {
        Array.from(newElements.attributes).forEach(attr =>
          curEl.setAttribute(attr.name, attr.value)
        );
      }
    });
  }

  _clear() {
    this._parentElement.innerHTML = '';
  }
  renderSpinner() {
    const markup = `
      <div class="spinner">
              <svg>
                <use href=${icons}#icon-loader></use>
              </svg>
            </div>
        `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
  renderError(message = this._errorMessage) {
    const markup = `
        <div class="error">
              <div>
                <svg>
                  <use href=${icons}#icon-alert-triangle></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderMessage(message = this._message) {
    const markup = `
        <div class="message">
              <div>
                <svg>
                  <use href=${icons}#icon-smile></use>
                </svg>
              </div>
              <p>${message}</p>
            </div>
      `;
    this._clear();
    this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }
}
