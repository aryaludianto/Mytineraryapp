// eslint-disable-next-line no-unused-vars
import React from 'react';
import { shallow } from 'enzyme';
// eslint-disable-next-line no-unused-vars
import Header from './Header'
// import { wrap } from 'module';

const setUp = (props = {}) => {
  const component = shallow(<Header {...props} />)
  return component;
}

const findByTestAtrr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
}

describe('Header Component', () => {

  let component;
  beforeEach(() => {
    component = setUp()
  });

  it('should render-without errors', () => {
    console.log(component.debug());
    const wrapper = findByTestAtrr(component, Header)
    console.log(wrapper)

    expect(wrapper.length).toBe(0)
    expect(component).toMatchSnapshot();
    // expect(1).toBe(1);
  })
})
