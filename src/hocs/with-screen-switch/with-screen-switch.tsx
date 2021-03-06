import * as React from 'react';
import {connect} from 'react-redux';
import {compose} from 'recompose';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

import WinScreen from '../../components/win-screen/win-screen';
import WelcomeScreen from '../../components/welcome-screen/welcome-screen';
import GameOverScreen from '../../components/game-over-screen/game-over-screen';
import GenreQuestionScreen from '../../components/genre-question-screen/genre-question-screen';
import ArtistQuestionScreen from '../../components/artist-question-screen/artist-question-screen';
import AuthorizationScreen from '../../components/authorization-screen/authorization-screen';

import withActivePlayer from '../with-active-player/with-active-player';
import withUserAnswer from '../with-user-answer/with-user-answer';
import withTransformProps from '../with-transform-props/with-transform-props';

import * as GameAction from '../../reducers/game/game';
import * as UserAction from '../../reducers/user/user';

import {getStep} from '../../reducers/game/selectors';
import {getMistakes} from '../../reducers/game/selectors';
import {getSelectedQuestions} from '../../reducers/data/selectors';
import {getAuthorizationStatus, getCredentials} from '../../reducers/user/selectors';
import {AnswerArtist, AnswerGenre, QuestionGenre, QuestionArtist, formEntry} from '../../types';

type Answer = AnswerArtist|AnswerGenre|boolean[];
type Question = QuestionGenre|QuestionArtist;

interface Props {
  gameTime: number,
  isAuthorizationRequired: boolean,
  mistakes: number,
  maxMistakes: number,
  questions: Question[],
  step: number,
  credentials: {},
  onWelcomeScreenClick: () => void,
  onGenreUserAnswer: (answer: Answer, question: Question) => void,
  onArtistUserAnswer: (answer: Answer, question: Question) => void,
  onAuthorizationScreenSubmit: (data: formEntry) => void,
  resetGame: () => void
}

const transformPlayerToAnswer = (props) => {
  const newProps = Object.assign({}, props, {
    renderAnswer: props.renderPlayer
  });

  delete newProps.renderPlayer;
  return newProps;
};

const ArtistQuestionScreenWrapped = withActivePlayer(
    ArtistQuestionScreen);

const GenreQuestionScreenWrapped = withActivePlayer(
    withUserAnswer(
        withTransformProps(transformPlayerToAnswer)(GenreQuestionScreen)));


const withScreenSwitch = (Component) => {
  class WithScreenSwitch extends React.PureComponent<Props, null> {
    constructor(props) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
    }

    _getScreen(question) {
      const {
        gameTime,
        isAuthorizationRequired,
        maxMistakes,
        mistakes,
        questions,
        step,
        onGenreUserAnswer,
        onArtistUserAnswer,
        onWelcomeScreenClick
      } = this.props;

      if (step >= questions.length && isAuthorizationRequired) {
        return <Redirect to="/login"/>;
      } else if (step >= questions.length) {

        return <Redirect to="/win" />;
      }

      if (mistakes >= maxMistakes) {
        return <Redirect to="/lose" />;
      }

      if (step === -1) {
        return <WelcomeScreen
          errorCount={maxMistakes}
          time={gameTime}
          handleClick={onWelcomeScreenClick} />;
      }

      switch (question.type) {
        case `genre`: return <GenreQuestionScreenWrapped
          answers={question.answers}
          question={question}
          onAnswer={(userAnswer) => onGenreUserAnswer(userAnswer, question)} />;

        case `artist`: return <ArtistQuestionScreenWrapped
          question={question}
          onAnswer={(userAnswer) => onArtistUserAnswer(userAnswer, question)}
          step={step} />;
      }

      return null;
    }

    render() {
      const {
        onAuthorizationScreenSubmit,
        resetGame} = this.props;

      return (
        <BrowserRouter>
          <Switch>
            <Route path="/" exact render={() => <Component
              {...this.props}
              renderScreen={this._getScreen}
            />} />
            <Route path="/win" render={() => <WinScreen
              onReplayButtonClick={resetGame}
            />} />
            <Route path="/login" render={() =>
              <AuthorizationScreen
                handleSubmit={(submitData) => onAuthorizationScreenSubmit(submitData)}/>} />

            <Route path="/lose" render={() => <GameOverScreen
              onRelaunchButtonClick={resetGame} />} />
          </Switch>
        </BrowserRouter>);
    }
  }

  return WithScreenSwitch;
};

const mapStateToProps = (state, ownProps) => Object.assign(
    {}, ownProps, {
      step: getStep(state),
      mistakes: getMistakes(state),
      questions: getSelectedQuestions(state),
      isAuthorizationRequired: getAuthorizationStatus(state),
      credentials: getCredentials(state)
    });

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(GameAction.ActionCreator.incrementStep()),

  onAuthorizationScreenSubmit: (submitData) => {

    dispatch(UserAction.Operation.sendCredentials(submitData));
  },

  onGenreUserAnswer: (userAnswer, question) => {
    dispatch(GameAction.ActionCreator.incrementStep());
    dispatch(GameAction.onGenreUserAnswer(userAnswer, question));
  },

  onArtistUserAnswer: (userAnswer, question) => {
    dispatch(GameAction.ActionCreator.incrementStep());
    dispatch(GameAction.onArtistUserAnswer(userAnswer, question));
  },

  resetGame: () => dispatch(GameAction.ActionCreator.resetGame())
});

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withScreenSwitch
);
