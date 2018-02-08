const assert = require('assert');

import ExcellentExport from '../excellentexport';


describe('convert() API', function() {
    describe('convert from array', function() {

        beforeEach(() => {
            document.body.innerHTML = '';
            const element = document.createElement("div");
            element.innerHTML = '<a id="anchor">Link</a>';

            document.body.appendChild(element);
        });

        it('should create a XLSX from array', function() {
            const options = {
                anchor: 'anchor',
                filename: 'data_from_array',
                format: 'xlsx'
            };

            const sheets = [
                {
                    name: 'Sheet Name Here 1',
                    from: {
                        array: [
                            [1, 2, 3],
                            ['hello', '2200', 'bye'],
                            ['quo"te', 'dobl"e qu"ote', 'singl\'e quote']
                        ]
                    }
                },
                {
                    name: 'Sheet Number 2',
                    from: {
                        array: [
                            [6666, 7777, 8888],
                            ['lorem', 'ipsum', 'dolor']
                        ]
                    }
                },

            ];

            const workbook = ExcellentExport.convert(options, sheets);

            assert.ok(workbook, 'Result must not be null');

            const anchor = document.getElementById('anchor');
            assert.ok(anchor.href, 'Element must have href');
            assert.ok(anchor.href.indexOf('blob:') === 0, 'Element href myst be a blob:');
        });
    });
});

