/*
 * ExcellentExport
 * 
 * Based on:
 * https://gist.github.com/insin/1031969
 * http://jsfiddle.net/insin/cmewv/
 *  
 */
window.ExcellentExport = (function() {
    var uri = 'data:application/vnd.ms-excel;base64,';
    var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
    var base64 = function(s) {
        return window.btoa(unescape(encodeURIComponent(s)));
    };
    var format = function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) {
            return c[p];
        });
    };

    var ee = {
        excel: function(anchor, table, name) {
            if (!table.nodeType) {
                table = document.getElementById(table);
            }
            var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML};
            var hrefvalue = uri + base64(format(template, ctx));
            console.log(hrefvalue);
            anchor.href = hrefvalue;
            // Return true to allow the link to work
            return true;
        }
    };

    return ee;
}());
