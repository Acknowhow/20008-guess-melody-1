import * as React from 'react';

interface Props {
  errorCount: number,
  time: number,
  handleClick: () => void
}

const WelcomeScreen: React.FunctionComponent<Props> = (props) => {
  const {
    time,
    errorCount,
    handleClick
  } = props;

  return (
    <section className="welcome" id="#section">
      <div className="welcome__logo">
        <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83"/>
      </div>
      <button className="welcome__button" onClick={handleClick}>
        <span className="visually-hidden">Начать игру</span>
      </button>
      <h2 className="welcome__rules-title">Правила игры</h2>
      <p className="welcome__text">Правила просты:</p>
      <ul className="welcome__rules-list">
        <li>За {time} минут нужно ответить на все вопросы.</li>
        <li>Можно допустить {errorCount} ошибки.</li>
      </ul>
      <p className="welcome__text">Удачи!</p>
    </section>
  );
};

export default WelcomeScreen;
