export const wam = (d, params, rk = true) => {
  const a0 = params.a0 * 1e-8
  const a1 = params.a1 * 1e-5
  const b0 = params.b0 * 1e-3
  const b1 = params.b1 * 1e-1
  const F0 = params.F0 * 1e-5
  const Ft = new Array(d.length)
  Ft[0] = F0
  for (let i = 1; i < d.length; ++i) {
    if (rk) {
      const h = d[i] + d[i - 1] / 2
      const k1 = (a0 + a1 * d[i - 1]) - (b0 + b1 * d[i - 1]) * Ft[i - 1]
      const k2 = (a0 + a1 * h) - (b0 + b1 * h) * (Ft[i - 1] + k1 / 2)
      const k3 = (a0 + a1 * h) - (b0 + b1 * h) * (Ft[i - 1] + k2 / 2)
      const k4 = (a0 + a1 * d[i]) - (b0 + b1 * d[i]) * (Ft[i - 1] + k3)
      Ft[i] = Ft[i - 1] + (k1 + 2 * k2 + 2 * k3 + k4) / 6
    } else {
      Ft[i] = Ft[i - 1] + (a0 + a1 * d[i]) - (b0 + b1 * d[i]) * Ft[i - 1]
    }
  }
  return Ft
}
