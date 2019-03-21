import WebSearchProviderDefinition from '../../search/WebSearchProviderDefinition';

export default class SearchProviderDefinitionTest implements WebSearchProviderDefinition {
    name: string = "TestProvider";
    className!: string;
    defaultQuery: Object = {};
    defaultParams: Object = {};
    baseUrl: string = "http://www.test.com";
    
}