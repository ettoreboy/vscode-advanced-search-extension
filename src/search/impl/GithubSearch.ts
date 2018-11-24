import AbstractWebSearchProvider from '../AbstractWebSearchProvider';
import { URL } from 'url';
import { obj_to_map } from '../../Utils';

/**
 * Github specifc search implementation
 */
export default class GithubSearch extends AbstractWebSearchProvider {
    baseUrl = new URL("https://github.com/search");

    /**
     * Build the github url as following
     * @example github.com/?q={selectedText} {defaultQuery} & {defaultParams}
     */
    buildUrl() {
        this.baseUrl.searchParams.set("q", this.buildExtraQueryParams());
        obj_to_map(this.getDefinition().defaultParams).forEach((key, value) => {
            this.baseUrl.searchParams.set(value, key);
        });
        return this.baseUrl.toString();
    }
}