export default () => {
  interface Foo {
    foo: string
  }

  interface Bar {
    bar: string
  }

  const foo = {foo: `foo`};
  const bar = {bar: `bar`};

  type FooOrBar = Foo | Bar;

  const log1 = (item: FooOrBar): void => {
    console.log(item);
  };

  log1(foo);
  log1({foo: `foo`});

  type FoorAndBar = Foo & Bar;

  const log2 = (item: FoorAndBar): void => {
    console.log(item);
  };

  log2(Object.assign({}, foo, bar));

}


