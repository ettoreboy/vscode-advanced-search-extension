import * as Config from './config/Config';
import { window, ExtensionContext, commands } from 'vscode';
import WebSearchProviderDefinition from './search/WebSearchProviderDefinition';
import { EXTENSION_NAME } from './config/Config';
import WebSearchProvider from './search/WebSearchProvider';
import InputBox from './inputbox/InputBox';

/**
 * On activation of the extension
 * @param context
 * @override
 */
export function activate(context: ExtensionContext) {
    if (!Config.isValid()) {
        window.showErrorMessage("Web Search: Invalid configuration");
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
export function deactivate() { }

/**
 * Register a search provider using a SearchProviderDefinition
 * @param context ExtensionContext
 * @param definition SearchProviderDefinition
 */
function registerSearchCommand(context: ExtensionContext, definition: WebSearchProviderDefinition): void {
    const commandName = definition.name;

    let disposable = commands.registerCommand(`${EXTENSION_NAME}.${commandName}`, () => {
        // The code you place here will be executed every time your command is executed
        const searchProvider = getSearchProvider(definition);
        const text = getSelectedText();
        const inputBox = new InputBox(definition.name);

        if(!text && Config.shouldUseInputBox()) {
            inputBox.show().then((text) => {
                searchProvider.open(text);
            });
        } else if(text !== "") {
            searchProvider.open(text);
        }
    });

    context.subscriptions.push(disposable);
}

/**
 * Retrieves a search provider object instance from the configured search or returns the default one
 * @param definition 
 */
function getSearchProvider(definition: WebSearchProviderDefinition): WebSearchProvider {
    if (definition.className) {
        import(`./search/${definition.className}`)
            .then(searchProvider => {
                return new searchProvider.default(definition);
            }).catch(error => {
                window.showErrorMessage('WebSearch Extension provider class not found ' + error);
            });
    }

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