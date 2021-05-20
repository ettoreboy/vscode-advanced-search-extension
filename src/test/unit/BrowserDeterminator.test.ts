import { strictEqual } from 'assert';
import BrowserDeterminator from '../../config/BrowserDeterminator';

const origPlatform = process.platform;

function mockPlatform(platform = "linux") {
    Object.defineProperty(process, 'platform', {
        value: platform
    });
}

function restorePlatform() {
    Object.defineProperty(process, 'platform', {
        value: origPlatform
    });
}

suite("BrowserDeterminator tests", function () {

    test("Browser resolves undefined when empty or system option is passed", () => {   
        mockPlatform();
            
        strictEqual(BrowserDeterminator.getOSBrowserName(""), undefined);

        strictEqual(BrowserDeterminator.getOSBrowserName("system"), undefined);

        restorePlatform();
    });

    test("Browser resolves to default if key does not exists", () => {   
        mockPlatform();
            
        strictEqual(BrowserDeterminator.getOSBrowserName("trololo"), ["system", ""]);

        restorePlatform();
    });

    test("Browser resolves in linux", () => {
        mockPlatform();

        strictEqual(BrowserDeterminator.getOSBrowserName("firefox"), ["firefox", undefined]);

        restorePlatform();
    });

    test("Browser resolves in MacOs", () => {
        mockPlatform("darwin");

        strictEqual(BrowserDeterminator.getOSBrowserName("google-chrome"), ["Google Chrome", undefined]);

        restorePlatform();
    });


    test("Browser resolves in MacOs", () => {
        mockPlatform("win32");

        strictEqual(BrowserDeterminator.getOSBrowserName("google-chrome"), ["Google Chrome", undefined]);

        restorePlatform();
    });
});