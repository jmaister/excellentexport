
[![Node CI](https://github.com/jmaister/excellentexport/actions/workflows/webpack.yml/badge.svg?branch=master)](https://github.com/jmaister/excellentexport/actions/workflows/webpack.yml)
[![](https://data.jsdelivr.com/v1/package/npm/excellentexport/badge)](https://www.jsdelivr.com/package/npm/excellentexport)
[![codecov](https://codecov.io/gh/jmaister/excellentexport/graph/badge.svg?token=CMhCN0GnmY)](https://codecov.io/gh/jmaister/excellentexport)

# ExcellentExport.js

 - [:heart: Sponsor ExcellentExport.js project:heart:](https://github.com/sponsors/jmaister)

 - JavaScript export to Excel or CSV.

 - A quick JavaScript library to create export to Excel/CSV from HTML tables in the browser. No server required.

 - As part of the new version 3.0.0+, there is support for _XLSX_. The drawback is that the library is 200+ KB.

 - Check My Blog Page for Testing :
      [JavaScript export to Excel](http://jordiburgos.com/post/2013/javascript-export-to-excel.html)

      [ExcellentExport.js update: JavaScript export to Excel and CSV](http://jordiburgos.com/post/2017/excellentexport-javascript-export-to-excel-csv.html)

# Revision history:

### 3.9.10

* Add ts-node dependency for TypeScript development support.
* _Update npm dependencies to fix vulnerabilities_

### 3.9.9

* Configure codecov to track code coverage.
* Removed coveralls, the library used is too old, not updated in years and has many vulnerabilities.
* Remove unused dependencies (there was a lot of them).

### 3.9.8

* _Update npm dependencies to fix vulnerabilities_
* Moving to npm build (package-lock.json), yarn does not support "audit fix" command to fix dependencies vulnerabilities automatically.

### 3.9.7

* _Update npm dependencies to fix vulnerabilities_
* xlsx package loaded from CDN [SheetJS CDN](https://cdn.sheetjs.com/)

### 3.9.6

* Remove references to openbase.io
* Fix typos
* _Update npm dependencies to fix vulnerabilities_

### 3.9.5

* _Update npm dependencies to fix vulnerabilities_

### 3.9.4

* _Update npm dependencies to fix vulnerabilities_

### 3.9.3

* Fix TypeScript exported types

### 3.9.0

* Cell types and formats!!! Now you can define the cell type and format. For example, you can define a cell as a date or a number. You can also define the format of the cell. For example, you can define a cell as a date with the format "dd/mm/yyyy" or a number with the format "#,##0.00".

### 3.8.1

* Activate XLSX compression by default. The example of index.bigtable.html went from 18Mb to 3Mb.
* _Update npm dependencies to fix vulnerabilities_
* Update to latest version of TypeScript
* Reduced size of the library from 912 KB to 277 KB!!!

### 3.8.0

* Allow RTL options on the whole file or sheet.
* _Update npm dependencies to fix vulnerabilities_

### 3.7.3

* Fix (#591) remove columns parameter. Now it is not affected by repeated column numbers nor its order.

### 3.7.2

* _Update npm dependencies to fix vulnerabilities_

### 3.7.1

* _Update npm dependencies to fix vulnerabilities_
* Start using Dependabot and get rid of Dependabot-preview

### 3.7.0

* Added option `openAsDownload: boolean`. Use this option to download as a file without using an anchor tag. So download can be triggered from a button.
* _Update npm dependencies to fix vulnerabilities_

### 3.6.0

* Added sponsor link to the project [:heart: Sponsor ExcellentExport.js project:heart:](https://github.com/sponsors/jmaister)
* Transform the project from JavaScript to TypeScript
* Configure Jest as test runner
* _Update npm dependencies to fix vulnerabilities_

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
* Create UMD JavaScript module. Library can be loaded as a module (import, RequireJS, AMD, etc...) or standalone as window.ExcellentExport.

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
        anchor: String or HTML Element,
        format: 'xlsx' or 'xls' or 'csv',
        filename: String,
        rtl: Use Right-to-left characters, boolean (optional)
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
            rtl: Use Right-to-left characters, boolean (optional)
            formats: [...] // Array of formats for each column. See formats below.
            ...
        },
        {
            ...
        }, ...
    ]

## fixValue example

This is an example for the _fixValue function_ to handle HTML tags inside a table cell.
It transforms BR to line breaks and then strips all the HTML tags.

                fixValue: (value, row, col) => {
                    let v = value.replace(/<br>/gi, "\n");
                    let strippedString = v.replace(/(<([^>]+)>)/gi, "");
                    return strippedString;
                }

## Formats

You can specify an array with the formats for a specific cell range (i.e. A1:A100, A1:D100, A1:H1, etc).

Each element in the format array consists on:

```typescript
const sheet01 = {
    "range": "A1:A100", // Range of cells to apply the format, mandatory
    "format": {
        "type": "<cell_type>", // Type of format, mandatory
        "pattern": "<pattern>" // Pattern, optional
    }
}
```

Example:

```typescript
          formats: [
            {
              range: "C2:C20",
              format: {
                type: "n",
                pattern: "0.00",
              },
            },
            {
              range: "C2:C20",
              format: ExcellentExport.formats.NUMBER,
            }
          ]
```

`format` can be used from one of the predefined types if you use TypeScript


`cell_type` can be one of the followint:

    's': String
    'n': Number
    'd': Date
    'b': Boolean

`pattern` is a string with the format pattern used in Excel. For example:

    '0' // Integer
    '0.00' // 2 decimals
    'dd/mm/yyyy' // Date
    'dd/mm/yyyy hh:mm:ss' // Date and time
    '0.00%' // Percentage
    '0.00e+00' // Scientific notation
    '@' // Text

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

## Dependencies

- XLSX is not available from NPM anymore. Use https://cdn.sheetjs.com/ to install it.
