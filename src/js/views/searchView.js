class SearchView {
  #parentEl = document.querySelector('.search');
  getQuery() {
    const search = this.#parentEl.querySelector('.search__field').value;
    this.#clearInput();
    return search;
  }

  #clearInput() {
    this.#parentEl.querySelector('.search__field').value = '';
  }

  addHandlerSearch(cb) {
    this.#parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      cb();
    });
  }
}

export default new SearchView();
