export function statement(invoice, plays) {
  return renderPlainText(editData(invoice, plays));
}

function editData(invoice, plays) {
  const customer = invoice.customer;
  const states = [];
  invoice.performances.map(p => states.push({
    name: playFor(p).name,
    amountFor: usd(amountFor(p) / 100),
    audience: p.audience,
  }));
  const totalAmount = usd(calculatetotalAmount() / 100);
  const totalCredits = calculatetotalCredits();
  return {
    customer,
    states,
    totalAmount,
    totalCredits,
  }

  function playFor(performance) {
    return plays[performance.playID];
  }

  function creditsFor(performance) {
    let result = 0;
    result += Math.max(performance.audience - 30, 0);
    // 희극 관객 5명마다 추가 포인트를 제공한다.
    if ("comedy" === playFor(performance).type) {
      result += Math.floor(performance.audience / 5);
    }
    return result;
  }

  function amountFor(performance) {
    let result = 0;
    switch (playFor(performance).type) {
      case "tragedy": // 비극
        result = 40000;
        if (performance.audience > 30) {
          result += 1000 * (performance.audience - 30);
        }
        break;
      case "comedy": // 희극
        result = 30000;
        if (performance.audience > 20) {
          result += 10000 + 500 * (performance.audience - 20);
        }
        result += 300 * performance.audience;
        break;
      default:
        throw new Error(`알 수 없는 장르: ${playFor(performance).type}`);
    }
    return result;
  }

  function calculatetotalAmount() {
    return invoice.performances.reduce((sum, p) => (sum += amountFor(p)), 0);
  }

  function calculatetotalCredits() {
    return invoice.performances.reduce((sum, p) => (sum += creditsFor(p)), 0);
  }
}

function renderPlainText({customer, states, totalAmount, totalCredits}) {
  let result = `청구 내역 (고객명: ${customer})\n`;

  for (let state of states) {
    result += `  ${state.name}: ${state.amountFor} (${state.audience}석)\n`;
  }

  result += `총액: ${totalAmount}\n`;
  result += `적립 포인트: ${totalCredits}점\n`;
  return result;

  
}

function usd(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number);
}
// 사용예:
const playsJSON = {
  hamlet: { name: "Hamlet", type: "tragedy" },
  "as-like": { name: "As You Like It", type: "comedy" },
  othello: { name: "Othello", type: "tragedy" },
};

const invoicesJSON = [
  {
    customer: "BigCo",
    performances: [
      {
        playID: "hamlet",
        audience: 55,
      },
      {
        playID: "as-like",
        audience: 35,
      },
      {
        playID: "othello",
        audience: 40,
      },
    ],
  },
];

const result = statement(invoicesJSON[0], playsJSON);
const expected =
  "청구 내역 (고객명: BigCo)\n" +
  "  Hamlet: $650.00 (55석)\n" +
  "  As You Like It: $580.00 (35석)\n" +
  "  Othello: $500.00 (40석)\n" +
  "총액: $1,730.00\n" +
  "적립 포인트: 47점\n";
console.log(result);
console.log(result === expected);
