import { spy, when, verify, capture, anyString } from 'ts-mockito';
import WebSearchProvider from '../search/WebSearchProvider';
import SearchProviderDefinition from '../search/WebSearchProviderDefinition';
import SearchProviderDefinitionImplTest from './mocks/SearchProviderDefinitionTest';
import * as assert from 'assert';

suite("WebSearch Generic Provider test", function () {
    const providerDefinition: SearchProviderDefinition = new SearchProviderDefinitionImplTest();
    let webSearchProvider: WebSearchProvider;

    test("search provider is instantiated with a SearchProviderDefinition", () => {
        webSearchProvider = new WebSearchProvider(providerDefinition);

        verify(webSearchProvider);
    });

    test("search provider builds url correctly with no parameters", () => {
        //Prepare
        const testSearch = "Test";
        const expectedUrl = `${providerDefinition.baseUrl}/?q=${testSearch}`;
        webSearchProvider = new WebSearchProvider(providerDefinition);

        const webSearchProviderSpy = spy(webSearchProvider);
        when(webSearchProviderSpy.systemOpen(anyString())).thenResolve();

        //Execute
        webSearchProvider.open(testSearch);

        //Test
        const [ url ] = capture(webSearchProviderSpy.systemOpen).last();
        assert.strictEqual(url, expectedUrl, "Builded url does not match");
    });

    test("search provider builds url correctly with extra parameters", () => {
        //Prepare
        const testSearch = "Test";
        providerDefinition.defaultParams = {
            "param" : "testParameter"
        };
        providerDefinition.defaultQuery = {
            "query" : "extraQuery"
        };
        const expectedUrl = `${providerDefinition.baseUrl}/?q=${testSearch}+query%3AextraQuery&param=testParameter`;
        webSearchProvider = new WebSearchProvider(providerDefinition);

        const webSearchProviderSpy = spy(webSearchProvider);
        when(webSearchProviderSpy.systemOpen(anyString())).thenResolve();

        //Execute
        webSearchProvider.open(testSearch);

        //Test
        const [ url ] = capture(webSearchProviderSpy.systemOpen).last();
        assert.strictEqual(url, expectedUrl, "Builded url does not match");
    });
});