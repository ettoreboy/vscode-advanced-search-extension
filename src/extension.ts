import * as Config from './config/Config';
import { window, ExtensionContext, commands } from 'vscode';
import WebSearchProviderDefinition from './search/WebSearchProviderDefinition';
import WebSearchProvider from './search/WebSearchProvider';
import InputBox from './inputbox/InputBox';

/**
 * On activation of the extension
 * @param context ExtensionContext
 * @override
 */
export function activate(context: ExtensionContext) {
    if (Config.isDeprecated()) {
        window.showWarningMessage("Web Search: deprecated configuration. Please check how to migrate in the docs at https://github.com/platinumjesus/vscode-advanced-search-extension.");
    }

    const searchProviderDefinitions = Config.getSearchProvidersFromConfig();

    searchProviderDefinitions.forEach((providerDefinition) => {
        registerSearchCommand(context, providerDefinition);
    });
}

/**
 * This method is called when your extension is deactivated
 * @override
 */
export function deactivate() {
    console.debug("Deactivating websearch");
}

/**
 * Register a search provider using a SearchProviderDefinition
 * @param context ExtensionContext
 * @param definition WebSearchProviderDefinition
 */
function registerSearchCommand(context: ExtensionContext, definition: WebSearchProviderDefinition): void {
    const commandName = definition.name;

    const disposable = commands.registerCommand(`${Config.EXTENSION_NAME}.${commandName}`, () => {
        // The code you place here will be executed every time your command is executed
        const searchProvider = new WebSearchProvider(definition);
        const text = getSelectedText();
        
        const browser = Config.getDefaultBrowser();

        if (!text && Config.isInputBoxActive()) {
            const inputBox = new InputBox(definition.name);
            inputBox.show().then((text) => {
                searchProvider.open(text, {browser});
            });
        } else if (text && text !== "") {
            searchProvider.open(text, {browser});
        }
    });

    context.subscriptions.push(disposable);
}

/**
 * Get the selected text from the currently active editor
 * @returns the string of text or undefined if there is no active editor with selected text
 */
function getSelectedText(): string | undefined {
    if (window.activeTextEditor) {
        const { selection } = window.activeTextEditor;
        return window.activeTextEditor.document.getText(selection);
    }
}