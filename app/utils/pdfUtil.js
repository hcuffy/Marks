import React from 'react'
import JsPDF from 'jspdf'

const _ = require('lodash')

const downloadPDF = (itemToPDF, nameOfChart, saveAs) => {
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

export const PDFbutton = (styling, saveText, chartTitle) => (
	<button className={styling} type="button" onClick={() => downloadPDF('canvas', chartTitle, 'chart')}>
		<i className="fas fa-file-pdf fa-2x" /> <br />
		{saveText}
	</button>
)
