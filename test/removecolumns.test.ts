const assert = require('assert');

import ExcellentExport, { ConvertOptions } from '../src/excellentexport';


describe('Test removeColumns option', function() {
    beforeEach(() => {
        window.URL.createObjectURL = () => "blob:fake_URL";

        document.body.innerHTML = '';
        const element = document.createElement("div");
        element.innerHTML = '<a id="anchor">Link</a>';

        document.body.appendChild(element);
    }); 

    it('should remove columns correctly', function() {
        const options = {
            anchor: 'anchor',
            filename: 'data_from_array',
            format: 'xlsx'
        } as ConvertOptions;

        const sheets = [
            {
                name: 'Sheet Name Here 1',
                from: {
                    array: [
                        ['hello', '<td>hello</td>', 'bye'],
                    ]
                },
                removeColumns: [0, 0]
        }
        ];

        const workbook = ExcellentExport.convert(options, sheets);
        assert.ok(workbook, 'Result must not be null');
    });

   
});

