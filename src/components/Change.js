import React, { Component } from 'react';
import { isEmpty } from 'lodash';
import { matcherErrorMessage } from 'jest-matcher-utils';

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

      // console.log({ amounts })
      this.changeInDollar(amounts[0]);
      if (amounts.length === 2 && amounts[amounts.length - 1] !== "") {
        this.changeInCents(amounts[amounts.length - 1]);
      }

      this.setState({
        change: amount,
        errorMessage: "",
      });
    }
  }

  changeInDollar = (dollars) => {
    let total = parseInt(dollars);

    console.log("changeInDollar", { total })

    let hundredDollar = 0;
    let fiftyDollar = 0;
    let twentyDollar = 0;
    let tenDollar = 0;
    let fiveDollar = 0;
    let dollar = {};

    if (total >= 100) {
      hundredDollar = parseInt(total / 100);
      total = total - (100 * hundredDollar);
      dollar = {
        ...dollar,
        hundredDollar: {
          name: "100 dollar bill",
          total: hundredDollar,
        }
      }
    }
    if (total >= 50) {
      fiftyDollar = parseInt(total / 50);
      total = total - (50 * fiftyDollar);
      dollar = {
        ...dollar,
        fiftyDollar: {
          name: "50 dollar bill",
          total: fiftyDollar,
        }
      }
    }
    if (total >= 20) {
      twentyDollar = parseInt(total / 20);
      total = total - (20 * twentyDollar);
      dollar = {
        ...dollar,
        twentyDollar: {
          name: "20 dollar bill",
          total: twentyDollar,
        },
      }
    }
    if (total >= 10) {
      tenDollar = parseInt(total / 10);
      total = total - (10 * tenDollar);
      dollar = {
        ...dollar,
        tenDollar: {
          name: "10 dollar bill",
          total: tenDollar,
        },
      }
    }
    if (total >= 5) {
      fiveDollar = parseInt(total / 5);
      total = total - (5 * fiveDollar);
      dollar = {
        ...dollar,
        fiveDollar: {
          name: "5 dollar bill",
          total: fiveDollar,
        },
      }
    }

    if (total > 0) {
      dollar = {
        ...dollar,
        onedollar: {
          name: "1 dollar bill",
          total,
        }
      }
    }
    this.setState({
      dollar
    });
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

    // Your change is 1 1dollar bill

    // Your change is 3 quarters, 2 dimes, and 4 pennies

    // Your change is 1 100 dollar bill, 1 20 dollar bill, 4 1 dollar bills, 2 quarters, 1 dime, 1 nickel, and 2 pennies.

  }

  changeInCents = (cents) => {
    let total = parseInt(cents);
    let quarter = 0; // 0.25 cents
    let dime = 0; // 0.10 cents
    let nickel = 0; // 0.05 cents
    // penney 0.01 cents
    let cent = {};
    console.log("---------------------------")

    console.log("changeInCents", { total })
    if (total >= 25) {
      quarter = parseInt(total / 25);
      total = total - (25 * quarter);
      cent = {
        ...cent,
        quarter: {
          name: "quarter",
          total: quarter,
        },
      }
    }

    if (total >= 10) {
      dime = parseInt(total / 10);
      total = total - (10 * dime);
      cent = {
        ...cent,
        dime: {
          name: "dime",
          total: dime,
        },
      }
    }

    if (total >= 5) {
      nickel = parseInt(total / 5);
      total = total - (5 * nickel);
      cent = {
        ...cent,
        nickel: {
          name: "nickel",
          total: nickel,
        },
      }
    }

    if (total > 0) {
      cent = {
        ...cent,
        penny: {
          name: "penny",
          total: parseInt(total / 1),
        },
      }
    }

    this.setState({
      cent
    });
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
        {errorMessage}

        {(!isEmpty(dollar) || !isEmpty(cent)) && (<div>
          Your change is {this.showTextDollar()} {this.showTextCent()}.

        </div>)}
      </div>
    )
  }
}

export default Change;