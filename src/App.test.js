// eslint-disable-next-line no-unused-vars
import React from 'react';
import ReactDOM from 'react-dom';
// eslint-disable-next-line no-unused-vars
import App from './App';
// eslint-disable-next-line no-unused-vars
import Header from '../src/component/Header/Header'
// import { shallow } from 'enzyme';

describe('App root Component', () => {
  it('App renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
})

// describe('Header Component', () => {
//   it('should render-without errors', () => {
//     const component = shallow(<Header />);
//     // console.log(component.debug());
//     const wrapper = component.find('.Header');
//     // console.log(wrapper.length)
//     expect(wrapper.length).toBe(1)
//   })
// })

