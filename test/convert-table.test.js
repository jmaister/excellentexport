const assert = require('assert');

import ExcellentExport from '../excellentexport';


describe('convert() API', function() {
    describe('convert from table', function() {

        beforeEach(() => {
            document.body.innerHTML = '';
            const element = document.createElement("div");
            element.innerHTML = 
                '<table id="sometable"><tr><th>first</th><th>second</th></tr><tr><td>1234</td><td>123.56</td></tr></table>' +
                '<a id="anchor">Link</a>';

            document.body.appendChild(element);
        });

        it('should create a XLSX from HTML table', function() {
            const options = {
                anchor: 'anchor',
                filename: 'data_from_table',
                format: 'xlsx'
            };

            const sheets = [
                {
                    name: 'Sheet Name Here 1',
                    from: {
                        table: 'sometable'
                    }
                }
            ];

            const workbook = ExcellentExport.convert(options, sheets);

            assert.ok(workbook, 'Result must not be null');

            const anchor = document.getElementById('anchor');
            assert.ok(anchor.href, 'Element must have href');
            assert.ok(anchor.href.indexOf('blob:') === 0, 'Element href myst be a blob:');
        });
    });
});

