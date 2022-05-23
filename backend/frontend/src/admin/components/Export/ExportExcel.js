import saveAs from 'file-saver';
import React from 'react';
const ExcelJS = require('exceljs');

const ExportExcel = (props) => {
    const exportData = () => {
        const myData = props.getData;
        if (!myData || myData.length === 0) {
            return;
        }
        const myFooter = props.getFooter;
        const myHeader = Object.keys(myData[0]);
        exportToExcel(
            myData,
            'Danh Sách Đơn Hàng',
            'Tháng 3',
            'Báo Cáo Hàng Tháng',
            myHeader,
            myFooter,
            [
                { width: 30 },
                { width: 30 },
                { width: 30 },
                { width: 30 },
                { width: 15 },
                { width: 15 },
                { width: 20 },
                { width: 20 },
                { width: 20 },
                { width: 20 },
            ]
        );
    };

    const exportToExcel = async (
        myData,
        fileName,
        sheetName,
        report,
        myHeader,
        myFooter,
        widths
    ) => {
        if (!myData || myData.length === 0) {
            console.error('Chưa có data');
            return;
        }
        const wb = new ExcelJS.Workbook();
        const ws = wb.addWorksheet(sheetName);
        const columns = myHeader?.length;
        const title = {
            border: true,
            // money: false,
            height: 100,
            font: { size: 30, bold: false, color: { argb: 'FFFFFF' } },
            alignment: { horizontal: 'center', vertical: 'middle' },
            fill: {
                type: 'pattern',
                pattern: 'solid', //darkVertical
                fgColor: {
                    argb: '006b3c',
                },
            },
        };

        const header = {
            border: true,
            // money: false,
            height: 70,
            font: { size: 15, bold: false, color: { argb: 'FFFFFF' } },
            alignment: { horizontal: 'center', vertical: 'middle' },
            fill: {
                type: 'pattern',
                pattern: 'solid', //darkVertical
                fgColor: {
                    argb: '007ba7',
                },
            },
        };

        const data = {
            border: true,
            // money: true,
            height: 0,
            font: { size: 12, bold: false, color: { argb: '000000' } },
            alignment: { horizontal: 'center', vertical: 'middle' },
            fill: null,
        };

        const footer = {
            border: true,
            // money: true,
            height: 70,
            font: { size: 15, bold: true, color: { argb: 'FFFFFF' } },
            alignment: null,
            fill: {
                type: 'pattern',
                pattern: 'solid', //darkVertical
                fgColor: {
                    argb: '0000FF',
                },
            },
        };
        if (widths && widths.length > 0) {
            ws.columns = widths;
        }
        let row = addRow(ws, [report], title);
        mergeCells(ws, row, 1, columns);

        addRow(ws, myHeader, header);
        myData.forEach((r) => {
            addRow(ws, Object.values(r), data);
        });
        row = addRow(ws, myFooter, footer);
        mergeCells(ws, row, 1, columns - 1);
        const buf = await wb.xlsx.writeBuffer();
        saveAs(new Blob([buf]), `${fileName}.xlsx`);
    };

    const addRow = (ws, data, section) => {
        const borderStyles = {
            top: { style: 'medium' },
            left: { style: 'medium' },
            bottom: { style: 'medium' },
            right: { style: 'medium' },
        };
        const row = ws.addRow(data);
        row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
            if (section?.border) {
                cell.border = borderStyles;
            }
            if (section?.money && typeof cell.value === 'number') {
                cell.alignment = { horizontal: 'right', vertical: 'middle' };
                cell.numFmt = '$#, ##0.00; [Red]-$#,##0.00';
            }
            if (section?.alignment) {
                cell.alignment = section.alignment;
            } else {
                cell.alignment = { vertical: 'middle' };
            }
            if (section?.font) {
                cell.font = section.font;
            }
            if (section?.fill) {
                cell.fill = section.fill;
            }
        });
        if (section?.height > 0) {
            row.height = section.height;
        }
        return row;
    };

    const mergeCells = (ws, row, from, to) => {
        ws.mergeCells(
            `${row.getCell(from)._address}:${row.getCell(to)._address}`
        );
    };

    return (
        <button
            type="submit"
            className="main-btn success-btn btn-hover"
            onClick={() => exportData()}
        >
            <i className="fas fa-save"></i>
            &ensp;Xuất file Excel
        </button>
    );
};

export default ExportExcel;
