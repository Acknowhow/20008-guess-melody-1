import React from 'react';
import renderer from 'react-test-renderer';

import GenreQuestionScreen from './genre-question-screen.jsx';

const mock = {
  genre: `rock`,
  answers: [
    {
      src: `https://commons.wikimedia.org/wiki/File:En-us-Ahmed_Attaf_from_Algeria_pronunciation_(Voice_of_America).ogg`,
      genre: `rock`,
    },
    {
      src: `https://commons.wikimedia.org/wiki/File:En-us-Ahmed_Attaf_from_Algeria_pronunciation_(Voice_of_America).ogg`,
      genre: `blues`,
    },
    {
      src: `https://commons.wikimedia.org/wiki/File:En-us-Ahmed_Attaf_from_Algeria_pronunciation_(Voice_of_America).ogg`,
      genre: `jazz`,
    },
    {
      src: `https://commons.wikimedia.org/wiki/File:En-us-Ahmed_Attaf_from_Algeria_pronunciation_(Voice_of_America).ogg`,
      genre: `rock`,
    },
  ],
};

it(`GenreQuestionScreen renders correctly`, () => {
  const {answers, genre} = mock;

  const tree = renderer.create(<GenreQuestionScreen
    genre={genre}
    answers={answers}
  />).toJSON();

  expect(tree).toMatchSnapshot();
});
