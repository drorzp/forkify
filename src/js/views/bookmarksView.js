import previewView from './PreviewView.js';
import View from './View.js';

class BookmarksView extends View {
  _parentEl = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmarks yet find a nice recepie and bookmark it';
  _message = '';

  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join('');
  }
  addHandler(handler) {
    window.addEventListener('load', handler);
  }
}

export default new BookmarksView();
