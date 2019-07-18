import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {App} from './app';

import {Type} from '../../types';

const mock = {
  questions: [
    {
      type: Type.GENRE,
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
      type: Type.ARTIST,
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
      questions={questions}
      step={-1}
      renderScreen={jest.fn()}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`App correctly renders genre question screen`, () => {
  const {questions} = mock;
  const tree = renderer
    .create(<App
      questions={questions}
      step={0}
      renderScreen={jest.fn()}
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
      questions={questions}
      step={1}
      renderScreen={jest.fn()}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
