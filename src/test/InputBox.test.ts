import InputBox from '../inputbox/InputBox';
import * as assert from 'assert';

suite('InputBox test', () => {
    let inputBox;

    test('Constructs with correct params', () => {
        inputBox = new InputBox('Google');

        assert.ok(inputBox);
        assert.strictEqual(inputBox.getOptions().prompt, "Search something on Google", "Prompt message is wrong");
    });
});