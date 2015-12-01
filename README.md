ExcellentExport.js
==================

JavaScript export to Excel or CSV

A quick JavaScript library to create export to Excel/CSV from HTML tables automatically in the browser. No server required.

Check my blog page for testing:
[JavaScript export to Excel](http://jordiburgos.com/post/2013/javascript-export-to-excel.html)

[ExcellentExport.js update: JavaScript export to Excel and CSV](http://jordiburgos.com/post/2014/excellentexport-javascript-export-to-excel-csv.html)

Revision history:
=================

1.0 Added Excel data export

1.1 Added CSV data export

1.3 Added minified version.

1.4 Add LICENSE.txt with GPL v3. UTF-8 characters fixed.

1.5 Possibility to select a CSV delimiter. Bower package available. Compose package available.


Compatibility
-------------

Firefox, Chrome

It does not work on Internet Explorer yet. Internet Explorer does not allow to use url data schema on links.

Install: Bower
==============

    bower install excellentexport


Install: Composer
=================

Get [Composer](http://getcomposer.org):

	$ curl -s http://getcomposer.org/installer | php
	$ php composer.phar install

Create a composer.json file for your project:

```JSON
{
    "repositories": [
        {
            "type": "vcs",
            "url": "https://github.com/jmaister/excellentexport"
        }
    ],
    "require": {
        "jmaister/excellentexport": "~1.4.0"
    }
}
```

Run `composer install`.

Include script in your HTML:

```HTML
<script type="text/javascript" src="/components/excellentexport/excellentexport.min.js"></script>
```

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


TODO
====

Make it work on Internet Explorer. Any ideas are welcome.

Notes
=====

IE8 or lower do not support *data:* url schema.
IE9 and upper do not support *data:* url schema on links.
