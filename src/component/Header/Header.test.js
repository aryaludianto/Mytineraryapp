// eslint-disable-next-line no-unused-vars
import React from 'react';
import { shallow } from 'enzyme';
// import {describe, it, expect} from 'jest';
// eslint-disable-next-line no-unused-vars
import Header from './Header'
// import { exportAllDeclaration } from '@babel/types';

describe('Header Component', () => {
  it('should render-without errors', () => {
    const component = shallow(<Header />);
    // console.log(component.debug());
    const wrapper = component.find('.Header');
    expect(wrapper.length).toBe(1)
    // expect(1).toBe(1);
  }) 
})
