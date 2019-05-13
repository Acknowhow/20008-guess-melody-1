import React from 'react';
import renderer from 'react-test-renderer';
import App from '../app/app.jsx';

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

it(`App correctly renders after relaunch`, () => {
  const {questions} = mock;
  const tree = renderer
    .create(<App
      gameTime={7}
      errorCount={8}
      questions={questions}
    />)
  .toJSON();

  expect(tree).toMatchSnapshot();
});
