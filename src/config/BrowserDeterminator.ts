type Option = Record<string, string>
type Config = Record<string, Option>

const LinuxBrowserOption: Option = {
    "google-chrome": "google-chrome",
    "firefox": "firefox",
    "safari": "safari",
    "brave": "brave",
};

const WindowsBrowserOption: Option = {
    "google-chrome": "Google Chrome",
    "firefox": "Firefox",
    "safari": "Safari",
    "brave": "Brave"
};

const MacBrowserOption = WindowsBrowserOption;
const SystemOption = "system";

const Config: Config = {
    'win32': WindowsBrowserOption,
    'darwin': MacBrowserOption,
    'openbsd': LinuxBrowserOption,
    'linux': LinuxBrowserOption
};



/**
 * Determinator for browser name depending on platform
 */
export default class BrowserDeterminator {

    private static platform = process.platform;

    private static getOptions(): Option {
        try {
            return Config[this.platform];
        } catch (e) {
            return LinuxBrowserOption;
        }

    }

    /**
     * Return the system dependent name of the browser app.
     * Returns null if not found or system default option is used.
     * @param name
     * @returns [browserName, err]
     */
    public static getOSBrowserName(name: string): [string?, string?] | undefined {
        if (!name || name.length <= 0 || name === SystemOption) {
            return;
        }

        const options = this.getOptions();

        try {
            return [options[name], undefined];
        } catch (error) {
            const msg = `Invalid browser configuration: ${name} valid options are: ${Object.keys(LinuxBrowserOption)}`;
            return [SystemOption, msg];
        }
    }

}