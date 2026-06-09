import { describe, expect, test, beforeEach, it, assert } from 'vitest'

import * as utils from '../src/utils';


describe('Test utility functions', () => {

    describe('base64', () => {
        it('should encode a string to base64', () => {
            assert.equal(utils.base64('test'), 'dGVzdA==');
        });

        it('should encode a unicode string to base64', () => {
            assert.equal(utils.base64('test\u00A9'), "dGVzdMKp");
        });

    });


    describe('test format function', () => {
        it('should format a string', () => {
            assert.equal(utils.format('aaaa {a} bbbb {b} cccc', {a:'1', b:'2', c:'3', d:'4'}), 'aaaa 1 bbbb 2 cccc');
        });

        it('should not replace if no data is provided', () => {
            assert.equal(utils.format('aaaa {a} bbbb {b} cccc', {}), 'aaaa {a} bbbb {b} cccc');
        });
    });

    describe('parseTable', () => {
        function makeTable(html: string): HTMLTableElement {
            const div = document.createElement('div');
            div.innerHTML = html;
            return div.querySelector('table') as HTMLTableElement;
        }

        it('should parse a simple table with no spans', () => {
            const table = makeTable('<table><tr><td>A</td><td>B</td></tr><tr><td>C</td><td>D</td></tr></table>');
            const { data, merges } = utils.parseTable(table);
            expect(data).toEqual([['A', 'B'], ['C', 'D']]);
            expect(merges).toHaveLength(0);
        });

        it('should handle a cell with colspan=2', () => {
            // Row 0: [Header (colspan=2)], Row 1: [A, B]
            const table = makeTable(
                '<table>' +
                '<tr><td colspan="2">Header</td></tr>' +
                '<tr><td>A</td><td>B</td></tr>' +
                '</table>'
            );
            const { data, merges } = utils.parseTable(table);
            // Header spans columns 0 and 1; second slot should be empty
            expect(data[0][0]).toBe('Header');
            expect(data[0][1]).toBe('');
            expect(data[1]).toEqual(['A', 'B']);
            expect(merges).toHaveLength(1);
            expect(merges[0]).toEqual({ s: { r: 0, c: 0 }, e: { r: 0, c: 1 } });
        });

        it('should handle a cell with rowspan=2', () => {
            // Row 0: [Side (rowspan=2), Top], Row 1: [Bottom]
            const table = makeTable(
                '<table>' +
                '<tr><td rowspan="2">Side</td><td>Top</td></tr>' +
                '<tr><td>Bottom</td></tr>' +
                '</table>'
            );
            const { data, merges } = utils.parseTable(table);
            expect(data[0][0]).toBe('Side');
            expect(data[0][1]).toBe('Top');
            // Column 0 of row 1 is occupied by rowspan; Bottom goes to column 1
            expect(data[1][0]).toBe('');
            expect(data[1][1]).toBe('Bottom');
            expect(merges).toHaveLength(1);
            expect(merges[0]).toEqual({ s: { r: 0, c: 0 }, e: { r: 1, c: 0 } });
        });

        it('should handle a cell with both colspan=2 and rowspan=2', () => {
            // 3x3 table, top-left cell spans 2 cols and 2 rows
            const table = makeTable(
                '<table>' +
                '<tr><td colspan="2" rowspan="2">Big</td><td>R0C2</td></tr>' +
                '<tr><td>R1C2</td></tr>' +
                '<tr><td>R2C0</td><td>R2C1</td><td>R2C2</td></tr>' +
                '</table>'
            );
            const { data, merges } = utils.parseTable(table);
            expect(data[0][0]).toBe('Big');
            expect(data[0][1]).toBe('');
            expect(data[0][2]).toBe('R0C2');
            expect(data[1][0]).toBe('');
            expect(data[1][1]).toBe('');
            expect(data[1][2]).toBe('R1C2');
            expect(data[2]).toEqual(['R2C0', 'R2C1', 'R2C2']);
            expect(merges).toHaveLength(1);
            expect(merges[0]).toEqual({ s: { r: 0, c: 0 }, e: { r: 1, c: 1 } });
        });
    });
});

