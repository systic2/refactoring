import { Statement } from "./create_statement.js";

export function statement(invoice, plays) {
  return renderPlainText(new Statement(invoice, plays));
}

export function htmlStatement(invoice, plays) {
  return renderHTML(new Statement(invoice, plays));
}

function renderHTML(statement) {
  let result = `<h1>청구 내역 (고객명: ${statement.customer})</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>play</th><th>석</th><th>cost</th></tr>";

  for (let perf of statement.performances) {
    result += `  <tr><td>${perf.play.name}</td><td>${perf.audience}</td>`;
    result += `<td>${usd(perf.amount / 100)}</td></tr>\n`;
  }
  result += "</table>\n";
  result += `<p>총액: <em>${usd(statement.totalAmount / 100)}</em></p>\n`;
  result += `<p>적립 포인트: <em>${statement.totalCredits}점</em></p>\n`;
  return result;
}

function usd(number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(number);
}

function renderPlainText(statement) {
  let result = `청구 내역 (고객명: ${statement.customer})\n`;

  for (let perf of statement.performances) {
    result += `  ${perf.play.name}: ${usd(perf.amount / 100)} (${
      perf.audience
    }석)\n`;
  }

  result += `총액: ${usd(statement.totalAmount / 100)}\n`;
  result += `적립 포인트: ${statement.totalCredits}점\n`;
  return result;
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
const result2 = htmlStatement(invoicesJSON[0], playsJSON);
let expected2 = `<h1>청구 내역 (고객명: BigCo)</h1>\n`;
expected2 += '<table>\n';
expected2 += `<tr><th>play</th><th>석</th><th>cost</th></tr>  <tr><td>Hamlet</td><td>55</td><td>$650.00</td></tr>\n`;
expected2 += `  <tr><td>As You Like It</td><td>35</td><td>$580.00</td></tr>\n`;
expected2 += `  <tr><td>Othello</td><td>40</td><td>$500.00</td></tr>\n`;
expected2 += '</table>\n';
expected2 += `<p>총액: <em>$1,730.00</em></p>\n`;
expected2 += `<p>적립 포인트: <em>47점</em></p>\n`;
console.log(result2);
console.log(result2 === expected2);
