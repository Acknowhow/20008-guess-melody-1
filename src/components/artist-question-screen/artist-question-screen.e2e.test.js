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
        artist: `Paul Newman`,
      },
      {
        picture: `path3.jpg`,
        artist: `Gary Barlow`,
      },
    ],
  },
};

it(`User answer click should pass data-object which was used to create it`, () => {
  const {question} = mock;
  const onAnswer = jest.fn();

  const screen = mount(<ArtistQuestionScreen
    onAnswer={onAnswer}
    renderPlayer={jest.fn()}
    question={question}
  />);

  const answerInputs = screen.find(`input`);
  const answerSinead = answerInputs.at(0);
  const answerPaul = answerInputs.at(1);
  const answerGary = answerInputs.at(2);

  answerSinead.simulate(`change`);
  answerPaul.simulate(`change`);
  answerGary.simulate(`change`);

  expect(onAnswer).toHaveBeenCalledTimes(3);

  expect(onAnswer).toHaveBeenNthCalledWith(1, {
    artist: `Sinead O'Connor`,
    picture: `path1.jpg`,
  });

  expect(onAnswer).toHaveBeenNthCalledWith(2, {
    picture: `path2.jpg`,
    artist: `Paul Newman`,
  });

  expect(onAnswer).toHaveBeenNthCalledWith(3, {
    picture: `path3.jpg`,
    artist: `Gary Barlow`,
  });
});
