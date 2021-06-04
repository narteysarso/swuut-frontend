
const base64 = (s) => {
    return window.btoa(unescape(encodeURIComponent(s)));
}

const format = (s, c) => {
    return s.replace(/{(\w+)}/g, (m, p) => c[p]);
}

function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(',');
    var _arr = arr[1].substring(0, arr[1].length - 2);
    var mime = arr[0].match(/:(.*?);/)[1], bstr = atob(_arr), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime, })
}


 const exportToExcel = (table, filename, sheetname, filetype = "xls") => {
    if (!document) {
        if (process.env.NODE_ENV !== 'production') {
            console.error('Failed to access document object');
        }

        return null;
    }

    if (table.nodeType !== 1 || table.nodeName !== 'TABLE') {
        if (process.env.NODE_ENV !== 'production') {
            console.error('Provided table property is not html table element');
        }

        return null;
    }

    table = table.outerHTML
    
    filetype = (filetype === "xlsx") ? filetype : 'xls';
    const filepath = `${filename}.${filetype}`;


    const uri = 'data:application/vnd.ms-excel;base64,';
    const template =
        '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-mic' +
        'rosoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta cha' +
        'rset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:Exce' +
        'lWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>' +
        '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></' +
        'xml><![endif]--></head><body>{table}</body></html>';

    const context = {
        worksheet: sheetname || 'Worksheet',
        table,
    };

    // If IE11
    if (window.navigator.msSaveOrOpenBlob) {
        const fileData = [
            `${'<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta charset="UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body>'}${table}</body></html>`,
        ];
        const blobObject = new Blob(fileData);
        window.navigator.msSaveOrOpenBlob(blobObject, filepath);

        return true;
    }

    const element = window.document.createElement('a');

    let base64Uri = uri + base64(format(template, context));

    element.href = URL.createObjectURL(dataURLtoBlob(base64Uri));

    element.download = filepath;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    return true;
}

export default exportToExcel