import * as React from 'react';
import {Subtract} from 'utility-types';

import AudioPlayer from '../../components/audio-player/audio-player';
import withAudio from '../with-audio/with-audio';

interface State {
  activePlayer: number,
}

interface InjectedProps {
  renderPlayer: (song: {src: string}, id: number) => typeof AudioPlayerWrapped,
}

const AudioPlayerWrapped = withAudio(AudioPlayer);

const withActivePlayer = (Component) => {

  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectedProps>;

  class WithActivePlayer extends React.PureComponent<T, State> {

    private playButtonClickCompound: {};

    constructor(props) {
      super(props);

      this.state = {
        activePlayer: -1,
      };

      this.playButtonClickCompound = {};
      this._getOnPlayButtonClick = this._getOnPlayButtonClick.bind(this);
    }

    _getOnPlayButtonClick(id) {
      if (!this.playButtonClickCompound[id]) {

        this.playButtonClickCompound[id] = () => {
          const {activePlayer} = this.state;

          this.setState({
            activePlayer: activePlayer === id ? -1 : id
          });
        };
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
              // renderPlayerId={i}
            />);
          }}
        />);
    }
  }


  return WithActivePlayer;
};

export default withActivePlayer;
