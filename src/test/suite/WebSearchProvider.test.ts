import { spy, when, capture, anyString } from 'ts-mockito';
import WebSearchProvider from '../../search/WebSearchProvider';
import SearchProviderDefinition from '../../search/WebSearchProviderDefinition';
import SearchProviderDefinitionImplTest from '../mocks/SearchProviderDefinitionTest';
import * as assert from 'assert';

/**
 * Build the provider, stub the browser call and return the url it was given
 */
function captureOpenedUrl(definition: SearchProviderDefinition, searchText: string): string {
    const webSearchProvider = new WebSearchProvider(definition);

    const webSearchProviderSpy = spy(webSearchProvider);
    when(webSearchProviderSpy.systemOpen(anyString())).thenResolve();

    webSearchProvider.open(searchText);

    const [url] = capture(webSearchProviderSpy.systemOpen).last();
    return url;
}

suite("WebSearch Generic Provider test", function () {
    const providerDefinition: SearchProviderDefinition = new SearchProviderDefinitionImplTest();
    let webSearchProvider: WebSearchProvider;

    test("search provider is instantiated with a SearchProviderDefinition", () => {
        webSearchProvider = new WebSearchProvider(providerDefinition);

        assert.ok(webSearchProvider);
    });

    test("search provider builds url correctly with no parameters", () => {
        //Prepare
        const testSearch = "Test";
        const expectedUrl = `${providerDefinition.baseUrl}/?q=${testSearch}`;

        //Execute
        const url = captureOpenedUrl(providerDefinition, testSearch);

        //Test
        assert.strictEqual(url, expectedUrl, "Builded url does not match");
    });

    test("search provider builds url correctly with extra parameters", () => {
        //Prepare
        const testSearch = "Test";
        providerDefinition.defaultParams = {
            "param": "testParameter"
        };
        providerDefinition.defaultQuery = {
            "query": "extraQuery"
        };
        const expectedUrl = `${providerDefinition.baseUrl}/?q=${testSearch}+query%3AextraQuery&param=testParameter`;

        //Execute
        const url = captureOpenedUrl(providerDefinition, testSearch);

        //Test
        assert.strictEqual(url, expectedUrl, "Builded url does not match");
    });

    test("search provider escapes special characters exactly once", () => {
        //Prepare
        const definition: SearchProviderDefinition = new SearchProviderDefinitionImplTest();
        definition.defaultQuery = { "lang": "c++" };
        const expectedUrl = `${definition.baseUrl}/?q=C%2B%2B+lang%3Ac%2B%2B`;

        //Execute
        const url = captureOpenedUrl(definition, "C++");

        //Test
        assert.strictEqual(url, expectedUrl, "Special characters were double encoded");
    });

    test("search provider tolerates a definition without the optional maps", () => {
        //Prepare
        const definition = {
            name: "Partial",
            baseUrl: "http://www.test.com"
        } as SearchProviderDefinition;

        //Execute
        const url = captureOpenedUrl(definition, "Test");

        //Test
        assert.strictEqual(url, `${definition.baseUrl}/?q=Test`, "Builded url does not match");
    });

    test("search provider does not keep parameters between searches", () => {
        //Prepare
        const definition: SearchProviderDefinition = new SearchProviderDefinitionImplTest();
        definition.defaultParams = { "param": "testParameter" };
        const reusedProvider = new WebSearchProvider(definition);

        const reusedProviderSpy = spy(reusedProvider);
        when(reusedProviderSpy.systemOpen(anyString())).thenResolve();

        //Execute
        reusedProvider.open("First");
        reusedProvider.open("Second");

        //Test
        const [url] = capture(reusedProviderSpy.systemOpen).last();
        assert.strictEqual(url, `${definition.baseUrl}/?q=Second&param=testParameter`, "Previous search leaked into the url");
    });
});
