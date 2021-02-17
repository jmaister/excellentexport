
import 'expect-puppeteer';

import ExcellentExport, { ConvertOptions, SheetOptions } from '../src/excellentexport';


describe('convert() API', function() {
    describe('convert from HTML table', function() {

        beforeEach(() => {
            window.URL.createObjectURL = () => "blob:fake_URL";

            document.body.innerHTML = '';
            const element = document.createElement("div");
            element.innerHTML = 
                '<table id="sometable"><tr><th>first</th><th>second</th></tr><tr><td>1234</td><td>123.56</td></tr></table>' +
                '<a id="anchor">Link</a>';

            document.body.appendChild(element);
        });

        test('should create a XLSX from HTML table by #id', function() {
            const options = {
                anchor: 'anchor',
                filename: 'data_from_table',
                format: 'xlsx'
            } as ConvertOptions;

            const sheets = [
                {
                    name: 'Sheet Name Here 1',
                    from: {
                        table: 'sometable'
                    }
                }
            ] as SheetOptions[];

            const workbook = ExcellentExport.convert(options, sheets);
            expect(workbook).not.toBeNull();

            const anchor = document.getElementById('anchor') as HTMLAnchorElement;
            expect(anchor.href).not.toBeNull();
            expect(anchor.href).toMatch(/blob:/);
        });

        test('should create a XLSX from HTML table by DOM element', function() {
            const options = {
                anchor: document.getElementById('anchor'),
                filename: 'data_from_table',
                format: 'xlsx'
            } as ConvertOptions;

            const sheets = [
                {
                    name: 'Sheet Name Here 1',
                    from: {
                        table: document.getElementById('sometable')
                    }
                }
            ] as SheetOptions[];

            const workbook = ExcellentExport.convert(options, sheets);
            expect(workbook).not.toBeNull();

            const anchor = document.getElementById('anchor') as HTMLAnchorElement;
            expect(anchor.href).not.toBeNull();
            expect(anchor.href).toMatch(/blob:/);
        });
    });
});

