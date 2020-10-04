import { workspace, WorkspaceConfiguration } from 'vscode';
import SearchProviderDefinition from '../search/WebSearchProviderDefinition';

const getConfig = (): WorkspaceConfiguration => workspace.getConfiguration(EXTENSION_NAME);

export const EXTENSION_NAME = "websearch";

const SEARCH_PROVIDERS = ["google", "github", "stackoverflow"];

export function isValid(): boolean {
    const searchProviders = getSearchProvidersFromConfig();
    return searchProviders.length > 0;
}

export function getSearchProvidersFromConfig(): SearchProviderDefinition[] {
    const searchProviderConfigs = [];
    const CONFIG = getConfig();

    for (const providerName of SEARCH_PROVIDERS) {
        searchProviderConfigs.push(CONFIG.get(providerName) as SearchProviderDefinition);
    }

    return searchProviderConfigs;
}

export function getSearchProviderDefinitionByName(name: string): SearchProviderDefinition | undefined {
    return getSearchProvidersFromConfig().find(obj => obj.name === name);
}

export function isInputBoxActive(): boolean | undefined {
    return getConfig().get("activateInputBox");
}

export function getDefaultBrowser(): string | undefined {
    return getConfig().get("defaultBrowser");
}