import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {WelcomeScreen} from './welcome-screen';

Enzyme.configure({adapter: new Adapter()});

it(`Should work correctly on button click`, () => {
  const handler = jest.fn();

  const params = (e) => e.preventDefault;

  const app = shallow(<WelcomeScreen
    time={7}
    errorCount={8}
    clickHandler={handler}
  />);

  const startButton = app.find(`button`);
  startButton.simulate(`click`, {params});

  expect(handler).toHaveBeenCalledTimes(1);
});


