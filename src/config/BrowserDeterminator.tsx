// https://github.com/sindresorhus/open/issues/177

const BrowserOption: Record<string, string> = {
    "system": "Default",
    "google-chrome": "Chrome",
    "firefox": "Firefox",
    "safari": "Safari",
    "brave": "Brave",
};

const LinuxBrowserOption: Record<string, string> = {
    Chrome: "google-chrome",
    Firefox: "firefox",
    Safari: "safari",
    Brave: "brave",
};

const WindowsBrowserOption: Record<string, string> = {
    Chrome: "Google Chrome",
    Firefox: "Firefox",
    Safari: "Safari",
    Brave: "Brave"
};

const MacBrowserOption = WindowsBrowserOption;

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
        if (!name || name === "" || name === "system") {
            return;
        }

        let browserKey, browserName;
        const os = this.getOS();

        try {
            browserKey = BrowserOption[name];

            if (browserKey) {
                switch (os) {
                    case "win32": {
                        browserName = WindowsBrowserOption[browserKey];
                        break;
                    }
                    case "darwin": {
                        browserName = MacBrowserOption[browserKey];
                        break;
                    }
                    default: {
                        browserName = LinuxBrowserOption[browserKey];
                        break;
                    }
                }
            }
        } catch (error) {
            console.error("Invalid browser key: ", name, " valid options are: ", BrowserOption)
            return;
        }

        return browserName;
    }

};