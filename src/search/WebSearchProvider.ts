import { window } from 'vscode';
import { URL } from 'url';
import WebSearchProviderDefinition from './WebSearchProviderDefinition';
import { obj_to_map } from '../utils/Utils';

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
     * @param searchkey The input text for the search
     */
    constructor(definition: WebSearchProviderDefinition) {
        this.definition = definition;
        this.baseUrl = new URL(definition.baseUrl);
    }

    /**
     * Builds the '?q' parameter. 
     */
    protected buildUrl(searchText: string): string {
        this.baseUrl.searchParams.set("q", this.buildQueryParam(searchText));
        obj_to_map(this.definition.defaultParams).forEach((key, value) => {
            this.baseUrl.searchParams.set(value, key);
        });
        return this.baseUrl.toString();
    }

    /**
     * Builds the q parameter in the URL
     */
    protected buildQueryParam(searchText: string): string {
        let queryResult = '';

        const extraParamsMap = obj_to_map(this.definition.defaultQuery);

        extraParamsMap.forEach((key: string, value: string) => {
            queryResult += ` ${encodeURIComponent(value)}:${encodeURIComponent(key)}`;
        });
        return searchText.concat(queryResult);
    }

    /**
     * Open a file, path or url in the current OS using opn
     * @param url 
     * @param browser 
     */
    public async systemOpen(url: string, browser = ''): Promise<any> {
        return await open(url, { app: browser });
    }

    /**
     * Open uri in the default browser
     * @param uri
     * @param browser 
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