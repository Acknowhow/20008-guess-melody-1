import * as React from 'react';
import {connect} from 'react-redux';

import {getSelectedQuestions} from '../../reducers/data/selectors';
import {getStep} from '../../reducers/game/selectors';

enum Type {
  ARTIST = "artist",
  GENRE = "genre",
}

type Question = QuestionArtist | QuestionGenre;

interface QuestionGenre {
  answers: {
    src: string,
    genre: string
  }[],

  genre: string,
  type: Type
}

interface QuestionArtist {
  answers: {
    picture: string,
    artist: string
  }[],

  song: {
    artist: string,
    src: string
  },

  type: Type
}

interface Props {
  questions: Question[],
  step: number,
  renderScreen: (question: Question) => React.ReactElement
}

class App extends React.Component<Props, null> {
  render() {
    const {
      questions,
      step,
      renderScreen
    } = this.props;

    return (
      <section className={`game game--${Type.ARTIST}`}>
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

          <div className="timer__value">
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

        {renderScreen(questions[step])}

      </section>);
  }
}


const mapStateToProps = (state, ownProps) => Object.assign(
    {}, ownProps, {
      questions: getSelectedQuestions(state),
      step: getStep(state),
    });

export {App};

export default connect(mapStateToProps)(App);


