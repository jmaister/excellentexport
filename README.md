ExcellentExport.js
==================

Javascript export to Excel or CSV

A quick Javascript librery to create export to Excel/CSV from HTML tables automatically in the browser. No server required.

Check my blog page for testing:
[Javascript export to Excel](http://jordiburgos.com/post/2013/javascript-export-to-excel.html)

[ExcellentExport.js update: Javascript export to Excel and CSV](http://jordiburgos.com/post/2014/excellentexport-javascript-export-to-excel-csv.html)


Compatibility
-------------

Firefox, Chrome, IE6+

Usage
=====

    <table id="datatable">
        <tr>
            <td>100</td> <td>200</td> <td>300</td>
        </tr>
        <tr>
            <td>400</td> <td>500</td> <td>600</td>
        </tr>
    </table>

    <a download="somedata.xls" href="#" onclick="return ExcellentExport.excel(this, 'datatable', 'Sheet Name Here');">Export to Excel</a>
    <a download="somedata.csv" href="#" onclick="return ExcellentExport.csv(this, 'datatable');">Export to CSV</a>

Revision history:

1.0 Added Excel data export

1.1 Added CSV data export

1.3 Added support for ---IE6---, ---IE7---, ---IE8---, IE9+. Added minified version.

1.4 Add LICENSE.txt with GPL v3. UTF-8 characters fixed.

**Note:**

IE8 or lower do not support *data:* url schema.
