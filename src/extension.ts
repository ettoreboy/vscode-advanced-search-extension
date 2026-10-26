import * as Config from './config/Config';
import { window, ExtensionContext, commands } from 'vscode';
import WebSearchProviderDefinition from './search/WebSearchProviderDefinition';
import WebSearchProvider from './search/WebSearchProvider';
import InputBox from './inputbox/InputBox';

/**
 * On activation of the extension
 * @param context
 * @override
 */
export function activate(context: ExtensionContext) {
    if (!Config.isValid()) {
        window.showErrorMessage("Web Search: Invalid configuration. The configuration has been updated recently: please follow the new guideline.");
    }

    Config.SEARCH_PROVIDER_KEYS.forEach((providerKey) => {
        registerSearchCommand(context, providerKey);
    });
}

/**
 * This method is called when your extension is deactivated
 * @override
 */
export function deactivate() {
    console.log("Deactivating websearch");
}

/**
 * Register a search command for a search provider configuration key.
 * Every contributed command is registered, including providers that are not
 * configured yet, so running one reports the problem instead of failing with
 * "command not found".
 * @param context ExtensionContext
 * @param providerKey the configuration key, e.g. github
 */
function registerSearchCommand(context: ExtensionContext, providerKey: string): void {
    const commandId = `${Config.EXTENSION_NAME}.${providerKey}`;

    const disposable = commands.registerCommand(commandId, () => {
        // Read on every run so a settings change applies without a reload.
        const definition = Config.getSearchProviderDefinitionByKey(providerKey);

        if (!definition) {
            window.showErrorMessage(`Web Search: '${commandId}' has no valid baseUrl configured.`);
            return;
        }

        runSearch(definition);
    });

    context.subscriptions.push(disposable);
}

/**
 * Search the selected text, falling back to the input box when there is none
 * @param definition SearchProviderDefinition
 */
function runSearch(definition: WebSearchProviderDefinition): void {
    const searchProvider = getSearchProvider(definition);
    const text = getSelectedText();

    if (text && text.trim() !== '') {
        searchProvider.open(text);
        return;
    }

    if (Config.isInputBoxActive()) {
        const inputBox = new InputBox(definition.name);
        inputBox.show().then((input) => {
            searchProvider.open(input);
        });
    }
}

/**
 * Retrieves a search provider object instance
 * @param definition 
 */
function getSearchProvider(definition: WebSearchProviderDefinition): WebSearchProvider {
    return new WebSearchProvider(definition);
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
