import {NameSpace} from './../name-spaces';

const NAME_SPACE = NameSpace.DATA;

export const getQuestions = (state) => {
  return state[NAME_SPACE].questions;
};
