import { window } from 'vscode';
import { URL } from 'url';
import SearchProviderDefinition from './SearchProviderDefinition';
import { obj_to_map } from '../Utils';
const opn = require('opn');

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
    private _definition: SearchProviderDefinition;

    /**
     * This provider's name
     */
    private _name: string;

    /**
     * Defines the search key for this web search provider to build
     */
    private searchKey: string;

    /**
     * 
     * @param definition Definition of this search provider - must match the command
     * @param searchkey The input text for the search
     */
    constructor(definition: SearchProviderDefinition, searchkey: string) {
        this.searchKey = searchkey;
        this._definition = definition;
        this._name = definition.name;
        this.baseUrl = new URL(definition.baseUrl);
    }

    /**
     * Returns the searched text
     * @return the selected text string
     */
    public getSearchKey(): string {
        return this.searchKey;
    }

      /**
     * Returns the name of this provider
     * @return the selected text string
     */
    public getName(): string {
        return this._name;
    }

    /**
     * Builds the '?q' parameter. 
     */
    protected buildUrl() {
        this.baseUrl.searchParams.set("q", this.buildExtraQueryParams());
        obj_to_map(this._definition.defaultParams).forEach((key, value) => {
            this.baseUrl.searchParams.set(value, key);
        });
        return this.baseUrl.toString();
    }

    /**
     * Builds the extra parameters
     */
    protected buildExtraQueryParams(): string {
        let stringResult = '';
        const extraParamsMap = obj_to_map(this._definition.defaultQuery);
    
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