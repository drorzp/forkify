class SearchView {
  _parentEl = document.querySelector('.search');
  getQuery() {
    const search = this._parentEl.querySelector('.search__field').value;
    this._clearInput();
    return search;
  }

  _clearInput() {
    this._parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(cb) {
    this._parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      cb();
    });
  }
}

export default new SearchView();
