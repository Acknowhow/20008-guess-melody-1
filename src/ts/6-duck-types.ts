export default () => {
  class Car {
    id: number;
    // is not OK with new Boat
    // numberOfWheels: number;
    move (x: number, y:number) {
      console.log(`move`);
    }
  }

  class Boat {
    id: number;
    move (x: number, y:number) {
      console.log(`move`);
    }
  }

  const car: Car = new Boat();
  const boat: Boat = new Car();



}


