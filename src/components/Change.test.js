import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Change from './Change';
import { getChangeInCents, getChangeInDollar } from '../lib/change';

test('1 dollar getChangeInDollar', () => {
  const test = {
    onedollar: {
      name: "1 dollar bill",
      total: 1,
    }
  }
  expect(getChangeInDollar(1)).toEqual(test);
});

test('99 cent getChangeInCents', () => {

  const test = {
    dime: { name: "dime", total: 2 },
    penny: { name: "penny", total: 4 },
    quarter: { name: "quarter", total: 3 }
  }

  expect(getChangeInCents(99)).toEqual(test);
});

test('2', () => {
  const wrapper = shallow(<Change />);
  wrapper.find('input').simulate('change', { target :{ value: "124.67" }});
  console.log({test:wrapper.find('.wrap-input').text()});
  expect(wrapper.find('.wrap-input').text()).toEqual("Your change is 1 100 dollar bill, 1 20 dollar bill, 4 1 dollar bills, 2 quarters, 1 dime, 1 nickel, and 2 pennies.");

});
