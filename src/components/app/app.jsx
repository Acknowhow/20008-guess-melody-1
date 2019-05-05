import React from 'react';
import PropTypes from 'prop-types';

import {WelcomeScreen} from '../welcome-screen/welcome-screen.jsx';

export const App = (props) => {
  const handler = (e) => e.preventDefault;
  const {gameTime = 5, errorCount = 3} = props;

  return <WelcomeScreen
    time={gameTime}
    errorCount={errorCount}
    clickHandler={handler}
  />;
};

App.propTypes = {
  gameTime: PropTypes.number,
  errorCount: PropTypes.number
};

