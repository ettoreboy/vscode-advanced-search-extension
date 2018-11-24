export default class SearchProvider {
    /**
     * The name identifier of the search provider
     * @example github
     */
    name: string;

    /**
     * The name of the search provider's class
     * @example GithubSearch
     */
    className: string;

    /**
     * The map of the default first component of the baseUrl
     * @example q=text or /authors
     */
    defaultQuery: Object;

    /**
     * The map of any additional & parameters
     * @example type=code
     */
    defaultParams: Object;

    constructor(name: string = "", className: string = "", defaultQuery: Map<string, string> = new Map(), defaultParams: Map<string, string> = new Map()) {
        this.name = name;
        this.className = className;
        this.defaultQuery = new Map(defaultQuery);
        this.defaultParams = new Map(defaultParams);
    }
}