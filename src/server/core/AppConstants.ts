/**
 * Constant class with configurable parameters. The folder names are
 * relative to the location of the BaseApp class!
 */
export default class AppConstants {
    public static APP_TITLE = "React-Template";
    public static DEFAULT_LAYOUT: string = "layout";
    public static DEV_PORT: number = 3000;
    public static FOLDER_CLIENT: string = "../../client";
    public static FOLDER_CONTROLLERS: string = "../controllers";
    public static FOLDER_VIEWS: string = "../../client/views";
    public static LOG_DIR = "./log";
    public static MAX_BOOTDURATION: number = 1000;
    public static PROJECT_FILE: string = "../../../package.json";
    public static SITE_ROOT: string = "/";
    public static SSL_PEM_CHAIN: string = "chain.pem";
    public static SSL_PEM_FULLCHAIN: string = "fullchain.pem";
    public static SSL_PEM_PRIVKEY: string = "privkey.pem";
    public static SSL_PORT: number = 443;
    public static WEBPACK_CONFIG: string = "../../client/webpack.config";
}
