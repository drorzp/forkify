import icons from 'url:../../img/icons.svg';
import previewView from './PreviewView.js';
import View from './View.js';
class ResultsView extends View {
  _message = '';
  _errorMessage = 'No recepies found for your query please try again';
  _parentEl = document.querySelector('.results');

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}
export default new ResultsView();
