const assert = require('assert');

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
});
