[![Build Status](https://travis-ci.com/jmaister/excellentexport.svg?branch=master)](https://travis-ci.com/jmaister/excellentexport)
[![](https://data.jsdelivr.com/v1/package/npm/excellentexport/badge)](https://www.jsdelivr.com/package/npm/excellentexport)
[![Rate on Openbase](https://badges.openbase.io/js/rating/excellentexport.svg)](https://openbase.io/js/excellentexport?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge)

# ExcellentExport.js

 - JavaScript export to Excel or CSV.

 - A quick JavaScript library to create export to Excel/CSV from HTML tables in the browser. No server required.

 - As part of the new version 3.0.0+, there is support for _XLSX_. The drawback is that the library is 600+ KB.

 - If you only need _XLS_ or _CSV_, use _2.X.X_ versions.

 - Check My Blog Page for Testing :
      [JavaScript export to Excel](http://jordiburgos.com/post/2013/javascript-export-to-excel.html)

      [ExcellentExport.js update: JavaScript export to Excel and CSV](http://jordiburgos.com/post/2017/excellentexport-javascript-export-to-excel-csv.html)

# Revision history:

### 3.5.0

* Add fixValue and fixArray functions to configuration: these configuration functions can be used to manipulate the values of the cells.
* _Update npm dependencies to fix vulnerabilities_

### 3.4.3

* _Update npm dependencies to fix vulnerabilities_

### 3.4.2

* Remove ES6 function syntax to support IE11
* _Update npm dependencies to fix vulnerabilities_

### 3.4.0

* Configure TravisCI on GitHub
* Update npm dependencies to fix vulnerabilities

### 3.3.0

* Remove columns by index
* Filter rows by value
* _Updated build to Webpack 4.x.x_

### 3.2.1

* _Update npm dependencies to fix vulnerabilities_

### 3.2.0

* _Update npm dependencies to fix vulnerabilities_

### 3.1.0

* Fix old API for base64 and escaping problem.

### 3.0.0

* XLSX support. This bumps the build size to 640 KB.
* New API : ExcellentExport.convert(...)
* Autogenerate download filename.
* Data input from arrays or HTML Tables.
* Multiple sheets for XLS or XLSX formats.

### 2.1.0

* Add Webpack build.
* Create UMD JavaScript module. Library can be loaded as a module (import, RequireJS, AMD, etc...) or standalone as window.ExcelentExport.

### 2.0.3

* Fix export as a module.
* Changed minifier to UglifyJS.

### 2.0.2

* Fix CSV Chinese characters and other special characters display error in Windows Excel.
* Fix URL.createObjectURL(...) on Firefox.


### 2.0.0

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

* _Add LICENSE.txt with GPL v3_
* UTF-8 characters fixed.

### 1.3

* _Added minified version_

### 1.1

* _Added CSV data export_

### 1.0

* _Added Excel data export_

## Compatibility

 - Firefox
 - Chrome
 - Internet Explorer 11+

# Install 

## npm

    npm install excellentexport --save

## yarn

    yarn add excellentexport

## bower

    bower install excellentexport

# Load


**Include script in your HTML:**

    <script type="text/javascript" src="dist/excellentexport.js"></script>

**Include script in your HTML using CDN:**

    <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/excellentexport@3.4.3/dist/excellentexport.min.js"></script>


**Require.js**

    <script src="http://requirejs.org/docs/release/2.3.6/minified/require.js"></script>
    <script>
        require(['dist/excellentexport'], function(ee) {
            window.ExcellentExport = ee;
        });
    </script>

**ES6 import**

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

# API

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
            filterRowFn: function(row) {return true}, // Function to decide which rows are returned
            fixValue: function(value, row, column) {return fixedValue} // Function to fix values, receiving value, row num, column num
            fixArray: function(array) {return array} // Function to manipulate the whole data array
        },
        ...
     }

## fixValue example

This is an example for the _fixValue function_ to handle HTML tags inside a table cell. 
It transforms BR to line breaks and then strips all the HTML tags.

                fixValue: (value, row, col) => {
                    let v = value.replace(/<br>/gi, "\n");
                    let strippedString = v.replace(/(<([^>]+)>)/gi, "");
                    return strippedString;
                }


# Notes

 - IE8 or lower do not support *data:* url schema.
 - IE9 does not support *data:* url schema on links.
 - IE10 and above and Edge are supported via the Microsoft-specific `msOpenOrSaveBlob` method.

# Test

    python 2.x:
        python -m SimpleHTTPServer 8000

    python 3.x:
        python -m http.server 8000

# Build

**Install dependencies:**

    npm install
    
**Build development version dist/excellentexport.js**

    npm run build

**Build publish version of dist/excellentexport.js**

    npm run prod

**Publish**

    npm publish
