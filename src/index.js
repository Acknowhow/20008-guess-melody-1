import {createStore} from 'redux';
import {Provider} from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app/app.jsx';
import questions from './mocks/questions';
import {reducer} from './reducers/reducer';

const init = (gameQuestions) => {
  const settings = {
    gameTime: 7,
    errorCount: 4
  };
  const store = createStore(reducer);

  ReactDOM.render(
      <Provider store={store}>
        <App
          errorCount={settings.errorCount}
          gameTime={settings.gameTime}
          questions={gameQuestions}
        />
      </Provider>,
      document.querySelector(`.main`)
  );
};

init(questions);
