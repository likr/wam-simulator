import { SVGConverter } from 'svg-dataurl'

const exportCSV = (head, rows, name) => {
  const content = rows.join('\n')
  const data = window.btoa(
    encodeURIComponent(`${head}\n${content}`).replace(
      /%([0-9A-F]{2})/g,
      (match, p1) => String.fromCharCode(`0x${p1}`)
    )
  )
  const dataUrl = `data:text/csv;base64,${data}`
  const a = document.getElementById('download')
  a.href = dataUrl
  a.download = `${name}.csv`
  a.click()
}

export const exportTimeCSV = (lines, name) => {
  if (lines.length === 0) {
    return
  }
  const ts = lines[0].line.map((row) => row[0])
  const dHead = lines.map((_, i) => `D_${i + 1}(t)`).join(',')
  const fHead = lines.map((_, i) => `F_${i + 1}(t)`).join(',')
  const head = `t,${dHead},${fHead}`
  const rows = ts.map((t, i) => {
    const dValues = lines.map(({ d }) => d[t]).join(',')
    const fValues = lines.map(({ line }) => line[t][1]).join(',')
    return `${t},${dValues},${fValues}`
  })
  exportCSV(head, rows, name)
}

export const exportDoseCSV = (lines, name) => {
  if (lines.length === 0) {
    return
  }
  const ds = lines[0].lineTotal.map((row) => row[0])
  const dHead = lines.map((_, i) => `F_${i + 1}(D)`).join(',')
  const head = `D,${dHead}`
  const rows = ds.map((d, i) => {
    const dValues = lines.map(({ lineTotal }) => lineTotal[i][1]).join(',')
    return `${d},${dValues}`
  })
  exportCSV(head, rows, name)
}

export const exportImage = (format, ref, name) => {
  SVGConverter.loadFromElement(ref.current).then((converter) => {
    const dataUrl =
      format === 'svg' ? converter.svgDataURL() : converter.pngDataURL()
    const a = document.getElementById('download')
    a.href = dataUrl
    a.download = `${name}.${format}`
    a.click()
  })
}
