/**
 * ExcellentExport 3.2.1
 * A client side Javascript export to Excel.
 *
 * @author: Jordi Burgos (jordiburgos@gmail.com)
 * @url: https://github.com/jmaister/excellentexport
 *
 */

import {utils, write} from 'xlsx';
const XLSX = {
    utils,
    write
};

const ExcellentExport = function() {

    const b64toBlob = function (b64Data, contentType, sliceSize) {
        // function taken from http://stackoverflow.com/a/16245768/2591950
        // author Jeremy Banks http://stackoverflow.com/users/1114/jeremy-banks
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        const byteCharacters = window.atob(b64Data);
        const byteArrays = [];

        let offset;
        for (offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);

            const byteNumbers = new Array(slice.length);
            let i;
            for (i = 0; i < slice.length; i = i + 1) {
                byteNumbers[i] = slice.charCodeAt(i);
            }

            const byteArray = new window.Uint8Array(byteNumbers);

            byteArrays.push(byteArray);
        }

        return new window.Blob(byteArrays, {
            type: contentType
        });
    };

    const version = "3.3.0";
    const template = {excel: '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'};
    let csvDelimiter = ",";
    let csvNewLine = "\r\n";
    /**
     * Convert a string to Base64.
     * 
     * @param {string} s
     */
    const base64 = function(s) {
        return window.btoa(unescape(encodeURIComponent(s)));
    };

    const format = function(s, c) {
        return s.replace(new RegExp("{(\\w+)}", "g"), function(m, p) {
            return c[p];
        });
    };
    
    /**
     * Get element by ID.
     * @param {*} element 
     */
    const get = function(element) {
        if (!element.nodeType) {
            return document.getElementById(element);
        }
        return element;
    };

    /**
     * Encode a value for CSV.
     * @param {*} value 
     */
    const fixCSVField = function(value) {
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

    const tableToArray = function(table) {
        var tableInfo = Array.prototype.map.call(table.querySelectorAll('tr'), function(tr) {
            return Array.prototype.map.call(tr.querySelectorAll('th,td'), function(td) {
                return td.innerHTML;
            });
        });
        return tableInfo;
    };

    const tableToCSV = function(table) {
        let data = "";
        let i, j, row, col;
        for (i = 0; i < table.rows.length; i=i+1) {
            row = table.rows[i];
            for (j = 0; j < row.cells.length; j=j+1) {
                col = row.cells[j];
                data = data + (j ? csvDelimiter : '') + fixCSVField(col.textContent.trim());
            }
            data = data + csvNewLine;
        }
        return data;
    };

    const createDownloadLink = function(anchor, base64data, exporttype, filename) {
        if (window.navigator.msSaveBlob) {
            const blob = b64toBlob(base64data, exporttype);
            window.navigator.msSaveBlob(blob, filename);
            return false;
        } else if(window.URL.createObjectURL) {
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
    const s2ab = function (s) {
        if (typeof ArrayBuffer !== 'undefined') {
            let buf = new ArrayBuffer(s.length);
            let view = new Uint8Array(buf);
            for (let i=0; i !== s.length; ++i) {
                view[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        } else {
            let buf = new Array(s.length);
            for (let i=0; i !== s.length; ++i) {
                buf[i] = s.charCodeAt(i) & 0xFF;
            }
            return buf;
        }
    };

    const removeColumn = function(arr2d, colIndex) {
        for (var i = 0; i < arr2d.length; i++) {
            var row = arr2d[i];
            row.splice(colIndex, 1);
        }
    };

    /*
     ExcellentExport.convert(options, sheets);

     Options:
     {
        anchor: String/Element,
        format: 'xlsx'/'xls'/'csv',
        filename: String
     }

     Sheet element configuration:
     {
        name: 'Sheet 1', // Sheet name
        from: {
            table: String/Element, // Table ID or table element
            array: [...], // Array with data
            arrayHasHeader: true, // Array first row is the header
            removeColumns: [...], // Array of column indexes (from 0)
            filterRowFn: function(row) {return true}
        },
        ...
     }
     */
    const convert = function(options, sheets) {
        let workbook = {
            SheetNames: [],
            Sheets: {}
        };

        if (!options.format) {
            throw new Error("'format' option must be defined");
        }
        if (options.format === 'csv' && sheets.length > 1) {
            throw new Error("'csv' format only supports one sheet");
        }

        sheets.forEach((sheetConf, index) => {
            const name = sheetConf.name;
            if (!name) {
                throw new Error('Sheet ' + index + ' must have the property "name".');
            }

            // Select data source
            let worksheet = null;
            let dataArray;
            if (sheetConf.from && sheetConf.from.table) {
                dataArray = tableToArray(get(sheetConf.from.table));
            } else if(sheetConf.from && sheetConf.from.array) {
                dataArray = sheetConf.from.array
            } else {
                throw new Error('No data for sheet: [' + name + ']');
            }

            // Filter data
            console.log("conf", sheetConf);
            if (sheetConf.filterRowFn) {
                if (sheetConf.filterRowFn instanceof Function) {
                    dataArray = dataArray.filter(sheetConf.filterRowFn);
                } else {
                    throw new Error('Parameter "filterRowFn" must be a function.');
                }
            }
            if (sheetConf.removeColumns) {
                const toRemove = sheetConf.removeColumns.sort().reverse();
                toRemove.forEach(index => {
                    removeColumn(dataArray, index);
                });
            }

            // Create sheet
            workbook.SheetNames.push(name);
            worksheet = XLSX.utils.aoa_to_sheet(dataArray, {sheet: name});
            workbook.Sheets[name] = worksheet;
        });

        const wbOut = XLSX.write(workbook, {bookType: options.format, bookSST:true, type: 'binary'});
        try {
            const blob = new Blob([s2ab(wbOut)], {type:"application/octet-stream"});
            const anchor = get(options.anchor);
            anchor.href = window.URL.createObjectURL(blob);
            anchor.download = (options.filename || 'download') + '.' + options.format;

        } catch(e) {
            throw new Error('Error converting to '+ options.format + '. ' + e);
        }
        return wbOut;

    };

    return {
        version: function() {
            return version;
        },
        excel: function(anchor, table, name) {
            table = get(table);
            const ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
            const b64 = base64(format(template.excel, ctx));
            return createDownloadLink(anchor, b64, 'application/vnd.ms-excel','export.xls');
        },
        csv: function(anchor, table, delimiter, newLine) {
            if (delimiter !== undefined && delimiter) {
                csvDelimiter = delimiter;
            }
            if (newLine !== undefined && newLine) {
                csvNewLine = newLine;
            }

            table = get(table);
            const csvData = "\uFEFF" + tableToCSV(table);
            const b64 = base64(csvData);
            return createDownloadLink(anchor,b64,'application/csv','export.csv');
        },
        convert: function(options, sheets) {
            return convert(options, sheets);
        }
    };
}();

export default ExcellentExport;
