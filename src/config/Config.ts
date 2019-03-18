import { workspace } from 'vscode';
import SearchProviderDefinition from '../search/SearchProviderDefinition';

/**
 *  Singleton configuration interface
 */
export const EXTENSION_NAME = "websearch";

const CONFIG = workspace.getConfiguration(EXTENSION_NAME);

export function isValid(): boolean {
    if (!CONFIG.has("searchProviders")) { return false; }
    return true;
}

export function getSearchProvidersFromConfig(): SearchProviderDefinition[] {
    return CONFIG.get("searchProviders") as SearchProviderDefinition[];
}

export function getSearchProviderDefinitionByName(name: string): SearchProviderDefinition | undefined {
    return getSearchProvidersFromConfig().find(obj => obj.name === name);
}