import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import thunk from "redux-thunk";
import {compose} from "recompose";

import App from './components/app/app.jsx';
import {createAPI} from './api';
import reducer from './reducers/reducer';
import {Operation} from './reducers/data/data';
import withScreenSwitch from './hocs/with-screen-switch/with-screen-switch';

const settings = {
  gameTime: 5,
  errorCount: 3
};
const AppWrapped = withScreenSwitch(App);

const init = () => {
  const api = createAPI((...args) => store.dispatch(...args));
  const store = createStore(
    reducer,

    compose(
      applyMiddleware(thunk.withExtraArgument(api)),
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
    ));


  store.dispatch(Operation.loadQuestions());

  ReactDOM.render(<Provider store={store}>
    <AppWrapped
      maxMistakes={settings.errorCount}
      gameTime={settings.gameTime}
    />
  </Provider>,
  document.querySelector(`.main`)
  );
};

init();
