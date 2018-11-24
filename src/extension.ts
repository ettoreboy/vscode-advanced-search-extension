import { window, ExtensionContext, commands } from 'vscode';
import * as Config from './config/Config';

const getSelectedText = (): string => {
    if (!window.activeTextEditor) {
        return "";
    }

    const { selection } = window.activeTextEditor;
    return window.activeTextEditor.document.getText(selection);
};

const registerSearchCommand = (context: ExtensionContext, name: string, className: string): void => {
    // The commandId parameter must match the command field in package.json
    let disposable = commands.registerCommand(`websearch.${name}`, () => {
        // The code you place here will be executed every time your command is executed
        const text = getSelectedText();
        import(`./search/impl/${className}`)
            .then(searchProvider => {
                (new searchProvider.default(name, text)).open();
            }).catch(error => {
                window.showErrorMessage('WebSearch Extension ' + error);
            });
    });

    context.subscriptions.push(disposable);
};

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
    searchProviders.forEach(provider => {
        registerSearchCommand(context, provider.name, provider.className);
    });
}

/**
 * This method is called when your extension is deactivated
 * @override
 */
export function deactivate() {
    
}