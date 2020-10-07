import { window } from 'vscode';

const LinuxBrowserOption: Record<string, string> = {
    "google-chrome": "google-chrome",
    "firefox": "firefox",
    "safari": "safari",
    "brave": "brave",
};

const WindowsBrowserOption: Record<string, string> = {
    "google-chrome": "Google Chrome",
    "firefox": "Firefox",
    "safari": "Safari",
    "brave": "Brave"
};

const MacBrowserOption = WindowsBrowserOption;

const SystemOption = "system";

/**
 * Determinator for browser name depending on platform
 */
export default class BrowserDeterminator {
    private static getOS(): string {
        return process.platform;
    }

    /**
     * Return the system dependent name of the browser app.
     * Returns null if not found or system default option is used.
     * @param name 
     */
    public static getOSBrowserName(name: string): string | undefined {
        if (!name || name.length <= 0 || name === SystemOption) {
            return;
        }

        let browserName;
        const os = this.getOS();

        try {
            switch (os) {
                case "win32": {
                    browserName = WindowsBrowserOption[name];
                    break;
                }
                case "darwin": {
                    browserName = MacBrowserOption[name];
                    break;
                }
                default: {
                    browserName = LinuxBrowserOption[name];
                    break;
                }
            }

        } catch (error) {
            const msg = `Invalid browser configuration: ${name} valid options are: ${Object.keys(LinuxBrowserOption)}`;
            window.showErrorMessage(msg);
            return;
        }

        return browserName;
    }

};