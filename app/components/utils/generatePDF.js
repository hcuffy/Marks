import JsPDF from 'jspdf'

const _ = require('lodash')

export const downloadPDF = (itemToPDF, nameOfChart, saveAs) => {
	const canvas = document.querySelector(itemToPDF)
	if (_.isNull(canvas)) {
		return
	}
	const canvasImg = canvas.toDataURL('image/png', 1.0)
	const doc = new JsPDF('landscape')
	doc.setFontSize(15)
	doc.text(15, 15, nameOfChart)
	doc.addImage(canvasImg, 'png', 10, 10, 280, 150)
	doc.save(`${saveAs}.pdf`)
}
