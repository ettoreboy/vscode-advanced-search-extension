
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
    defaultQuery: Record<string, string>;

    /**
     * The map of any additional & parameters
     * @example type=code
     */
    defaultParams: Record<string, string>;

    /**
     * The base url of the search provider
     * @example https://www.google.com/search
     */
    baseUrl: string;
// eslint-disable-next-line semi
}