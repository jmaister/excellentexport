
export const b64toBlob = function (b64Data:string, contentType:string, sliceSize?:number): Blob {
    // function taken from http://stackoverflow.com/a/16245768/2591950
    // author Jeremy Banks http://stackoverflow.com/users/1114/jeremy-banks
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
        const slice = byteCharacters.slice(offset, offset + sliceSize);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i = i + 1) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);

        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {
        type: contentType
    });
};

export const templates = {excel: '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'};

/**
 * Convert a string to Base64.
 */
export const base64 = function(s:string) : string {
    return btoa(unescape(encodeURIComponent(s)));
};

export const format = function(s:string, context:any) : string {
    return s.replace(new RegExp("{(\\w+)}", "g"), function(m, p) {
        return context[p];
    });
};

/**
 * Get element by ID.
 * @param {*} element 
 */
 export const getTable = function(element :(HTMLTableElement|string)) : HTMLTableElement {
    if (typeof element === 'string') {
        return document.getElementById(element) as HTMLTableElement;
    }
    return element;
};

/**
 * Get element by ID.
 * @param {*} element 
 */
export const getAnchor = function(element :(HTMLAnchorElement|string)) : HTMLAnchorElement {
    if (typeof element === 'string') {
        return document.getElementById(element) as HTMLAnchorElement;
    }
    return element;
};

/**
 * Encode a value for CSV.
 * @param {*} value 
 */
 const fixCSVField = function(value:string, csvDelimiter:string) {
    let fixedValue = value;
    const addQuotes = (value.indexOf(csvDelimiter) !== -1) || (value.indexOf('\r') !== -1) || (value.indexOf('\n') !== -1);
    const replaceDoubleQuotes = (value.indexOf('"') !== -1);

    if (replaceDoubleQuotes) {
        fixedValue = fixedValue.replace(/"/g, '""');
    }
    if (addQuotes || replaceDoubleQuotes) {
        fixedValue = '"' + fixedValue + '"';
    }

    return fixedValue;
};

export const tableToArray = function(table:HTMLTableElement) : any[][] {
    let tableInfo = Array.prototype.map.call(table.querySelectorAll('tr'), function(tr) {
        return Array.prototype.map.call(tr.querySelectorAll('th,td'), function(td) {
            return td.innerHTML;
        });
    });
    return tableInfo;
};

export const tableToCSV = function(table:HTMLTableElement, csvDelimiter:string = ',', csvNewLine:string = '\n') : string {
    let data = "";
    for (let i = 0; i < table.rows.length; i=i+1) {
        const row = table.rows[i];
        for (let j = 0; j < row.cells.length; j=j+1) {
            const col = row.cells[j];
            data = data + (j ? csvDelimiter : '') + fixCSVField(col.textContent.trim(), csvDelimiter);
        }
        data = data + csvNewLine;
    }
    return data;
};

export const createDownloadLink = function(anchor:HTMLAnchorElement, base64data:string, exporttype:string, filename:string) : boolean {
    if (window.navigator.msSaveBlob) {
        const blob = b64toBlob(base64data, exporttype);
        window.navigator.msSaveBlob(blob, filename);
        return false;
    } else if (window.URL.createObjectURL) {
        const blob = b64toBlob(base64data, exporttype);
        anchor.href = window.URL.createObjectURL(blob);
    } else {
        anchor.download = filename;
        anchor.href = "data:" + exporttype + ";base64," + base64data;
    }

    // Return true to allow the link to work
    return true;
};

// String to ArrayBuffer
export const string2ArrayBuffer = function (s:string): ArrayBuffer {
    let buf = new ArrayBuffer(s.length);
    let view = new Uint8Array(buf);
    for (let i=0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
    }
    return buf;
};

export const removeColumns = function(dataArray:any[][], columnIndexes:number[]) {
    const uniqueIndexes = [...new Set(columnIndexes)].sort().reverse();
    uniqueIndexes.forEach(function(columnIndex) {
        dataArray.forEach(function(row) {
            row.splice(columnIndex, 1);
        });
    });
};
