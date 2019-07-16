/**
 * Создание структур данных
 */

export default () => {
  const logObject = (obj: {foo: string, bar: string}): void => {
    console.log(obj);
  };

  logObject({foo: ``, bar: ``}); // OK


  interface FooBar {
    foo: string
    bar: string
  }

  const logFooBar = (obj: FooBar): void => {
    console.log(obj);
  };

  logFooBar({foo: ``, bar: ``}); // OK

  // Potentially modify reducer
  const modifyFooBar = (obj: FooBar): FooBar => {
    return {
      foo: obj.foo + `foo`,
      bar: obj.bar + `bar`
    };
  };

  console.log(modifyFooBar({foo: `foo`, bar: `bar`})); // OK
};
