import React, {createRef, PureComponent} from 'react';
import PropTypes from 'prop-types';

const withAudio = (Component) => {
  class WithAudio extends PureComponent {
    constructor(props) {
      super(props);

      this._audioRef = createRef();

      this.state = {
        isLoading: true,
        isPlaying: props.isPlaying,
      };

      this._renderAudio = this._renderAudio.bind(this);
      this._onPlayButtonClick = this._onPlayButtonClick.bind(this);
    }

    _renderAudio(src) {

      return () => (
        <audio ref={this._audioRef} src={src}/>
        );
    }

    render() {
      const {isLoading} = this.state;
      const {src, isPlaying} = this.props;

      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          isPlaying={isPlaying}
          renderAudio={this._renderAudio(src)}
          onPlayButtonClick={this._onPlayButtonClick}
        />
      );
    }

    componentDidMount() {
      const audio = this._audioRef.current;

      audio.oncanplay = () => this.setState({
        isLoading: false,
      });

      audio.onplay = () => {
        this.setState({
          isPlaying: true,
        });
      };

      audio.onpause = () => this.setState({
        isPlaying: false,
      });
    }

    componentDidUpdate() {
      const audio = this._audioRef.current;

      if (this.props.isPlaying) {
        audio.play();
      } else {
        audio.pause();
      }
    }

    componentWillUnmount() {
      const audio = this._audioRef.current;

      audio.oncanplaythrough = null;
      audio.onplay = null;
      audio.onpause = null;
      audio.ontimeupdate = null;
      audio.src = ``;
    }

    _onPlayButtonClick() {

      this.props.onPlayButtonClick();
      this.setState({isPlaying: !this.state.isPlaying});
    }
  }

  WithAudio.propTypes = {
    renderPlayerId: PropTypes.number.isRequired,
    isPlaying: PropTypes.bool.isRequired,
    onPlayButtonClick: PropTypes.func.isRequired,
    src: PropTypes.string.isRequired,
  };

  return WithAudio;
};

export default withAudio;
