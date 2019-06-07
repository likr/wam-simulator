import { SVGConverter } from 'svg-dataurl'

export const exportCSV = (rows, xHead, yHead, name) => {
  const head = `${xHead},${yHead}`
  const content = rows.join('\n')
  const data = window.btoa(encodeURIComponent(`${head}\n${content}`).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(`0x${p1}`)))
  const dataUrl = `data:text/csv;base64,${data}`
  const a = document.getElementById('download')
  a.href = dataUrl
  a.download = `${name}.csv`
  a.click()
}

export const exportImage = (format, ref, name) => {
  SVGConverter
    .loadFromElement(ref.current)
    .then((converter) => {
      const dataUrl = format === 'svg' ? converter.svgDataURL() : converter.pngDataURL()
      const a = document.getElementById('download')
      a.href = dataUrl
      a.download = `${name}.${format}`
      a.click()
    })
}
