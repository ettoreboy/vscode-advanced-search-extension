/**
 * The definition of a search provider.
 * Maps the configuration in your settings
 */
export default class SearchProviderDefinition {
    /**
     * The name identifier of the search provider
     * @example github
     */
    public name: string;

    /**
     * The name of the search provider's class
     * @example GithubSearch
     */
    public className: string;

    /**
     * The map of the default first component of the baseUrl
     * @example q=text or /authors
     */
    public defaultQuery: Object;

    /**
     * The map of any additional & parameters
     * @example type=code
     */
    public defaultParams: Object;

    /**
     * The base url of the search provider
     * @example https://www.google.com/search
     */
    public baseUrl: string;

    /**
     * The default class name of a search provider
     */
    public DEFAULT_CLASS_PROVIDER: string = "WebSearchProvider";

    constructor(name: string = "", baseUrl:string = "", className: string = "", defaultQuery: Map<string, string> = new Map(), defaultParams: Map<string, string> = new Map()) {
        this.name = name;
        this.baseUrl = baseUrl;
        this.className = className !== "" ? className : this.DEFAULT_CLASS_PROVIDER;
        this.defaultQuery = new Map(defaultQuery);
        this.defaultParams = new Map(defaultParams);
    }
}