
export default () => {
  enum Size {
    BIG = 'BIG',
    SMALL = 'SMALL',
  }

  enum Color {
    RED = 'RED',
    GREEN = 'GREEN',
    YELLOW = 'YELLOW'
  }

  const log = (value: Color) => {
    console.log(value);
  };

  interface Obj {
    color: Color,
    size: Size
  }

  const createObj = (color: Color, size: Size): Obj => {
    return {
      color,
      size
    }
  };

  const obj = createObj(Color.GREEN, Size.BIG);
};

