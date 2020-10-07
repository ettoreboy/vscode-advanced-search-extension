import WebSearchProviderDefinition from '../../search/WebSearchProviderDefinition';

export default class SearchProviderDefinitionTest implements WebSearchProviderDefinition {
    name = "TestProvider";
    className!: string;
    defaultQuery = {};
    defaultParams = {};
    baseUrl = "http://www.test.com";
    
}