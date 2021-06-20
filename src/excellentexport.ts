/**
 * ExcellentExport 3.7.0
 * A client side Javascript export to Excel.
 *
 * @author: Jordi Burgos (jordiburgos@gmail.com)
 * @url: https://github.com/jmaister/excellentexport
 *
 */

import * as XLSX from 'xlsx';

export interface ConvertOptions {
    anchor?: (string|HTMLAnchorElement),
    openAsDownload?: boolean,
    format: ('csv' | 'xls' | 'xlsx'),
    filename?: string,
}
export interface FromOptions {
    table?: (string|HTMLTableElement),
    array?: any[][],
}
export interface SheetOptions {
    name: string,
    from: FromOptions,
    removeColumns?: number[],
    filterRowFn?(row:any[]): boolean ,
    fixValue?(value:any, row:number, column:number): any,
    fixArray?(array:any[][]): any[][],
}


const ExcellentExport = function() {

    const b64toBlob = function (b64Data:string, contentType:string, sliceSize?:number): Blob {
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

    const version = "3.7.0";
    const template = {excel: '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta name=ProgId content=Excel.Sheet> <meta name=Generator content="Microsoft Excel 11"><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'};
    let csvDelimiter = ",";
    let csvNewLine = "\r\n";

    /**
     * Convert a string to Base64.
     */
    const base64 = function(s:string) : string {
        return btoa(unescape(encodeURIComponent(s)));
    };

    const format = function(s:string, context:any) : string {
        return s.replace(new RegExp("{(\\w+)}", "g"), function(m, p) {
            return context[p];
        });
    };
    
    /**
     * Get element by ID.
     * @param {*} element 
     */
    const getTable = function(element :(HTMLTableElement|string)) : HTMLTableElement {
        if (typeof element === 'string') {
            return document.getElementById(element) as HTMLTableElement;
        }
        return element;
    };

        /**
     * Get element by ID.
     * @param {*} element 
     */
    const getAnchor = function(element :(HTMLAnchorElement|string)) : HTMLAnchorElement {
        if (typeof element === 'string') {
            return document.getElementById(element) as HTMLAnchorElement;
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

    const tableToArray = function(table:HTMLTableElement) : any[][] {
        let tableInfo = Array.prototype.map.call(table.querySelectorAll('tr'), function(tr) {
            return Array.prototype.map.call(tr.querySelectorAll('th,td'), function(td) {
                return td.innerHTML;
            });
        });
        return tableInfo;
    };

    const tableToCSV = function(table:HTMLTableElement) : string {
        let data = "";
        for (let i = 0; i < table.rows.length; i=i+1) {
            const row = table.rows[i];
            for (let j = 0; j < row.cells.length; j=j+1) {
                const col = row.cells[j];
                data = data + (j ? csvDelimiter : '') + fixCSVField(col.textContent.trim());
            }
            data = data + csvNewLine;
        }
        return data;
    };

    const createDownloadLink = function(anchor:HTMLAnchorElement, base64data:string, exporttype:string, filename:string) : boolean {
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
    const s2ab = function (s:string): ArrayBuffer {
        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i=0; i !== s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return buf;
    };

    const removeColumn = function(arr2d:any[][], colIndex:number) {
        for (let i = 0; i < arr2d.length; i++) {
            const row = arr2d[i];
            row.splice(colIndex, 1);
        }
    };

    /*
     ExcellentExport.convert(options, sheets);

     Options:
     {
        anchor: String or HTML Element,
        openAsDownload: boolean, // Use this options if not using an anchor tag
        format: 'xlsx' or 'xls' or 'csv',
        filename: String
     }

     Sheets must be an array of sheet configuration objects. Sheet description:
     [
        {
            name: 'Sheet 1', // Sheet name
            from: {
                table: String/Element, // Table ID or table element
                array: [...] // Array with the data. Array where each element is a row. Every row is an array of the cells.
            },
            removeColumns: [...], // Array of column indexes (from 0)
            filterRowFn: function(row) {return true}, // Function to decide which rows are returned
            fixValue: function(value, row, column) {return fixedValue} // Function to fix values, receiving value, row num, column num
            fixArray: function(array) {return array} // Function to manipulate the whole data array
            ...
        },
        {
            ...
        }, ...
    ]
    */
    const convert = function(options:ConvertOptions, sheets:SheetOptions[]) {
        const workbook = {
            SheetNames: [],
            Sheets: {}
        };

        if (!options.format) {
            throw new Error("'format' option must be defined");
        }
        if (options.format === 'csv' && sheets.length > 1) {
            throw new Error("'csv' format only supports one sheet");
        }

        sheets.forEach(function(sheetConf:SheetOptions, index:number) {
            const name = sheetConf.name;
            if (!name) {
                throw new Error('Sheet ' + index + ' must have the property "name".');
            }

            // Select data source
            let dataArray;
            if (sheetConf.from && sheetConf.from.table) {
                dataArray = tableToArray(getTable(sheetConf.from.table));
            } else if(sheetConf.from && sheetConf.from.array) {
                dataArray = sheetConf.from.array
            } else {
                throw new Error('No data for sheet: [' + name + ']');
            }

            // Filter rows
            if (sheetConf.filterRowFn) {
                if (sheetConf.filterRowFn instanceof Function) {
                    dataArray = dataArray.filter(sheetConf.filterRowFn);
                } else {
                    throw new Error('Parameter "filterRowFn" must be a function.');
                }
            }
            // Filter columns
            if (sheetConf.removeColumns) {
                const toRemove = sheetConf.removeColumns.sort().reverse();
                toRemove.forEach(function(columnIndex) {
                    removeColumn(dataArray, columnIndex);
                });
            }

            // Convert data, by value
            if (sheetConf.fixValue && typeof sheetConf.fixValue === 'function') {
                const fn = sheetConf.fixValue;
                dataArray.map((r, rownum) => {
                    r.map((value, colnum) => {
                        dataArray[rownum][colnum] = fn(value, rownum, colnum);
                    });
                });
            }

            // Convert data, whole array
            if (sheetConf.fixArray && typeof sheetConf.fixArray === 'function') {
                const fn = sheetConf.fixArray;
                dataArray = fn(dataArray);
            }

            // Create sheet
            workbook.SheetNames.push(name);
            const worksheet = XLSX.utils.aoa_to_sheet(dataArray, {sheet: name} as XLSX.AOA2SheetOpts);
            workbook.Sheets[name] = worksheet;
        });

        const wbOut:string = XLSX.write(workbook, {bookType: options.format, bookSST:true, type: 'binary'});
        try {
            const blob = new Blob([s2ab(wbOut)], { type: "application/octet-stream" });
            const filename = (options.filename || 'download') + '.' + options.format;
            // Support for IE.
            if (window.navigator.msSaveBlob) {
                window.navigator.msSaveBlob(blob, filename);
                return false;
            }
            if (options.anchor) {
                const anchor = getAnchor(options.anchor);
                anchor.href = window.URL.createObjectURL(blob);
                anchor.download = filename;
            } else if (options.openAsDownload) {
                const a = document.createElement("a");
                a.href = URL.createObjectURL(blob);
                a.download = filename;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            } else {
                throw new Error('Options should specify an anchor or openAsDownload=true.')
            }

        } catch(e) {
            throw new Error('Error converting to '+ options.format + '. ' + e);
        }
        return wbOut;

    };

    return {
        version: function(): string {
            return version;
        },
        excel: function(anchor:(HTMLAnchorElement|string), table:HTMLTableElement, name:string) {
            table = getTable(table);
            anchor = getAnchor(anchor);
            const ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
            const b64 = base64(format(template.excel, ctx));
            return createDownloadLink(anchor, b64, 'application/vnd.ms-excel','export.xls');
        },
        csv: function(anchor:(HTMLAnchorElement|string), table:HTMLTableElement, delimiter?:string, newLine?:string) {
            if (delimiter !== undefined && delimiter) {
                csvDelimiter = delimiter;
            }
            if (newLine !== undefined && newLine) {
                csvNewLine = newLine;
            }

            table = getTable(table);
            anchor = getAnchor(anchor);
            const csvData = "\uFEFF" + tableToCSV(table);
            const b64 = base64(csvData);
            return createDownloadLink(anchor, b64, 'application/csv', 'export.csv');
        },
        convert: function(options:ConvertOptions, sheets:SheetOptions[]) {
            return convert(options, sheets);
        }
    };
}();

export default ExcellentExport;
