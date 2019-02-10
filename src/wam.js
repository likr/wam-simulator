export const wam = (d, params) => {
  const { F0, a0, a1, b0, b1 } = params
  const Ft = new Array(d.length)
  Ft[0] = F0
  for (let i = 1; i < d.length; ++i) {
    const dFt = (a0 + a1 * d[i]) - (b0 + b1 * d[i]) * Ft[i - 1]
    Ft[i] = Ft[i - 1] + dFt
  }
  return Ft
}
