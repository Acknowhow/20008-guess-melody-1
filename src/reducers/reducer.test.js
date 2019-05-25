import {
  isArtistAnswerCorrect,
  isGenreAnswerCorrect,
  ActionCreator,
  reducer,
} from './reducer';

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
  });

  it(`Action creator increments 0 payload on increment mistake method call if correct artist answer is provided`,
      () => {

        expect(ActionCreator.incrementMistake({
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
        }, 0, Infinity)).toEqual({
          type: `INCREMENT_MISTAKES`,
          payload: 0
        });
      });

  it(`Action creator increments 1 payload on increment mistake method call if incorrect artist answer is provided`,
      () => {

        expect(ActionCreator.incrementMistake(
            {
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
            }, 0, Infinity)).toEqual({
          type: `INCREMENT_MISTAKES`,
          payload: 1
        });
      });

  it(`Action creator increments 0 payload on increment mistake method call if correct genre answer is provided `,
      () => {
        expect(ActionCreator.incrementMistake(
            [false, true, false, false], {
              type: `genre`,
              genre: `jazz`,
              answers: [
                {
                  genre: `rock`,
                  src: ``,
                },
                {
                  genre: `jazz`,
                  src: ``,
                },
                {
                  genre: `blues`,
                  src: ``,
                },
                {
                  genre: `blues`,
                  src: ``,
                },
              ]
            }, 0, Infinity)).toEqual({
          type: `INCREMENT_MISTAKES`,
          payload: 0,
        });
      });

  it(`Action creator increments 1 payload on increment mistake method call if incorrect genre answer is provided`,
      () => {
        expect(ActionCreator.incrementMistake(
            [true, true, true, true], {
              type: `genre`,
              genre: `jazz`,
              answers: [
                {
                  genre: `blues`,
                  src: ``,
                },
                {
                  genre: `blues`,
                  src: ``,
                },
                {
                  genre: `blues`,
                  src: ``,
                },
                {
                  genre: `blues`,
                  src: ``,
                },
              ]
            }, 0, Infinity)).toEqual({
          type: `INCREMENT_MISTAKES`,
          payload: 1,
        });
      });

  it(`Action creator resets state on increment mistake method call if the answer is incorrect and there are no more mistakes`,
      () => {
        expect(ActionCreator.incrementMistake({
          artist: `incorrect`,
          picture: ``,
        }, {
          type: `artist`,
          song: {
            artist: `correct`,
            src: ``,
          },
          answers: [
            {
              artist: `correct`,
              picture: ``,
            },
            {
              artist: `incorrect`,
              picture: ``,
            },
            {
              artist: `incorrect-2`,
              picture: ``,
            },
          ]
        }, Infinity, 0)).toEqual({
          type: `RESET`,
        });

        expect(ActionCreator.incrementMistake([false, false, false, true], {
          type: `genre`,
          genre: `jazz`,
          answers: [
            {
              genre: `blues`,
              src: ``,
            },
            {
              genre: `blues`,
              src: ``,
            },
            {
              genre: `blues`,
              src: ``,
            },
            {
              genre: `blues`,
              src: ``,
            },
          ]
        }, Infinity, 0)).toEqual({
          type: `RESET`,
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
      type: `INCREMENT_MISTAKES`,
      payload: 1,
    })).toEqual({
      step: -1,
      mistakes: 1,
    });

    expect(reducer({
      step: -1,
      mistakes: 0,
    }, {
      type: `INCREMENT_MISTAKES`,
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
      type: `RESET`,
    })).toEqual({
      step: -1,
      mistakes: 0,
    });
  });
});
