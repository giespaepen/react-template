import * as Interfaces from "../core/Interfaces";
import * as attr from "../core/ControllerAttributes";
import Controller from "../core/Controller";
import AppConstants from "../core/AppConstants";
import { injectable, inject } from "inversify";

declare var require: any;

@attr.autowire("/")
@injectable()
export default class IndexController extends Controller {

    private static version: string;
    private logger: Interfaces.ILogger;
    private config: Interfaces.ICoreConfigProvider;

    public constructor(
        @inject("ICoreConfigProvider") config: Interfaces.ICoreConfigProvider,
        @inject("ILogger") logger: Interfaces.ILogger,
    ) {
        super();
        this.logger = logger;
        this.config = config;
        if (!IndexController.version) {
            IndexController.version = require(AppConstants.PROJECT_FILE).version;
        }
    }

    @attr.get("/")
    @attr.view("index")
    public index(): any {
        return { version: IndexController.version };
    }

    @attr.get("version")
    @attr.json()
    public version(): any {
        return { version: IndexController.version };
    }

    @attr.get("config")
    @attr.json()
    public apiKey(): any {
        return {
            apiKey: this.config.apiKey,
            spaceId: this.config.spaceId,
            version: IndexController.version,
        };
    }
}
