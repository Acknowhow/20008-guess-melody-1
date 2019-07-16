

export default () => {

  class Getter <T> {

    public item: T;

    constructor(item: any) {
      this.item = item;
    }

    getItem(): T {
      return this.item;
    }
  }

  /** При создании задается тип, с которым мы потом
   * будем работать
   */
  const numberGetter = new Getter<number>(12);


  console.log(Math.floor(numberGetter.getItem()));

  class GetNumber extends Getter <number> {}


}
