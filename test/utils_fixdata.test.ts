const assert = require('assert');

import { fixCSVField } from '../src/utils';


describe('Test utility functions: csv functions', () => {

    it('should keep the value if not delimiter found', () => {
        assert.equal(fixCSVField('test', ','), 'test');
    });

    it('should fix a string with double quotes', () => {
        const str = 'aaa"bbb';
        const result = fixCSVField(str, "\"");
        assert.equal(result, '\"aaa\"\"bbb\"');
    });

    it('should fix a field with space delimiter', () => {
        const str = 'aaa bbb';
        const result = fixCSVField(str, " ");
        assert.equal(result, '\"aaa bbb\"');
    });

});
