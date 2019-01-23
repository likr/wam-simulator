export const wam = (size, d) => {
  const a0 = 3.2e-8
  const a1 = 3.0e-5
  const b0 = 3.0e-3
  const b1 = 1.4e-1
  const Ft = new Array(size)
  Ft[0] = a0 / b0
  for (let i = 1; i < size; ++i) {
    const dFt = (a0 + a1 * d[i]) - (b0 + b1 * d[i]) * Ft[i - 1]
    Ft[i] = Ft[i - 1] + dFt
  }
  return Ft
}
