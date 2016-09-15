/**
 * ExcellentExport.
 * A client side Javascript export to Excel.
 *
 * @author: Jordi Burgos (jordiburgos@gmail.com)
 *
 * Based on:
 * https://gist.github.com/insin/1031969
 * http://jsfiddle.net/insin/cmewv/
 *
 * CSV: http://en.wikipedia.org/wiki/Comma-separated_values
 */
/*jslint browser: true, bitwise: true, vars: true, white: true */

window.ExcellentExport = (function() {
    "use strict";
    var version = "2.0";
    var csvSeparator = ',';
    var uri = {excel: 'data:application/vnd.ms-excel;base64,', csv: 'data:application/csv;base64,'};
    var template = {excel: '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8"><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'};
    var csvDelimiter = ",";
    var csvNewLine = "\r\n";
    var base64 = function(s) {
        return window.btoa(window.unescape(encodeURIComponent(s)));
    };
    var format = function(s, c) {
        return s.replace(new RegExp("{(\\w+)}", "g"), function(m, p) {
            return c[p];
        });
    };

    var get = function(element) {
        if (!element.nodeType) {
            return document.getElementById(element);
        }
        return element;
    };

    var fixCSVField = function(value) {
        var fixedValue = value;
        var addQuotes = (value.indexOf(csvDelimiter) !== -1) || (value.indexOf('\r') !== -1) || (value.indexOf('\n') !== -1);
        var replaceDoubleQuotes = (value.indexOf('"') !== -1);

        if (replaceDoubleQuotes) {
            fixedValue = fixedValue.replace(/"/g, '""');
        }
        if (addQuotes || replaceDoubleQuotes) {
            fixedValue = '"' + fixedValue + '"';
        }
        return fixedValue;
    };

    var tableToCSV = function(table) {
        var data = "";
        var i, j, row, col;
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

    var ee = {
        /** @expose */
        excel: function(anchor, table, name) {
            table = get(table);
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
            var hrefvalue = uri.excel + base64(format(template.excel, ctx));
            anchor.href = hrefvalue;
            // Return true to allow the link to work
            return true;
        },
        /** @expose */
        csv: function(anchor, table, delimiter, newLine) {
            if (delimiter !== undefined && delimiter) {
                csvDelimiter = delimiter;
            }
            if (newLine !== undefined && newLine) {
                csvNewLine = newLine;
            }
            table = get(table);
            var csvData = tableToCSV(table);
            var hrefvalue = uri.csv + base64(csvData);
            anchor.href = hrefvalue;
            return true;
        }
    };

    return ee;
}());
