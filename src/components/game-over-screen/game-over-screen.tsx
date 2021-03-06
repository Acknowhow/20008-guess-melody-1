import * as React from 'react';
import {Link} from 'react-router-dom';

interface Props {
  onRelaunchButtonClick: () => void
}

const GameOverScreen: React.FunctionComponent<Props> = ({onRelaunchButtonClick}) => {
  return <section className="result">
    <div className="result__logo">
      <img src="img/melody-logo.png" alt="Угадай мелодию" width="186" height="83" />
    </div>
    <h2 className="result__title">Какая жалость!</h2>
    <p className="result__total result__total--fail">У вас закончились все попытки. Ничего, повезёт в следующий раз!</p>

    <Link
      className="replay"
      to="/"
      onClick={onRelaunchButtonClick}
      type="button"
    >Попробовать ещё раз</Link>
  </section>;
};

export default GameOverScreen;
