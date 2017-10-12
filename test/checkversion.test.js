const assert = require('assert');

import ExcellentExport from '../excellentexport';


describe('version() API', function() {
    describe('get version', function() {
        it('should get the current version number', function() {
            const version = ExcellentExport.version();

            assert.ok(version, 'Version must be returned');
            assert.equal("3.0.0", version, "Version must be 3.0.0");
        });
    });
});

