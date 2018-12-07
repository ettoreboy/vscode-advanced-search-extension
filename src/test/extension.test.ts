//
// Please refer to their documentation on https://mochajs.org/ for help.
//

import * as assert from 'assert';
import { isValid } from '../config/Config';

suite("WebSearch Extension tests", function () {
    
    test("Test Configuration", function() {
        assert(isValid());
    });
});