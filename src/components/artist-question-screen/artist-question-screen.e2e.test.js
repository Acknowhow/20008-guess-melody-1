import React from 'react';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ArtistQuestionScreen from './artist-question-screen.jsx';

configure({adapter: new Adapter()});

const mock = {
  question: {
    type: `artist`,
    song: {
      artist: `Sinead O'Connor`,
      src: `path1.mp3`,
    },
    answers: [
      {
        picture: `path1.jpg`,
        artist: `Sinead O'Connor`,
      },
      {
        picture: `path2.jpg`,
        artist: `Jack Daniels`,
      },
      {
        picture: `path3.jpg`,
        artist: `Jim Beam`,
      },
    ],
  },
};

it(`When user answers artist question form is not sent`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();

  const artistQuestion = mount(<ArtistQuestionScreen
    onAnswer={onAnswer} question={question}
  />)

  const form = artistQuestion.find(`form`);
  form.simulate(`change`);

  expect(onAnswer).toHaveBeenCalledTimes(1);
});
