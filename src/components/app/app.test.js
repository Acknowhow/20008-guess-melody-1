import React from 'react';
import renderer from 'react-test-renderer';
import {App} from './app.jsx';


it(`App correctly renders after relaunch`, () => {
  const tree = renderer
    .create(<App
      time={0}
      errorCount={0}
    />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
