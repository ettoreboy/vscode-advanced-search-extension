//
// Please refer to their documentation on https://mochajs.org/ for help.
//

import * as assert from 'assert';
import { activate, deactivate } from '../extension';

suite("WebSearch Extension tests", function () {

    test("Activation method is exported", () => {
         assert.ok(activate);
    });

    test("Deactivate method is exported", () => {
         assert.ok(deactivate);
    });
});