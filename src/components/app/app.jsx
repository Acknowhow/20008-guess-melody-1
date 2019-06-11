import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import {Type} from '../../data';

import * as Action from '../../reducers/reducer';
import WelcomeScreen from '../welcome-screen/welcome-screen.jsx';
import GenreQuestionScreen from '../genre-question-screen/genre-question-screen.jsx';
import ArtistQuestionScreen from '../artist-question-screen/artist-question-screen.jsx';
import GameOverScreen from '../game-over-screen/game-over-screen.jsx';
import WinScreen from '../win-screen/win-screen.jsx';

import withActivePlayer from './../../hocs/with-active-player/with-active-player';
import withUserAnswer from './../../hocs/with-user-answer/with-user-answer';
import withTransformProps from './../../hocs/with-transform-props/with-transform-props';

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

class App extends Component {
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
        onAnswer={(userAnswer) => onGenreUserAnswer(userAnswer, question, mistakes, maxMistakes)}
      />;

      case `artist`: return <ArtistQuestionScreenWrapped
        question={question}
        onAnswer={(userAnswer) => onArtistUserAnswer(userAnswer, question, mistakes, maxMistakes)}
      />;
    }

    return null;
  }

  render() {
    const {
      questions,
      step,
    } = this.props;

    return (
      <section className={`game ${Type.ARTIST}`}>
        <header className="game__header">
          <a className="game__back" href="#">
            <span className="visually-hidden">Сыграть ещё раз</span>
            <img className="game__logo" src="img/melody-logo-ginger.png" alt="Угадай мелодию" />
          </a>

          <svg xmlns="http://www.w3.org/2000/svg" className="timer" viewBox="0 0 780 780">
            <circle className="timer__line" cx="390" cy="390" r="370"
              style={{
                filter: `url(#blur)`,
                transform: `rotate(-90deg) scaleY(-1)`,
                transformOrigin: `center`
              }}
            />
          </svg>

          <div className="timer__value" xmlns="http://www.w3.org/1999/xhtml">
            <span className="timer__mins">05</span>
            <span className="timer__dots">:</span>
            <span className="timer__secs">00</span>
          </div>

          <div className="game__mistakes">
            <div className="wrong"></div>
            <div className="wrong"></div>
            <div className="wrong"></div>
          </div>
        </header>

        {this._getScreen(questions[step])}

      </section>);
  }
}

App.propTypes = {
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

const mapStateToProps = (state, ownProps) => Object.assign(
    {}, ownProps, {step: state.step, mistakes: state.mistakes,
    });

const mapDispatchToProps = (dispatch) => ({
  onWelcomeScreenClick: () => dispatch(Action.ActionCreator.incrementStep()),

  onGenreUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(Action.ActionCreator.incrementStep());
    dispatch(Action.onGenreUserAnswer(userAnswer, question, mistakes, maxMistakes));
  },

  onArtistUserAnswer: (userAnswer, question, mistakes, maxMistakes) => {
    dispatch(Action.ActionCreator.incrementStep());
    dispatch(Action.onArtistUserAnswer(userAnswer, question, mistakes, maxMistakes));
  },

  resetGame: () => dispatch(Action.ActionCreator.resetState())
});

export {App};

export default connect(mapStateToProps, mapDispatchToProps)(App);


