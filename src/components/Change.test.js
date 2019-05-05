import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Change from './Change';
import {getChangeInCents, getChangeInDollar} from '../lib/change';
import sinon from 'sinon';

test('year 1900 getTotalDateByYear', () => {
  expect(getChangeInCents(1900)).toBe(365);
});

describe('<MyComponent />', () => {
  it('simulates click events', () => {
    const onButtonClick = sinon.spy();
    const wrapper = shallow(<Change onButtonClick={onButtonClick} />);
    wrapper.find('button').simulate('click');
    expect(onButtonClick).to.have.property('callCount', 1);
  });
});

describe('<Change />', () => {
  it('should render without throwing an error', () => {
    const component = shallow(<Change />);
    expect(component.contains(<h1>Hello React Change</h1>)).toBe(true);
  });
  it('should mount in a full DOM', () => {
    const component = mount(<Change />);
    expect(component.find('.Change').length).toBe(1);
  });
  it('should render to static HTML', () => {
    const component = render(<Change />);
    expect(component.text()).toEqual('Hello React Change');
  });
});