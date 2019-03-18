import { window } from 'vscode';
import { URL } from 'url';
import SearchProviderDefinition from './SearchProviderDefinition';
import { obj_to_map } from '../utils/Utils';
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
     * 
     * @param definition Definition of this search provider - must match the command
     * @param searchkey The input text for the search
     */
    constructor(definition: SearchProviderDefinition) {
        this._definition = definition;
        this._name = definition.name;
        this.baseUrl = new URL(definition.baseUrl);
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
    protected buildUrl(searchText: string) {
        this.baseUrl.searchParams.set("q", this.buildQueryParam(searchText));
        obj_to_map(this._definition.defaultParams).forEach((key, value) => {
            this.baseUrl.searchParams.set(value, key);
        });
        return this.baseUrl.toString();
    }

    /**
     * Builds the q parameter in the URL
     */
    protected buildQueryParam(searchText: string): string {
        let queryResult = '';
        const extraParamsMap = obj_to_map(this._definition.defaultQuery);
    
        extraParamsMap.forEach((key: string, value: string) => {
            queryResult += ` ${encodeURIComponent(value)}:${encodeURIComponent(key)}`;
        });
        return searchText.concat(queryResult);
    }

    /**
     * Open uri in a selected or default browser
     * @param uri
     * @param browser 
     */
    public open(searchText:string, browser: string = '') {
        if (searchText !== '') {
            opn(this.buildUrl(searchText), { app: browser })
                .then(() => {
                    window.showInformationMessage(`Opening web search`);
                })
                .catch(() => {
                    window.showErrorMessage('Open browser failed!');
                });
        }
    }

}