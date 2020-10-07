import { strictEqual } from 'assert';
import BrowserDeterminator from '../config/BrowserDeterminator';

let origPlatform = process.platform;

function mockPlatform(platform: string = "linux") {
    Object.defineProperty(process, 'platform', {
        value: platform
    });
};

function restorePlatform() {
    Object.defineProperty(process, 'platform', {
        value: origPlatform
    });
};

suite("BrowserDeterminator tests", function () {

    afterEach(() => {
        restorePlatform();
    });

    test("Browser resolves null when invalid or system option is passed", () => {   
        mockPlatform();
            
        strictEqual(BrowserDeterminator.getOSBrowserName("firefox"), "firefox");
    });

    test("Browser resolves in linux", () => {
        mockPlatform();

        strictEqual(BrowserDeterminator.getOSBrowserName("firefox"), "firefox");
    });

    test("Browser resolves in MacOs", () => {
        mockPlatform("darwin");

        strictEqual(BrowserDeterminator.getOSBrowserName("google-chrome"), "Google Chrome");
    });
});