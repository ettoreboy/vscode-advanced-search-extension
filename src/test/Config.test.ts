

import * as assert from 'assert';
import { isValid, EXTENSION_NAME } from '../config/Config';

suite("WebSearch Config tests", function () {

    test("Test Configuration has searchproviders", () => {
        assert.ok(isValid());
    });

    test("Test Configuration exported name", () => {
        assert.equal(EXTENSION_NAME, "websearch", "Extension name does not match");
    });

    //TODO: Add json schema test for configuration
});