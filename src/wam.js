export const wam = (d, params) => {
  const a0 = params.a0 * 1e-8
  const a1 = params.a1 * 1e-5
  const b0 = params.b0 * 1e-3
  const b1 = params.b1 * 1e-1
  const F0 = params.F0 * 1e-5
  const Ft = new Array(d.length)
  Ft[0] = F0
  for (let i = 1; i < d.length; ++i) {
    const dFt = (a0 + a1 * d[i]) - (b0 + b1 * d[i]) * Ft[i - 1]
    Ft[i] = Ft[i - 1] + dFt
  }
  return Ft
}
