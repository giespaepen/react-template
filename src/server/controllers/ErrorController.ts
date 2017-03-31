import * as Interfaces from "../core/Interfaces";
import * as attr from "../core/ControllerAttributes";
import AppConstants from "../core/AppConstants";
import Controller from "../core/Controller";
import { ActionContext } from "../core/ControllerAttributes";
import { injectable, inject } from "inversify";

@attr.autowire("/error")
@injectable()
export default class ErrorController extends Controller {

    private logger: Interfaces.ILogger;
    private env: Interfaces.IEnvironmentProvider;


    public constructor(
        @inject("IEnvironmentProvider") config: Interfaces.IEnvironmentProvider,
        @inject("ILogger") logger: Interfaces.ILogger,
    ) {
        super();
        this.logger = logger;
        this.env = config;
    }

    @attr.post("/")
    @attr.json()
    public log(context: ActionContext): any {
        let error: Error = context.body;
        let ip: string = context.request.connection.remoteAddress;
        let prefix: string = "CLIENT ERROR";
        this.logger.error(prefix, ip);
        if (error.message) {
            this.logger.error(prefix, error.message);
        }

        if (!this.env.isProduction() && error.stack) {
            this.logger.error(prefix, error.stack);
        }

        return {};
    }
}
