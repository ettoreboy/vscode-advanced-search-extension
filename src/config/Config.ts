import { workspace, WorkspaceConfiguration } from 'vscode';
import SearchProviderDefinition from '../search/WebSearchProviderDefinition';

const getConfig = (): WorkspaceConfiguration => workspace.getConfiguration(EXTENSION_NAME);

export const EXTENSION_NAME = "websearch";

export function isValid(): boolean {
    if (!getConfig().has("searchProviders")) { return false; }
    return true;
}

export function getSearchProvidersFromConfig(): SearchProviderDefinition[] {
    return getConfig().get("searchProviders") as SearchProviderDefinition[];
}

export function getSearchProviderDefinitionByName(name: string): SearchProviderDefinition | undefined {
    return getSearchProvidersFromConfig().find(obj => obj.name === name);
}

export function isInputBoxActive(): boolean | undefined {
    return getConfig().get("activateInputBox");
}