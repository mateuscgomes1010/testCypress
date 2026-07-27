const { PDFParse } = require('pdf-parse')
const path = require('path')
const fs = require('fs')

const readPdf = (pathPdf) => {
  return new Promise((resolve) => {
    const pdfPath = path.resolve(pathPdf)
    const pdfData = fs.readFileSync(pdfPath)

    const parser = new PDFParse({ data: pdfData })

    parser.getText().then((result) => {
      resolve(result.text || result)
    })
  })
}

module.exports = {
  readPdf
}