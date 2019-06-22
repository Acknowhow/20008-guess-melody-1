import {ActionType} from './../data';

const initialState = {
  step: -1,
  mistakes: 0,
  questions: [],
  isAuthorizationRequired: false
};

const Operation = {
  loadQuestions: () => (dispatch, _getState, api) => {
    return api.get(`/questions`)
      .then((response) => {
        dispatch(ActionCreator.loadQuestions(response.data));
      });
  },
};


const ActionCreator = {
  loadQuestions: (questions) => {
    return {
      type: ActionType.LOAD_QUESTIONS,
      payload: questions,
    };
  },

  requireAuthorization: (status) => {
    return {
      type: ActionType.REQUIRE_AUTHORIZATION,
      payload: status,
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

const proceedOnUserAnswer = (answerIsCorrect) => {

  if (!answerIsCorrect) {
    return ActionCreator.incrementMistake();
  }

  return ActionCreator.staleMistake();
};

const onGenreUserAnswer = (userAnswer, question) => {
  const answerIsCorrect = isGenreAnswerCorrect(userAnswer, question);

  return proceedOnUserAnswer(answerIsCorrect);
};

const onArtistUserAnswer = (userAnswer, question) => {
  const answerIsCorrect = isArtistAnswerCorrect(userAnswer, question);

  return proceedOnUserAnswer(answerIsCorrect);
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

    case ActionType.REQUIRE_AUTHORIZATION:
      return Object.assign({}, state, {
        isAuthorizationRequired: action.payload,
      });

    case ActionType.RESET:
      return Object.assign({}, initialState);
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
  Operation
};
