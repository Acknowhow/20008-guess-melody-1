import * as React from 'react';
import * as Enzyme from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen';

Enzyme.configure({adapter: new Adapter()});

it(`Should work correctly on button click`, () => {

  const app = Enzyme.shallow(<WelcomeScreen
    time={7}
    errorCount={8}
    handleClick={jest.fn()}
  />);

  const startButton = app.find(`button`);
  expect(startButton).toHaveLength(1);
});


