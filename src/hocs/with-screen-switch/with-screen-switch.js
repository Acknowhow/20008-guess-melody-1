import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {compose} from 'recompose';

import WinScreen from '../../components/win-screen/win-screen.jsx';
import WelcomeScreen from '../../components/welcome-screen/welcome-screen.jsx';
import GameOverScreen from '../../components/game-over-screen/game-over-screen.jsx';
import GenreQuestionScreen from '../../components/genre-question-screen/genre-question-screen.jsx';
import ArtistQuestionScreen from '../../components/artist-question-screen/artist-question-screen.jsx';

import withActivePlayer from '../with-active-player/with-active-player';
import withUserAnswer from '../with-user-answer/with-user-answer';
import withTransformProps from '../with-transform-props/with-transform-props';
import * as Action from '../../reducers/reducer';

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
  class WithScreenSwitch extends PureComponent {
    constructor(props) {
      super(props);

      this._getScreen = this._getScreen.bind(this);
    }

    _getScreen(question) {

      if (!question) {
        const {step, questions} = this.props;
        if (step > questions.length - 1) {
          return <WinScreen/>;

        } else {

          const {
            maxMistakes,
            gameTime,
            onWelcomeScreenClick
          } = this.props;

          return <WelcomeScreen
            errorCount={maxMistakes}
            time={gameTime}
            handleClick={onWelcomeScreenClick}
          />;
        }
      }

      const {
        mistakes,
        maxMistakes,
        onGenreUserAnswer,
        onArtistUserAnswer,
        resetGame
      } = this.props;

      if (mistakes >= maxMistakes) {
        return <GameOverScreen
          onRelaunchButtonClick={resetGame}
        />;
      }

      switch (question.type) {
        case `genre`: return <GenreQuestionScreenWrapped
          answers={question.answers}
          question={question}
          onAnswer={(userAnswer) => onGenreUserAnswer(userAnswer, question)}
        />;

        case `artist`: return <ArtistQuestionScreenWrapped
          question={question}
          onAnswer={(userAnswer) => onArtistUserAnswer(userAnswer, question)}
        />;
      }

      return null;
    }

    render() {
      return <Component
        {...this.props}
        renderScreen={this._getScreen}
      />;
    }
  }

  WithScreenSwitch.propTypes = {
    mistakes: PropTypes.number.isRequired,
    maxMistakes: PropTypes.number.isRequired,
    gameTime: PropTypes.number.isRequired,
    questions: PropTypes.array.isRequired,
    step: PropTypes.number.isRequired,
    onWelcomeScreenClick: PropTypes.func.isRequired,
    onGenreUserAnswer: PropTypes.func.isRequired,
    onArtistUserAnswer: PropTypes.func.isRequired,
    resetGame: PropTypes.func.isRequired
  };

  return WithScreenSwitch;
};

const mapStateToProps = (state, ownProps) => Object.assign(
  {}, ownProps, {
    step: state.step,
    mistakes: state.mistakes,
    questions: state.questions
  });

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(Action.ActionCreator.incrementStep()),

  onGenreUserAnswer: (userAnswer, question) => {
    dispatch(Action.ActionCreator.incrementStep());
    dispatch(Action.onGenreUserAnswer(userAnswer, question));
  },

  onArtistUserAnswer: (userAnswer, question) => {
    dispatch(Action.ActionCreator.incrementStep());
    dispatch(Action.onArtistUserAnswer(userAnswer, question));
  },

  resetGame: () => dispatch(Action.ActionCreator.resetState())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withScreenSwitch
);
