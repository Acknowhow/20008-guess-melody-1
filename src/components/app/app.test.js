import React from 'react';
import renderer from 'react-test-renderer';
import {App} from '../app/app.jsx';

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
    },
    {
      type: `artist`,
      song: {
        artist: `Jim Beam`,
        src: `path.mp3`,
      },
      answers: [
        {
          picture: `path.jpg`,
          artist: `John Snow`,
        },
        {
          picture: `path.jpg`,
          artist: `Jack Daniels`,
        },
        {
          picture: `path.jpg`,
          artist: `Jim Beam`,
        },
      ],
    },
  ]
};

it(`App correctly renders WelcomeScreen`, () => {
  const {questions} = mock;
  const tree = renderer
    .create(<App
      mistakes={100}
      maxMistakes={Infinity}
      gameTime={1000000}
      questions={questions}
      step={-1}
      onUserAnswer={jest.fn()}
      onWelcomeScreenClick={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly renders genre question screen`, () => {
  const {questions} = mock;
  const tree = renderer
    .create(<App
      mistakes={100}
      maxMistakes={Infinity}
      gameTime={1000000}
      questions={questions}
      step={0}
      onUserAnswer={jest.fn()}
      onWelcomeScreenClick={jest.fn()}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly renders artist question screen`, () => {
  const {questions} = mock;
  const tree = renderer
    .create(<App
      mistakes={100}
      maxMistakes={Infinity}
      gameTime={1000000}
      questions={questions}
      step={1}
      onWelcomeScreenClick={jest.fn()}
      onGenreUserAnswer={jest.fn()}
      onArtistUserAnswer={jest.fn()}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
