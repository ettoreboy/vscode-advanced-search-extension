import * as Config from './config/Config';
import { window, ExtensionContext, commands } from 'vscode';
import SearchProviderDefinition from './search/SearchProviderDefinition';
import { EXTENSION_NAME } from './config/Config';

/**
 * On activation of the extension
 * @param context
 * @override
 */
export function activate(context: ExtensionContext) {
    if (!Config.isValid()) {
        window.showErrorMessage("Web Search: Invalid configuration");
        return;
    }

    const searchProviders = Config.getSearchProvidersFromConfig();
    searchProviders.forEach((providerDefinition) => {
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
function registerSearchCommand(context: ExtensionContext, definition: SearchProviderDefinition): void {
    const commandName = definition.name;
    const className = definition.className;
    
    let disposable = commands.registerCommand(`${EXTENSION_NAME}.${commandName}`, () => {
        // The code you place here will be executed every time your command is executed
        const text = getSelectedText();
        import(`./search/${className}`)
            .then(searchProvider => {
                (new searchProvider.default(definition, text)).open();
            }).catch(error => {
                window.showErrorMessage('WebSearch Extension ' + error);
            });
    });

    context.subscriptions.push(disposable);
}

/**
 * Get the selected text from the currently active editor
 */
function getSelectedText(): string {
    if (!window.activeTextEditor) {
        return "";
    }

    const { selection } = window.activeTextEditor;
    return window.activeTextEditor.document.getText(selection);
}