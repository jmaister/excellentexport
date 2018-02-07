# ExcellentExport.js

JavaScript export to Excel or CSV

A quick JavaScript library to create export to Excel/CSV from HTML tables in the browser. No server required.

As part of the new version 3.0.0+, there is support for XLSX. The drawback is that the library is 600+ KB.

If you only need XLS or CSV, use 2.X.X versions.

Check my blog page for testing:
[JavaScript export to Excel](http://jordiburgos.com/post/2013/javascript-export-to-excel.html)

[ExcellentExport.js update: JavaScript export to Excel and CSV](http://jordiburgos.com/post/2017/excellentexport-javascript-export-to-excel-csv.html)

# TODO:

* Define the final API for ExcellentExport.convert(...)
* Remove rows or columns from a table.
* Filter and process cell values.
* Output as a Blob.
* Set fonts to the sheet.
* Insert images ?

# Revision history:

### 3.1.0 (in progress)

* Fix old API for base64 and escaping problem.

### 3.0.0 (22/10/2017)

* XLSX support. This bumps the build size to 640 KB.
* New API: ExcellentExport.convert(...)
* Autogenerate download filename.
* Data input from arrays or HTML Tables.
* Multiple sheets for XLS or XLSX formats.

### 2.1.0 (24/09/2017)

* Add Webpack build.
* Create UMD JavaScript module. Library can be loaded as a module (import, RequireJS, AMD, etc...) or standalone as window.ExcelentExport.

### 2.0.3 (21/01/2017)

* Fix export as a module.
* Changed minifier to UglifyJS.

### 2.0.2 (10/01/2017)

* Fix CSV Chinese characters and other special characters display error in Windows Excel.
* Fix URL.createObjectURL(...) on Firefox.


### 2.0.0 (03/10/2016)

* Now it can export to big files +2MB.
* Minimum IE 11.
* Links open with URL.createObjectURL(...).
* NPM package available.
* Using Semantic versioning (2.0.0 instead of 2.0).
* Module can be loaded standalone or with RequireJS.
* Change license to MIT.

### 1.5

* Possibility to select a CSV delimiter.
* Bower package available.
* Compose package available.

### 1.4

* Add LICENSE.txt with GPL v3.
* UTF-8 characters fixed.

### 1.3

* Added minified version.

### 1.1

* Added CSV data export

### 1.0

* Added Excel data export

## Compatibility

Firefox, Chrome, Internet Explorer 11+.

# Install

## Bower

    bower install excellentexport


## npm

    npm install excellentexport

## Composer

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

# Load


Include script in your HTML:


    <script type="text/javascript" src="/components/excellentexport/dist/excellentexport.js"></script>


Require.js

    <script src="http://requirejs.org/docs/release/2.3.2/minified/require.js"></script>
    <script>
        require(['dist/excellentexport'], function(ee) {
            window.ExcellentExport = ee;
        });
    </script>

Import

    import ExcellentExport from 'excellentexport';

# Usage

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
    <!-- new API, xlsx -->
    <a download="somedata.xlsx" href="#" onclick="return ExcellentExport.convert({ anchor: this, filename: 'data_123.array', format: 'xlsx'},[{name: 'Sheet Name Here 1', from: {table: 'datatable'}}]);">Export to CSV</a>


# Notes

IE8 or lower do not support *data:* url schema.
IE9 does not support *data:* url schema on links.
IE10 and above and Edge are supported via the Microsoft-specific `msOpenOrSaveBlob` method.

# Test

    python 2.x:
        python -m SimpleHTTPServer 8000

    python 3.x:
        python -m http.server 8000

# Build

Install dependencies:

    npm install
    
Build dist/excellentexport.js

    npm run build

Publish

    npm publish
