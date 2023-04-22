const assert = require('assert');

import ExcellentExport, { ConvertOptions, SheetOptions } from '../src/excellentexport';
import { PredefinedFormat } from '../src/format';


describe('convert() API with column formats', function() {

    beforeEach(() => {
        window.URL.createObjectURL = () => "blob:fake_URL";

        document.body.innerHTML = '';
        const element = document.createElement("div");
        element.innerHTML = '<a id="anchor">Link</a>';

        document.body.appendChild(element);
    });

    it('should create a XLSX with types', function() {
        const options = {
            anchor: 'anchor',
            filename: 'data_from_array',
            format: 'xlsx'
        } as ConvertOptions;

        const sheets = [
            {
                name: 'People',
                from: {
                    array: [
                        ["ID", "Name", "Birthdate", "Active", "Salary"],
                        [11, "John", "1980-01-01", true, 1000.98],
                        [22, "Mary", "1985-02-02", false, 2000.88],
                        [33, "Peter", "1990-03-03", true, 3000.32],
                    ]
                },
                formats: [
                    { range: 'A2:A10', format: PredefinedFormat.INTEGER },
                    { range: 'C2:C10', format: PredefinedFormat.DATE },
                    { range: 'D2:D10', format: PredefinedFormat.BOOLEAN },
                    { range: 'E2:E10', format: PredefinedFormat.DECIMAL },
                ]
            },

        ] as SheetOptions[];

        const workbook = ExcellentExport.convert(options, sheets);

        assert.ok(workbook, 'Result must not be null');

        const anchor = document.getElementById('anchor') as HTMLAnchorElement;
        assert.ok(anchor.href, 'Element must have href');
        assert.ok(anchor.href.indexOf('blob:') === 0, 'Element href myst be a blob:');
    });
});

