import * as Enums from "./ControllerEnums";
import * as Express from "express";
import * as Interfaces from "./Interfaces";
import Controller from "./Controller";
import { ActionFilter } from "./ControllerAttributes";
import { Container } from "inversify";
import { Router, RequestHandler, Request, Response, NextFunction } from "express";


/**
 * Stores the registered (read autowired) controllers and defined actions.
 * Exposes methods to bind those registered controllers to routes in ExpressJS.
 */
export default class ControllerBootstrapper {

    // Register a controller
    public static registerController(target: Function, basePath: string): void {
        let key: string = target.name;
        ControllerBootstrapper.kernel.bind(key).to(target as any);
        let instance: Controller = ControllerBootstrapper.kernel.get(key) as Controller;
        instance.basePath = basePath;
        ControllerBootstrapper.controllers[key] = instance;
    }

    // Register an action filter
    public static registerActionFilter(className: string, key: string, actionType: Enums.ActionType, path?: string):
        void {
        if (!this.isActionRegistered(className, key)) {
            ControllerBootstrapper.actions.push(
                new ActionFilter(
                    className, key, actionType, path
                ));
        }
    }

    // Find a registered controller
    public static findControllerInstance(key: string): Controller {
        return ControllerBootstrapper.controllers[key];
    }

    // Reset the bootstrapper for testing purposes only
    public static resetBootstrapper(): void {
        ControllerBootstrapper.actions = [];
        ControllerBootstrapper.controllers = [];
    }

    // Storage for all the defined actionfilters
    private static actions: ActionFilter[] = [];
    private static controllers: Controller[] = [];
    private static kernel: Container;

    // Avoid double registration of actionfilters
    private static isActionRegistered(className: string, key: string): void {
        ControllerBootstrapper.actions.filter((value) =>
            value.className !== className && value.key !== key
        );
    }

    public constructor(kernel?: Container) {
        if (kernel) {
            ControllerBootstrapper.kernel = kernel;
        } else {
            if (!ControllerBootstrapper.kernel) {
                throw new Error("Cannot initialize ControllerBootstrapper when no kernel is defined");
            }
        }
    }

    // Get the registered actions
    public getRegisteredActions(): ActionFilter[] {
        return ControllerBootstrapper.actions;
    }

    public bindRoutes(express: Express.Application, logger: Interfaces.ILogger): void {
        for (let key in ControllerBootstrapper.controllers) {
            if (ControllerBootstrapper.controllers[key]) {
                logger.info(`Binding routes of ${key}`);
                let router: Router = Express.Router();
                let target: Controller = ControllerBootstrapper.controllers[key];
                let actions: ActionFilter[] = this.getRegisteredActions().filter((value, index) => {
                    return value.className === key;
                });

                // Configure the router
                actions.forEach((value, index) => {
                    logger.debug(`-> ${Enums.ActionType[value.type]} ${(target.basePath + value.getPath()).replace("//", "/")}`);
                    switch (value.type) {
                        case Enums.ActionType.GET:
                            router.get(
                                value.getPath(),
                                this.wrapRequestHandler(value.type, value.getPath(), target[value.key] as RequestHandler, logger));
                            break;
                        case Enums.ActionType.POST:
                            router.post(
                                value.getPath(),
                                this.wrapRequestHandler(value.type, value.getPath(), target[value.key] as RequestHandler, logger));
                            break;
                        case Enums.ActionType.PATCH:
                            router.patch(
                                value.getPath(),
                                this.wrapRequestHandler(value.type, value.getPath(), target[value.key] as RequestHandler, logger));
                            break;
                        case Enums.ActionType.PUT:
                            router.put(
                                value.getPath(),
                                this.wrapRequestHandler(value.type, value.getPath(), target[value.key] as RequestHandler, logger));
                            break;
                        case Enums.ActionType.DELETE:
                            router.delete(
                                value.getPath(),
                                this.wrapRequestHandler(value.type, value.getPath(), target[value.key] as RequestHandler, logger));
                            break;
                        default:
                            break;
                    }
                });

                // Bind the router to express
                express.use(target.basePath, router);
            }
        }
    }

    private wrapRequestHandler(type: Enums.ActionType, path: string, handler: RequestHandler, logger: Interfaces.ILogger): RequestHandler {
        return (req: Request, res: Response, next: NextFunction) => {
            logger.debug(`ACCESS: ${Enums.ActionType[type]} ${req.path}`);
            return handler(req, res, next);
        };
    }
}
