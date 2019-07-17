import * as React from 'react';

interface Props {
  isLoading: boolean,
  isPlaying: boolean,
  renderAudio: () => React.ReactElement,
  onPlayButtonClick: () => void
  src: string
}

class AudioPlayer extends React.PureComponent<Props, null> {
  render() {
    const {
      isLoading,
      isPlaying,
      renderAudio,
      onPlayButtonClick} = this.props;

    return (
      <>
        <button
          className={`track__button track__button--${isPlaying ? `pause` : `play`}`}
          type="button"
          disabled={isLoading}
          onClick={onPlayButtonClick}
        />
        <div className="track__status">
          {renderAudio()}
        </div>
      </>
    );
  }
}

export default AudioPlayer;
