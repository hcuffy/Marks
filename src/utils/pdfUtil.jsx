import React from 'react';
import _ from 'lodash';
import {jsPDF} from 'jspdf';
import {Button, Icon, Intent} from '@blueprintjs/core';
import css from './util.css';

const pdfDocument = new jsPDF('landscape');

function downloadPDF(itemToPDF, nameOfChart, saveAs) {
    // eslint-disable-next-line no-undef
    const canvas = document.querySelector(itemToPDF);

    if (_.isNull(canvas)) {
        return;
    }

    const canvasImg = canvas.toDataURL('image/png', 1.0);
    pdfDocument.setFontSize(15);
    pdfDocument.text(15, 15, nameOfChart);
    pdfDocument.addImage(canvasImg, 'png', 10, 10, 280, 150);
    pdfDocument.save(`${saveAs}.pdf`);
}

export function PDFbutton(saveText, chartTitle) {
    return (
        <Button intent={Intent.PRIMARY} className={css.pdf_btn} onClick={() => downloadPDF('canvas', chartTitle, 'chart')}>
            { <Icon icon='download' iconSize={30} className={css.button_icon} />}
            {saveText}
        </Button>
    );
}
