import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './app';

configure({adapter: new Adapter()});

const mock = {
  questions: [
    {
      type: `genre`,
      genre: `blues`,
      answers: [
        {
          src: `test1.mp3`,
          genre: `rock`,
        },
        {
          src: `test2.mp3`,
          genre: `blues`,
        },
        {
          src: `test3.mp3`,
          genre: `jazz`,
        },
        {
          src: `test4.mp3`,
          genre: `rock`,
        },
      ],
    }
  ]
};

it(`On WelcomeScreen button click App switches to next screen`, () => {
  const {questions} = mock;
  const app = mount(<App
    errorCount={0}
    gameTime={0}
    questions={questions}
  />);

  const startButton = app.find(`button`);
  startButton.simulate(`click`);
  app.update();

  expect(app.state(`question`)).toEqual(0);
});
