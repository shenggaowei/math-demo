const symbol = ["Add", "Subtract", "Multiply", "Divide", "Negate", "Equal"];

export function separateFormula(expr = []) {
  const initData = { symbol: undefined, expression: [] };
  const ret = expr.reduce((info, current, index) => {
    if (current === "Equal") {
      info.symbol = expr[index + 1];
    }
  }, initData);

  return ret;
}
