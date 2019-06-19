import questions from './../mocks/questions';
import {ActionType} from './../data';

const initialState = {
  step: -1,
  mistakes: 0,
  questions: []
};

const ActionCreator = {
  loadQuestions: () => {
    return {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions,
    };
  },

  incrementStep: () => {
    return {
      type: ActionType.INCREMENT_STEP,
      payload: 1,
    };
  },

  incrementMistake: () => {
    return {
      type: ActionType.INCREMENT_MISTAKE,
      payload: 1,
    };
  },

  staleMistake: () => {
    return {
      type: ActionType.STALE_MISTAKE,
      payload: 0
    };
  },

  resetState: () => {
    return {
      type: ActionType.RESET,
    };
  }
};

const isArtistAnswerCorrect = (userAnswer, question) =>
  userAnswer.artist === question.song.artist;

const isGenreAnswerCorrect = (userAnswer, question) =>
  userAnswer.every((it, i) => it === (
    question.answers[i].genre === question.genre
  ));

const proceedOnUserAnswer = (answerIsCorrect, mistakes, maxMistakes) => {

  if (!answerIsCorrect && mistakes + 1 < maxMistakes) {
    return ActionCreator.incrementMistake();
  }

  if (!answerIsCorrect && mistakes + 1 >= maxMistakes) {
    return ActionCreator.resetState();
  }

  return ActionCreator.staleMistake();
};

const onGenreUserAnswer = (userAnswer, question, mistakes, maxMistakes) => {
  const answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);

  return proceedOnUserAnswer(answerIsCorrect, mistakes, maxMistakes);
};

const onArtistUserAnswer = (userAnswer, question, mistakes, maxMistakes) => {
  const answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);

  return proceedOnUserAnswer(answerIsCorrect, mistakes, maxMistakes);
};


const reducer = (state = initialState, action) => {

  switch (action.type) {
    case ActionType.INCREMENT_STEP:
      return Object.assign({}, state, {
        step: state.step + action.payload,
      });

    case ActionType.INCREMENT_MISTAKE:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload,
      });

    case ActionType.STALE_MISTAKE:
      return Object.assign({}, state, {
        mistakes: state.mistakes + action.payload,
      });

    case ActionType.LOAD_QUESTIONS:
      return Object.assign({}, state, {
        questions: action.payload,
      });
  }

  return state;
};

export {
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  onGenreUserAnswer,
  onArtistUserAnswer,
  ActionCreator,
  reducer,
};
