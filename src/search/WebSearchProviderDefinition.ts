
/**
 * The definition of a search provider.
 * Maps the configuration in your settings
 */
export default interface SearchProviderDefinition {
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

    /**
     * The base url of the search provider
     * @example https://www.google.com/search
     */
    baseUrl: string;
}