import { ICoreConfigProvider } from "./Interfaces";
import { injectable } from "inversify";
import AppConstants from "./AppConstants";

/**
 * Configuration provider for the core classes
 */
@injectable()
export default class CoreConfigProvider implements ICoreConfigProvider {
    public get appTitle(): string {
        return process.env.APP_TITLE || AppConstants.APP_TITLE;
    }

    public get apiKey(): string {
        return process.env.CR_APIKEY || "";
    }

    public get spaceId(): string {
        return process.env.CR_SPACEID || "";
    }

    public get logDir(): string {
        return process.env.LOG_DIR || AppConstants.LOG_DIR;
    }

    public get port(): number {
        return process.env.NODE_PORT || 3000;
    }

    public get ssl(): boolean {
        return false;
    }

    public get sslCertLocation(): string {
        return "/";
    }
}
