const assert = require('assert');

import ExcellentExport from '../excellentexport';


describe('Fix data', function() {
    beforeEach(() => {
        document.body.innerHTML = '';
        const element = document.createElement("div");
        element.innerHTML = '<a id="anchor">Link</a>';

        document.body.appendChild(element);
    });

    it('should fix values', function() {
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
                        ['hello', '<td>hello</td>', 'bye'],
                    ]
                },
                fixValue: (value, row, col) => {
                    let v = value.replace(/<br>/gi, "\n");
                    let strippedString = v.replace(/(<([^>]+)>)/gi, "");
                    return strippedString;
                }
        }
        ];

        const workbook = ExcellentExport.convert(options, sheets);
        assert.ok(workbook, 'Result must not be null');
    });

    it('should process the whole array', function() {
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
                        ['hello', '<td>hello</td>', 'bye'],
                    ]
                },
                fixData: (array) => {
                    return array.map(r => {
                        return r.map(v => {
                            return "fixed-" + v;
                        })
                    });
                }
            }
        ];

        const workbook = ExcellentExport.convert(options, sheets);
        assert.ok(workbook, 'Result must not be null');
    });

});

