import React, {PureComponent} from 'react';
import AudioPlayer from '../../components/audio-player/audio-player.jsx';

import withAudio from '../with-audio/with-audio';

const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {
  class WithActivePlayer extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };

      this.playButtonClickCompound = {};
    }

    _getOnPlayButtonClick(id) {
      if (!this.playButtonClickCompound[id]) {

        this.playButtonClickCompound[id] = () => {
          const {activePlayer} = this.state;

          this.setState({
            activePlayer: activePlayer === id ? -1 : id
          })
        }
      }

      return this.playButtonClickCompound[id];
    }

    render() {
      const {activePlayer} = this.state;

      return (
        <Component
          {...this.props}

          renderPlayer={(it, i) => {
            return (<AudioPlayerWrapped
              isPlaying={i === activePlayer}
              onPlayButtonClick={this._getOnPlayButtonClick(i)}
              src={it.src}
            />);
          }}
        />);
    }
  }

  WithActivePlayer.propTypes = {};

  return WithActivePlayer;
};

export default withActivePlayer;
