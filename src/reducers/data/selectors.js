import {createSelector} from "reselect";
import {NameSpace} from './../name-spaces';
import {getStep} from '../game/selectors';

const NAME_SPACE = NameSpace.DATA;

export const getQuestions = (state) => {
  return state[NAME_SPACE].questions;
};

const getQuestionType = (state) => {
  return getQuestions(state)[getStep(state)];
};

export const getSelectedQuestions = createSelector(
  getQuestions,
  getQuestionType,
  (questions, question) => {

    if (question) {
      switch (question.type) {
        case `genre`:

          return questions.filter((it) => it.type === `genre`);

        case `artist`:

          return questions.filter((it) => it.type === `artist`);
      }
    }

    return questions;
  }
);


