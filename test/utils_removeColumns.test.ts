const assert = require('assert');

import { removeColumns } from '../src/utils';


describe('Test utility functions', () => {
    beforeEach(() => {
    }); 

    it('should remove one column correctly', function() {
        const columns = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i'],
        ];

        removeColumns(columns, [0]);
        expect(columns.length).toEqual(3)
        expect(columns[0]).toStrictEqual(['b', 'c']);
        expect(columns[1]).toStrictEqual(['e', 'f']);
        expect(columns[2]).toStrictEqual(['h', 'i']);
    });

    it('should remove two columns', () => {
        const columns = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i'],
        ];

        removeColumns(columns, [0, 1]);
        expect(columns.length).toEqual(3)
        expect(columns[0]).toStrictEqual(['c']);
        expect(columns[1]).toStrictEqual(['f']);
    });

    it('should remove the last column', () => {
        const columns = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i'],
        ];

        removeColumns(columns, [2]);
        expect(columns.length).toEqual(3)
        expect(columns[0]).toStrictEqual(['a', 'b']);
        expect(columns[1]).toStrictEqual(['d', 'e']);
        expect(columns[2]).toStrictEqual(['g', 'h']);
    });

    it('should skip if remove out of range', () => {
        const columns = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i'],
        ];

        removeColumns(columns, [99]);
        expect(columns.length).toEqual(3);
        expect(columns[0]).toEqual(['a', 'b', 'c']);
    });

    it('should skip if remove out of range', () => {
        const columns = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i'],
        ];

        removeColumns(columns, [0, 99]);
        expect(columns.length).toEqual(3);
        expect(columns[0]).toEqual(['b', 'c']);
    });

    it('should not remove repeated columns', () => {
        const columns = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i'],
        ];

        removeColumns(columns, [0, 0]);
        expect(columns.length).toEqual(3);
        expect(columns[0]).toEqual(['b', 'c']);
    });

    it('should remove columns in the correct order', () => {
        const columns = [
            ['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'i'],
        ];

        removeColumns(columns, [0, 2]);
        expect(columns.length).toEqual(3);
        expect(columns[0]).toEqual(['b']);
        expect(columns[1]).toEqual(['e']);
    });

});
