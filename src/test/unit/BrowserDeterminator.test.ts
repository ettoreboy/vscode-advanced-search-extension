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

    test("Browser resolves to default when empty or system option is passed", () => {   
        mockPlatform();

        const browser = BrowserDeterminator.getOSBrowserName("");
            
        strictEqual(browser?.[0], "system");

        restorePlatform();
    });

    test("Browser resolves to default if key does not exists", () => {   
        mockPlatform();
        
        const browser = BrowserDeterminator.getOSBrowserName("trololo");

        strictEqual(browser?.[0], "system");
        strictEqual(browser?.[1], "Invalid browser configuration trololo - valid options are: google-chrome,firefox,safari,brave");

        restorePlatform();
    });

    test("Browser resolves in linux", () => {
        mockPlatform();

        let browser = BrowserDeterminator.getOSBrowserName("firefox");

        strictEqual(browser?.[0], "firefox");

        browser = BrowserDeterminator.getOSBrowserName("google-chrome");

        strictEqual(browser?.[0], "google-chrome");

        restorePlatform();
    });

    test("Browser resolves in MacOs", () => {
        mockPlatform("darwin");

        const browser = BrowserDeterminator.getOSBrowserName("google-chrome");

        strictEqual(browser?.[0], "Google Chrome");

        restorePlatform();
    });


    test("Browser resolves in Windows", () => {
        mockPlatform("win32");

        const browser = BrowserDeterminator.getOSBrowserName("google-chrome");

        strictEqual(browser?.[0], "Google Chrome");

        restorePlatform();
    });
});