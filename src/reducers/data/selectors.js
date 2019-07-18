import {createSelector} from "reselect";
import {NameSpace} from './../name-spaces';
import {getStep} from '../game/selectors';

const NAME_SPACE = NameSpace.DATA;

export const getQuestions = (state) => {
  return state[NAME_SPACE].questions;
};

export const getSelectedQuestions = createSelector(
    getQuestions,
    getStep,
    (questions, step) => {

      if (questions[step]) {
        switch (questions[step].type) {
          case `genre`:

            return questions.filter((it) => it.type === `genre`);

          case `artist`:

            return questions.filter((it) => it.type === `artist`);
        }
      }
      return questions;
    }
);
