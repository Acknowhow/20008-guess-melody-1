/**
 * Примитивы
 */

export default () =>  {
  const writeMessage = (message: string) => {
    console.log(message);
  };

writeMessage(`hello`); // OK


const createMessage = (word1: number, word2: boolean): string => {
  return `${word1} ${word2}`;
};

createMessage(12, true); // OK

/**
 * Объекты
 */

const logObject = (obj: {foo: string, bar: string}): void => {
  console.log(obj);
};

logObject({foo: `foo`, bar: `bar`}); // OK


const logArray = (arr: string[]): void => {
  console.log(arr.join(` `));
};

logArray([`hello`, `world`]); // OK

/**
 * Any
 */

const logAny = (item: any): void => {
  console.log(item);
};

logAny(12); // OK
logAny(true); // OK
logAny({}); // OK

}
