


import * as XLSX from 'xlsx';
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

    describe('convert from HTML table with colspan and rowspan', function() {

        beforeEach(() => {
            window.URL.createObjectURL = () => "blob:fake_URL";
            document.body.innerHTML = '';
            const div = document.createElement('div');
            div.innerHTML = '<a id="anchor">Link</a>';
            document.body.appendChild(div);
        });

        function buildWorksheet(tableHtml: string): XLSX.WorkSheet {
            const div = document.createElement('div');
            div.id = 'wrapper';
            div.innerHTML = tableHtml;
            document.body.appendChild(div);

            const wbBinary = ExcellentExport.convert(
                { anchor: 'anchor', filename: 'test', format: 'xlsx' } as ConvertOptions,
                [{ name: 'Sheet1', from: { table: div.querySelector('table') as HTMLTableElement } }] as SheetOptions[]
            );

            const wb = XLSX.read(wbBinary, { type: 'binary' });
            return wb.Sheets['Sheet1'];
        }

        test('should produce merged cells for colspan=2', function() {
            const ws = buildWorksheet(
                '<table>' +
                '<tr><td colspan="2">Header</td></tr>' +
                '<tr><td>A</td><td>B</td></tr>' +
                '</table>'
            );

            // Cell A1 should contain "Header"
            expect(ws['A1'].v).toBe('Header');
            // Merged region should cover A1:B1
            expect(ws['!merges']).toBeDefined();
            expect(ws['!merges']).toHaveLength(1);
            expect(ws['!merges']![0]).toEqual({ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } });
        });

        test('should produce merged cells for rowspan=2', function() {
            const ws = buildWorksheet(
                '<table>' +
                '<tr><td rowspan="2">Side</td><td>Top</td></tr>' +
                '<tr><td>Bottom</td></tr>' +
                '</table>'
            );

            expect(ws['A1'].v).toBe('Side');
            expect(ws['B1'].v).toBe('Top');
            expect(ws['B2'].v).toBe('Bottom');
            expect(ws['!merges']).toBeDefined();
            expect(ws['!merges']).toHaveLength(1);
            expect(ws['!merges']![0]).toEqual({ s: { r: 0, c: 0 }, e: { r: 1, c: 0 } });
        });

        test('should produce merged cells for combined colspan=2 rowspan=2', function() {
            const ws = buildWorksheet(
                '<table>' +
                '<tr><td colspan="2" rowspan="2">Big</td><td>R0C2</td></tr>' +
                '<tr><td>R1C2</td></tr>' +
                '<tr><td>R2C0</td><td>R2C1</td><td>R2C2</td></tr>' +
                '</table>'
            );

            expect(ws['A1'].v).toBe('Big');
            expect(ws['C1'].v).toBe('R0C2');
            expect(ws['C2'].v).toBe('R1C2');
            expect(ws['A3'].v).toBe('R2C0');
            expect(ws['!merges']).toBeDefined();
            expect(ws['!merges']).toHaveLength(1);
            expect(ws['!merges']![0]).toEqual({ s: { r: 0, c: 0 }, e: { r: 1, c: 1 } });
        });

        test('should produce no merges for a table without spans', function() {
            const ws = buildWorksheet(
                '<table>' +
                '<tr><td>A</td><td>B</td></tr>' +
                '<tr><td>C</td><td>D</td></tr>' +
                '</table>'
            );

            expect(ws['A1'].v).toBe('A');
            expect(ws['B2'].v).toBe('D');
            // No merges
            const merges = ws['!merges'];
            expect(merges ?? []).toHaveLength(0);
        });
    });
});

