// eslint-disable-next-line no-unused-vars
import React from 'react';
import { shallow } from 'enzyme';
// eslint-disable-next-line no-unused-vars
import LandingPage from './LandingPageV2'

describe('Landing Page Component', () => {
  it('should render-without errors', () => {
    const component = shallow(<LandingPage />);
    console.log(component.debug());
    const wrapper = component.find('.LandingPage');
    // expect(wrapper.length).toBe(1)
    console.log(wrapper.length)
    expect(component).toMatchSnapshot();
    // expect(1).toBe(1);
  }) 
})
