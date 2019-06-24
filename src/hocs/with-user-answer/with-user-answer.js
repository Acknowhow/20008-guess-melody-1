import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';

const withUserAnswer = (Component) => {
  class WithUserAnswer extends PureComponent {
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

  WithUserAnswer.propTypes = {
    answers: PropTypes.arrayOf(PropTypes.shape({
      src: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
    })),
    onAnswer: PropTypes.func.isRequired,
  };

  return WithUserAnswer;
};

export default withUserAnswer;
