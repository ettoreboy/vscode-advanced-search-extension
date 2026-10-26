import { workspace, WorkspaceConfiguration } from 'vscode';
import { URL } from 'url';
import SearchProviderDefinition from '../search/WebSearchProviderDefinition';

const getConfig = (): WorkspaceConfiguration => workspace.getConfiguration(EXTENSION_NAME);

export const EXTENSION_NAME = "websearch";

/**
 * The configuration keys that back a search command.
 * The command id is `websearch.<key>`, so it keeps matching the manifest even
 * when the user renames a provider through its `name` property.
 */
export const SEARCH_PROVIDER_KEYS = ["google", "github", "stackoverflow", "customSearchProvider"];

export function isValid(): boolean {
    const searchProviders = getSearchProvidersFromConfig();
    return searchProviders.length > 0;
}

/**
 * Validate and complete a raw configuration value.
 * A definition without a usable baseUrl would throw when the URL is built, and
 * a definition without the optional maps would throw when they are read, so
 * both are handled here instead.
 * @param key the configuration key, used as a fallback name
 * @param value the raw value read from the workspace configuration
 */
function toDefinition(key: string, value: unknown): SearchProviderDefinition | undefined {
    const raw = value as Partial<SearchProviderDefinition> | undefined;

    if (!raw || typeof raw.baseUrl !== 'string' || raw.baseUrl.trim() === '') {
        return;
    }

    try {
        new URL(raw.baseUrl);
    } catch {
        return;
    }

    return {
        name: typeof raw.name === 'string' && raw.name !== '' ? raw.name : key,
        baseUrl: raw.baseUrl,
        defaultQuery: raw.defaultQuery ?? {},
        defaultParams: raw.defaultParams ?? {}
    };
}

export function getSearchProvidersFromConfig(): SearchProviderDefinition[] {
    const searchProviderConfigs = [];

    for (const providerKey of SEARCH_PROVIDER_KEYS) {
        const definition = getSearchProviderDefinitionByKey(providerKey);

        if (definition) {
            searchProviderConfigs.push(definition);
        }
    }

    return searchProviderConfigs;
}

/**
 * Read a single search provider definition by its configuration key.
 * @returns the definition, or undefined when it is missing or malformed
 */
export function getSearchProviderDefinitionByKey(key: string): SearchProviderDefinition | undefined {
    return toDefinition(key, getConfig().get(key));
}

export function isInputBoxActive(): boolean {
    return getConfig().get("activateInputBox", true);
}

export function getDefaultBrowser(): string | undefined {
    return getConfig().get("defaultBrowser");
}
