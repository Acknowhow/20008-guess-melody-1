import * as React from 'react';
import {Subtract} from 'utility-types';

interface Props {
  answers: {
    src: string,
    genre: string,
  }[],
  onAnswer: (answers: boolean[]) => void,
}

interface State {
  userAnswer: boolean[],
}

interface InjectedProps {
  userAnswer: boolean[],
  onChange: (i: number) => void,
  onAnswer: () => void,
}

const withUserAnswer = (Component) => {

  type P = Props & React.ComponentProps<typeof Component>;

  class WithUserAnswer extends React.PureComponent<Subtract<P, InjectedProps>, State> {
    constructor(props) {
      super(props);

      this.state = {
        userAnswer: new Array(props.answers.length).fill(false),
      };

      this._onChange = this._onChange.bind(this);
      this._onAnswer = this._onAnswer.bind(this);
    }

    _onChange(i) {
      const userAnswer = [...this.state.userAnswer];
      userAnswer[i] = !userAnswer[i];

      this.setState({userAnswer});
    }

    _onAnswer() {
      const {onAnswer} = this.props;

      onAnswer(this.state.userAnswer);
    }

    render() {
      return (
        <Component
          {...this.props}
          userAnswer={this.state.userAnswer}
          onChange={this._onChange}
          onAnswer={this._onAnswer}
        />
      );
    }
  }

  return WithUserAnswer;
};

export default withUserAnswer;
