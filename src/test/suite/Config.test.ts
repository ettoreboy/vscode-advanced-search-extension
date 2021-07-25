import * as assert from 'assert';
import { isValid, EXTENSION_NAME, isDeprecated } from '../../config/Config';




suite("WebSearch Config tests", function () {

    test("Test Configuration is valid", () => {
        assert.ok(isValid());
    });

    test("Test Configuration is deprecated", () => {
        assert.ok(isDeprecated());
    });

    test("Test Configuration exported name", () => {
        assert.strictEqual(EXTENSION_NAME, "websearch", "Extension name does not match");
    });
});