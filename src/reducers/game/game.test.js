import {isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  ActionCreator,
  reducer,
} from './game';

describe(`Business logic is correct`, () => {
  it(`Artist answer is checked correctly`, () => {
    expect(isArtistAnswerCorrect({
      artist: `correct-artist`,
      picture: `correct-pic`,
    }, {
      type: `artist`,
      song: {
        artist: `correct-artist`,
        src: ``,
      },
      answers: [
        {
          artist: `incorrect-artist`,
          picture: `incorrect-pic`,
        },
        {
          artist: `correct-artist`,
          picture: `correct-pic`,
        },
        {
          artist: `incorrect-artist-2`,
          picture: `incorrect-pic`,
        },
      ]
    })).toBe(true);

    expect(isArtistAnswerCorrect({
      artist: `incorrect-artist-2`,
      picture: `incorrect-pic`,
    }, {
      type: `artist`,
      song: {
        artist: `correct-artist`,
        src: ``,
      },
      answers: [
        {
          artist: `incorrect-artist`,
          picture: `incorrect-pic`,
        },
        {
          artist: `correct-artist`,
          picture: `correct-pic`,
        },
        {
          artist: `incorrect-artist-2`,
          picture: `incorrect-pic`,
        },
      ]
    })).toBe(false);
  });

  it(`Genre question is checked correctly`, () => {
    expect(isGenreAnswerCorrect(
        [false, false, true, false], {
          type: `genre`,
          genre: `rock`,
          answers: [
            {
              genre: `jazz`,
              src: `0`,
            },
            {
              genre: `blues`,
              src: `1`,
            },
            {
              genre: `rock`,
              src: `2`,
            },
            {
              genre: `jazz`,
              src: `3`,
            },
          ]
        })).toEqual(true);


    expect(isGenreAnswerCorrect(
        [false, false, false, false], {
          type: `genre`,
          genre: `jazz`,
          answers: [
            {
              genre: `jazz`,
              src: `0`,
            },
            {
              genre: `jazz`,
              src: `1`,
            },
            {
              genre: `rock`,
              src: `2`,
            },
            {
              genre: `blues`,
              src: `3`,
            },
          ]
        })).toEqual(false);
  });
});

describe(`Action creator works correctly`, () => {
  it(`Action creator should work consistently with method called`, () => {
    expect(ActionCreator.incrementStep()).toEqual({
      type: `INCREMENT_STEP`,
      payload: 1,
    });

    expect(ActionCreator.incrementMistake()).toEqual({
      type: `INCREMENT_MISTAKE`,
      payload: 1,
    });

    expect(ActionCreator.staleMistake()).toEqual({
      type: `STALE_MISTAKE`,
      payload: 0,
    });

    expect(ActionCreator.resetGame()).toEqual({
      type: `RESET_GAME`,
    });

  });
});

describe(`Reducer works correctly`, () => {
  it(`Reducer should return initial state without any additional parameters`, () => {
    expect(reducer(undefined, {})).toEqual({
      step: -1,
      mistakes: 0,
    });
  });

  it(`Reducer should increment current step by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: `INCREMENT_STEP`,
      payload: 1,
    })).toEqual({
      step: 0,
      mistakes: 0,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: `INCREMENT_STEP`,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
    });
  });


  it(`Reducer should increment number of mistakes by a given value`, () => {
    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: `INCREMENT_MISTAKE`,
      payload: 1,
    })).toEqual({
      step: -1,
      mistakes: 1,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: `INCREMENT_MISTAKE`,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: `STALE_MISTAKE`,
      payload: 0,
    })).toEqual({
      step: -1,
      mistakes: 0,
    });
  });

  it(`Reducer should correctly reset application state`, () => {
    expect(reducer({
      step: -1000,
      mistakes: 123,
    }, {
      type: `RESET_GAME`,
    })).toEqual({
      step: -1,
      mistakes: 0,
    });
  });
});
