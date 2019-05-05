import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import {getChangeInCents, getChangeInDollar} from '../lib/change';

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

  showTextDollar = () => {
    const { dollar } = this.state;
    let messages = [];
    let text = "";
    console.log("dollar", dollar)
    for (let key in dollar) {
      let t = dollar[key].total + " " + dollar[key].name;
      messages.push(t);
    }
    if (messages.length === 1) {
      return messages[messages.length - 1];
    }
    for (let i = 0; i < messages.length; i++) {
      let comma = (i === 0) ? " " : ", ";
      text = text + comma + messages[i];
    }

    return text;
  }

  showTextCent = () => {
    const { cent, dollar } = this.state;
    let text = "";
    let messages = [];
    console.log("cent", cent)
    for (let key in cent) {
      let name = cent[key].name;
      if (cent[key].total > 1) {
        if (key === 'penny') {
          name = "pennies";
        } else {
          name = name + "s";
        }
      }

      messages.push(cent[key].total + " " + name);
    }

    if (messages.lenght === 1) {
      return messages[messages.lenght - 1];
    }

    for (let i = 0; i < messages.length; i++) {
      const comma = (i > 0) ? ", " : " ";
      text = text + comma + messages[i];
    }

    const comma = (!isEmpty(dollar) && !isEmpty(cent)) ? ", " : "";

    return comma + text;
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
        Enter change: <input type='text' value={change} placeholder="0.00" onChange={this.handleInput} />

        {(!isEmpty(dollar) || !isEmpty(cent)) && (<div>
          Your change is {this.showTextDollar()} {this.showTextCent()}.
        </div>)}

        <div>
          {errorMessage}
        </div>
      </div>
    )
  }
}

export default Change;