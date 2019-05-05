const getChangeInCents = (cents) => {
  let total = parseInt(cents);
  let quarter = 0; // 0.25 cents
  let dime = 0; // 0.10 cents
  let nickel = 0; // 0.05 cents
  let cent = {};

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

  return cent;
}

const getChangeInDollar = (dollars) => {
  let total = parseInt(dollars);
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
  return dollar;
}

export {
  getChangeInCents,
  getChangeInDollar
}