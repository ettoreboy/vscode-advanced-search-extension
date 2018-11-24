import { window } from 'vscode';
import { URL } from 'url';
import SearchProviderDefinition from './SearchProviderDefinition';
import { getSearchProviderDefinitionByName } from '../config/Config';
import { obj_to_map } from '../Utils';
const opn = require('opn');

/**
 * Generic for a web search builder
 */
export default abstract class AbstractWebSearchProvider {
    /**
     * Define to the base URL for the search
     * @type URL
     * @example new URL("https://github.com/search");
     */
    abstract baseUrl: URL;

    /**
     * Implement this to build the full url for the search
     * @return string
     */
    abstract buildUrl(): string;

    /**
     * Default definition for this search provider
     */
    private definition: SearchProviderDefinition;

    /**
     * This provider's name
     */
    protected name: string;

    /**
     * Defines the search key for this web search provider to build
     */
    private searchKey: string;

    constructor(name: string, searchkey: string) {
        this.name = name;
        this.searchKey = searchkey;
        this.definition = getSearchProviderDefinitionByName(this.name);
    }

    /**
   * get the default definition for this search provider
   * @return SearchProviderDefinition
   */
    public getDefinition(): SearchProviderDefinition {
        return this.definition;
    }

    /**
     * Returns the searched text
     * @return the selected text string
     */
    public getSearchKey(): string {
        return this.searchKey;
    }

    /**
     * Builds the '?q' parameter. 
     */
    protected buildExtraQueryParams(): string {
        let stringResult = '';
        const extraParamsMap = obj_to_map(this.getDefinition().defaultQuery);
    
        extraParamsMap.forEach((key: string, value: string) => {
            stringResult += ` ${encodeURIComponent(value)}:${encodeURIComponent(key)}`;
        });
        return this.getSearchKey() + stringResult;
    }

    /**
     * Open uri in a selected or default browser
     * @param uri
     * @param browser 
     */
    public open(browser: string = '') {
        if (this.getSearchKey() !== '') {
            opn(this.buildUrl(), { app: browser })
                .then(() => {
                    window.showInformationMessage(`Opening web search`);
                })
                .catch(() => {
                    window.showErrorMessage('Open browser failed!');
                });
        }
    }

}