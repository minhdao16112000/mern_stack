import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './style.scss';

const ExportPDF = () => {
    // html2canvas(document.querySelector("#capture")).then(canvas => {
    //     document.body.appendChild(canvas);  // if you want see your screenshot in body.
    //     const imgData = canvas.toDataURL('image/png');
    //     const pdf = new jsPDF();
    //     pdf.addImage(imgData, 'PNG', 0, 0);
    //     pdf.save("download.pdf");
    // });
    const printDocument = () => {
        const input = document.getElementById('divToPrint');
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF();
            pdf.addImage(imgData, 'JPEG', 0, 0);
            // pdf.output('dataurlnewwindow');
            pdf.save('download.pdf');
        });
    };
    return (
        <div>
            <div id="divToPrint" className="mt4">
                <div>Note: Here the dimensions of div are same as A4</div>
                <div>You Can add any component here</div>
            </div>
            <button
                type="submit"
                className="main-btn success-btn btn-hover"
                onClick={() => printDocument()}
            >
                <i className="fas fa-save"></i>
                &ensp;Export PDF
            </button>
        </div>
    );
};

export default ExportPDF;
