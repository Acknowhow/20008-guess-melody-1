import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WelcomeScreen from './welcome-screen';

Enzyme.configure({adapter: new Adapter()});

it(`Should work correctly on button click`, () => {

  const app = shallow(<WelcomeScreen
    time={7}
    errorCount={8}
    handleClick={jest.fn()}
  />);

  const startButton = app.find(`button`);
  expect(startButton).toHaveLength(1);
});


