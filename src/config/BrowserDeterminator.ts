import { window } from 'vscode';

const LinuxBrowserOption: Record<string, string> = {
    "google-chrome": "google-chrome",
    "firefox": "firefox",
    "brave": "brave-browser",
};

const WindowsBrowserOption: Record<string, string> = {
    "google-chrome": "chrome",
    "firefox": "firefox",
    "brave": "brave"
};

const MacBrowserOption: Record<string, string> = {
    "google-chrome": "Google Chrome",
    "firefox": "Firefox",
    "safari": "Safari",
    "brave": "Brave Browser"
};

const SystemOption = "system";

/**
 * Determinator for browser name depending on platform
 */
export default class BrowserDeterminator {
    private static getOS(): string {
        return process.platform;
    }

    /**
     * The browser names known to the current platform.
     */
    private static getPlatformOptions(): Record<string, string> {
        switch (this.getOS()) {
            case "win32":
                return WindowsBrowserOption;
            case "darwin":
                return MacBrowserOption;
            default:
                return LinuxBrowserOption;
        }
    }

    /**
     * Return the system dependent name of the browser app.
     * Returns undefined if not found or the system default option is used.
     * @param name the configured browser, e.g. firefox
     */
    public static getOSBrowserName(name: string | undefined): string | undefined {
        if (!name || name.length <= 0 || name === SystemOption) {
            return;
        }

        const platformOptions = this.getPlatformOptions();
        const browserName = platformOptions[name];

        if (!browserName) {
            const valid = [SystemOption, ...Object.keys(platformOptions)].join(", ");
            window.showErrorMessage(`Web Search: invalid browser configuration '${name}'. Valid options on this platform are: ${valid}`);
            return;
        }

        return browserName;
    }

}
