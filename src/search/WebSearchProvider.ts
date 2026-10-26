import { window } from 'vscode';
import { URL } from 'url';
import WebSearchProviderDefinition from './WebSearchProviderDefinition';
import BrowserDeterminator from '../config/BrowserDeterminator';
import { getDefaultBrowser } from '../config/Config';
import { obj_to_map } from '../utils/Utils';

// open@8 is the last CommonJS release; v9+ is ESM only and a VS Code
// extension host loads CommonJS.
// eslint-disable-next-line @typescript-eslint/no-require-imports
import open = require('open');

/**
 * Generic for a web search builder
 */
export default class WebSearchProvider {
    /**
     * Define to the base URL for the search
     * @type URL
     * @example new URL("https://github.com/search");
     */
    private baseUrl: URL;

    /**
     * Default worksapce definition for this search provider
     */
    private definition: WebSearchProviderDefinition;

    /**
     * 
     * @param definition Definition of this search provider - must match the command
     */
    constructor(definition: WebSearchProviderDefinition) {
        this.definition = definition;
        // Parsed eagerly so a broken baseUrl is reported when the provider is
        // created rather than halfway through a search.
        this.baseUrl = new URL(definition.baseUrl);
    }

    /**
     * Builds the '?q' parameter. 
     */
    protected buildUrl(searchText: string): string {
        // A fresh URL per search, otherwise parameters from a previous search
        // on the same provider would still be attached.
        const url = new URL(this.baseUrl.href);

        url.searchParams.set("q", this.buildQueryParam(searchText));
        obj_to_map(this.definition.defaultParams).forEach((value, key) => {
            url.searchParams.set(key, value);
        });

        return url.toString();
    }

    /**
     * Builds the q parameter in the URL
     */
    protected buildQueryParam(searchText: string): string {
        let queryResult = '';

        const extraParamsMap = obj_to_map(this.definition.defaultQuery);

        // Left unencoded on purpose: the result is handed to URLSearchParams,
        // which escapes it once. Escaping here too would double encode
        // characters such as '+' in a search for "C++".
        extraParamsMap.forEach((value: string, key: string) => {
            queryResult += ` ${key}:${value}`;
        });

        return searchText.concat(queryResult);
    }

    /**
     * Open a file, path or url in the current OS using open
     * @param url 
     * @param browser the browser app name, defaults to the configured one
     */
    public async systemOpen(url: string, browser?: string): Promise<unknown> {
        const appName = browser ?? BrowserDeterminator.getOSBrowserName(getDefaultBrowser());

        return await open(url, appName ? { app: { name: appName } } : {});
    }

    /**
     * Open uri in the configured browser
     * @param searchText
     */
    public open(searchText: string | undefined) {
        if (searchText && searchText !== '') {
            const url = this.buildUrl(searchText);

            this.systemOpen(url)
                .then(() => {
                    window.showInformationMessage('Opening web search');
                })
                .catch((error: any) => {
                    window.showErrorMessage(`WebSearch open url failed ${error}`);
                });
        }
    }
}
