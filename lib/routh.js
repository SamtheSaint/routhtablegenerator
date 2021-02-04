function determinant(a, b, c, d) {
  return a * d - b * c;
}

function rightPad(arr, length, char = 0) {
  while (arr.length < length) arr.push(char);
}

export function generateRouthTable(coefficients) {
  let N = coefficients.length;
  let M = Number(Number(N / 2).toPrecision(1));

  const routh = [];
  routh.push(coefficients.filter((v, i) => i % 2 === 0));
  routh.push(coefficients.filter((v, i) => i % 2 === 1));

  rightPad(routh[0], M + 1, 0);
  rightPad(routh[1], M + 1, 0);

  for (let i = 2; i < N + 1; i++) {
    let denominator = routh[i - 1][0];
    if (denominator === 0) break;
    let sub = [];
    rightPad(sub, M + 1, 0);
    for (let j = 0; j < M; j++) {
      sub[j] = Number(
        determinant(
          routh[i - 2][0],
          routh[i - 2][j + 1],
          routh[i - 1][0],
          routh[i - 1][j + 1]
        ) *
          (-1 / denominator)
      ).toFixed(3);
    }
    routh.push(sub);
  }

  return routh;
}
