import open = require("open");

type Option = Record<string, string>
type Config = Record<string, Option>


const LinuxBrowserOption: Option = {
    "google-chrome": open.apps.chrome[0],
    "firefox": open.apps.firefox.toString(),
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
    'linux': LinuxBrowserOption
};



/**
 * Determinator for browser name depending on platform
 */
export default class BrowserDeterminator {

    private static getOptions(): Option {
        try {
            return Config[process.platform];
        } catch (e) {
            return LinuxBrowserOption;
        }

    }

    public static getDefault(): string {
        return SystemOption;
    }

    /**
     * Return the system dependent name of the browser app and a message.
     * @param name
     * @returns [browserName, err] - err is optional
     */
    public static getOSBrowserName(name: string | undefined): [string, string?] {
        if (!name || name.length <= 0 || name === SystemOption) {
            return [SystemOption, undefined];
        }

        const options = this.getOptions();

        try {
            const systemBrowserName = options[name];
            if (!systemBrowserName) {
                throw new Error("Not found");
            }
            return [systemBrowserName, undefined];
        } catch (error) {
            const msg = `Invalid browser configuration ${name} - valid options are: ${Object.keys(LinuxBrowserOption)}`;
            return [SystemOption, msg];
        }
    }

}