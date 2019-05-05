import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { getChangeInCents, getChangeInDollar } from '../lib/change';

class Change extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      dollar: {},
      cent: {},
      change: "",
    }
  }

  clearData = () => {
    this.setState({
      dollar: {},
      cent: {},
    });
  }

  handleInput = (e) => {
    const amount = e.target.value;
    let cent = {};
    let dollar = {};
    const regex = new RegExp("^\\d*(\\.\\d{0,2})?$");
    if (amount === "") {
      this.clearData();
      this.setState({
        change: "",
      });
      return;
    }

    if (regex.test(amount)) {
      const amounts = amount.split('.');
      dollar = getChangeInDollar(amounts[0]);
      if (amounts.length === 2 && amounts[amounts.length - 1] !== "") {
        cent = getChangeInCents(amounts[amounts.length - 1]);
      }

      this.setState({
        change: amount,
        errorMessage: "",
        cent,
        dollar
      });
    }
  }

  showText = () => {
    const { dollar, cent } = this.state;
    const currency = {
      ...dollar,
      ...cent
    }
    let messages = [];
    let text = "";
    for (let key in currency) {
      let name = currency[key].name;

      if (currency[key].total > 1) {

        if (key === 'penny') {
          name = "pennies";
        } else {
          name = name + "s";
        }
      }

      let t = currency[key].total + " " + name;
      messages.push(t);
    }
    if (messages.length === 1) {
      return messages[messages.length - 1];
    }
    for (let i = 0; i < messages.length; i++) {
      const comma = (i === 0) ? " " : ", ";
      const and = (i === messages.length - 1) ? "and " : "";
      text = text + comma + and + messages[i];
    }

    return text;
  }

  render() {
    const {
      change,
      errorMessage,
      dollar,
      cent,
    } = this.state;
    return (
      <div>
        Enter change: <input ref="momo" name="momo" type='text' value={change} placeholder="0.00" onChange={this.handleInput} />

        {(!isEmpty(dollar) || !isEmpty(cent)) && (<div className="wrap-input">
          Your change is{this.showText()}.
        </div>)}
        <div>
          {errorMessage}
        </div>
      </div>
    )
  }
}

export default Change;