import React, { Component } from 'react';

class Change extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      quarter: 0,
      dime: 0,
      nickel: 0,
      penny: 0,
      hundredDollar: 0,
      fiftyDollar: 0,
      twentyDollar: 0,
      tenDollar: 0,
      fiveDollar: 0,
      dollar: 0,
      change: "",
    }
  }

  changeInCents = (cents) => {
    let total = parseInt(cents);
    let quarter = 0; // 0.25 cents
    let dime = 0; // 0.10 cents
    let nickel = 0; // 0.05 cents
    // penney 0.01 cents
    console.log("---------------------------")

    console.log("changeInCents", {total})
    if (total >= 25) {
      quarter = parseInt(total / 25);
      total = total - (25 * quarter);
    }

    if (total >= 10) {
      dime = parseInt(total / 10);
      total = total - (10 * dime);
    }

    if (total >= 5) {
      nickel = parseInt(total / 5);
      total = total - (5 * nickel);
    }

    this.setState({
      quarter,
      dime,
      nickel,
      penny: parseInt(total/1)
    })
  }

  clearData = () => {
    this.setState({
      quarter: 0,
      dime: 0,
      nickel: 0,
      penny: 0,
      hundredDollar: 0,
      fiftyDollar: 0,
      twentyDollar: 0,
      tenDollar: 0,
      fiveDollar: 0,
      dollar: 0,
    });
  }

  changeInDollar = (dollars) => {
    // this.clearData();

    let total = parseInt(dollars);
    // if(total === NaN) {
    //   return;
    // }
    console.log("changeInDollar", {total})

    let hundredDollar = 0;
    let fiftyDollar = 0;
    let twentyDollar = 0;
    let tenDollar = 0;
    let fiveDollar = 0;

    if (total >= 100) {
      hundredDollar = parseInt(total / 100);
      total = total - (100 * hundredDollar);
    }
    if (total >= 50) {
      fiftyDollar = parseInt(total / 50);
      total = total - (50 * fiftyDollar);
    }
    if (total >= 20) {
      twentyDollar = parseInt(total / 20);
      total = total - (20 * twentyDollar);
    }
    if (total >= 10) {
      tenDollar = parseInt(total / 10);
      total = total - (10 * tenDollar);
    }
    if (total >= 5) {
      fiveDollar = parseInt(total / 5);
      total = total - (5 * fiveDollar);
    }
    this.setState({
      hundredDollar,
      fiftyDollar,
      twentyDollar,
      tenDollar,
      fiveDollar,
      dollar: total
    });
  }

  handleInput = (e) => {
    const amount = e.target.value;
    const regex = new RegExp("^\\d*(\\.\\d{0,2})?$");
    if(amount === "") {
      this.clearData();
      this.setState({
        change: "",
      });
      return;
    }

    if (regex.test(amount)) {
      const amounts = amount.split('.');

      console.log({amounts})
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

  render() {
    const { 
      quarter, 
      dime, 
      nickel, 
      penny, 
      errorMessage, 
      hundredDollar,
      fiftyDollar,
      twentyDollar,
      tenDollar,
      fiveDollar,
      dollar,
      change,
    } = this.state;
    return (
      <div>
        Enter change: <input type='text' value={change} placeholder="0.00"  onChange={this.handleInput} />
        {errorMessage}
        <div>hundredDollar {hundredDollar}</div>
        <div>fiftyDollar {fiftyDollar}</div>
        <div>twentyDollar {twentyDollar}</div>
        <div>10 {tenDollar}</div>
        <div>5 {fiveDollar}</div>
        <div>1 {dollar}</div>

        <div>quarter {quarter}</div>
        <div>dime {dime}</div>
        <div>nickel {nickel}</div>
        <div>penny {penny}</div>
      </div>
    )
  }
}

export default Change;