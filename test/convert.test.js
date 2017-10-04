const assert = require('assert');

import ExcellentExport from '../excellentexport';


describe('convert() API', function() {
    describe('convert from array', function() {
        it('should create a CSV', function() {
            const options = {
                // anchor: 'anchorNewApi-csv',
                filename: 'data_123.csv',
                format: 'csv'
            };

            const sheets = [
                {
                    name: 'Sheet Name Here 1',
                    from: {
                        array: [
                            [1, 2, 3],
                            ['hello', '2200', 'bye']
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

            let workbook = ExcellentExport.convert(options, sheets);

            assert.ok(workbook, 'Result must not be null');
        });
    });
});

