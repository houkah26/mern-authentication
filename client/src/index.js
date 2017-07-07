import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import App from 'components/App';

const rootEl = document.getElementById('root');

ReactDOM.render(<App/>, rootEl);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    ReactDOM.render(<App />, rootEl)
  })
}

registerServiceWorker();
