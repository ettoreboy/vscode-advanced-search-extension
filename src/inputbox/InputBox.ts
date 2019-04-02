import { window, InputBoxOptions } from 'vscode';

const DEFAULT_INPUT_OPTIONS: InputBoxOptions = {
    password: false,
    placeHolder: 'Search text'
};

/**
 * An input box
 */
export default class InputBox {

    /**
     * The options of this InputBox
     */
    private options: InputBoxOptions;

    constructor(providerName: string) {
        this.options = {
            ...DEFAULT_INPUT_OPTIONS, ...{
                'prompt': `Search something on ${providerName}`
            }
        };
    }


    public getOptions(): InputBoxOptions {
        return this.options;
    }


    /**
     * Show the input box
     */
    show(): Thenable<string | undefined> {
        return window.showInputBox(this.options);
    }
}