const assert = require('assert');

import ExcellentExport from '../excellentexport';
import pkg from '../package.json';

describe('version() API', function() {
    describe('get version', function() {
        it('should get the current version number', function() {
            const version = ExcellentExport.version();

            assert.ok(version, 'Version must be returned');
            assert.equal(pkg.version, version, "Version must be " + pkg.version);
        });
    });
});

