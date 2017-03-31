import * as Enums from "./ControllerEnums";
import AppConstants from "./AppConstants";
import Controller from "./Controller";
import ControllerBootstrapper from "./ControllerBootstrapper";
import { Request, Response } from "express";
import EnvironmentProvider from "./EnvironmentProvider";
import { isDevelopment } from "../../client/core/util/ConfigUtils";

/**
 * ACTION ATTRIBUTES
 * -----------------
 */

/**
 * GET actionfilter decorator
 */
export function get(path?: string): Function {
    return createActionAttribute(Enums.ActionType.GET, path);
}

/**
 * POST actionfilter decorator
 */
export function post(path?: string): Function {
    return createActionAttribute(Enums.ActionType.POST, path);
}

/**
 * PATCH actionfilter decorator
 */
export function patch(path?: string): Function {
    return createActionAttribute(Enums.ActionType.PATCH, path);
}

/**
 * PUT actionfilter decorator
 */
export function put(path?: string): Function {
    return createActionAttribute(Enums.ActionType.PUT, path);
}

/**
 * Delete actionfilter decorator
 */
export function del(path?: string): Function {
    return createActionAttribute(Enums.ActionType.DELETE, path);
}

/**
 * RESPONSE ATTRIBUTES
 * -------------------
 */

/**
 * Transmit raw data
 */
export function raw(): Function {
    return createViewAttribute(Enums.ViewType.RAW);
}

/**
 * Transmit a view
 */
export function view(view: string): Function {
    return createViewAttribute(Enums.ViewType.VIEW, view);
}

/**
 * Transmit json data
 */
export function json(): Function {
    return createViewAttribute(Enums.ViewType.JSON);
}

/**
 * CONTROLLER ATTRIBUTES
 * ---------------------
 */

export function autowire(path: string = ""): Function {
    return (target: Function) => {
        if (path === "") {
            path = AppConstants.SITE_ROOT + target.name.toLowerCase().replace("controller", "");
        }
        ControllerBootstrapper.registerController(target, path);
    };
}


/**
 * INTERNALS
 * ---------
 */

// Internal function to create an action attribute
function createActionAttribute(type: Enums.ActionType, path?: string): Function {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (isTarget(target)) {
            path = fixPath(propertyKey, path);
            ControllerBootstrapper.registerActionFilter(
                target.constructor.name, propertyKey, type, path
            );
        } else {
            throw new Error("Action attribute cannot be used on a non Controller class");
        }
    };
}

// Internal function to wrap a response dispatch. If a controller returns an promise, this promise is awaited
function createViewAttribute(type: Enums.ViewType, view?: string, layout?: string): Function {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        if (isTarget(target)) {
            let method: any = descriptor.value;
            descriptor.value = function (request: Request, response: Response, next: Function): void {
                try {
                    // Find the controller instance
                    let controller: Controller = ControllerBootstrapper.findControllerInstance(target.constructor.name);
                    // Apply the method
                    let data: any = method.apply(controller, [new ActionContext(request, response)]);
                    if (data && (data instanceof Promise || data.then)) {
                        // Wait for the promise and return the data
                        (data as Promise<any>).then((asyncData) => {
                            // Add layout to the data object
                            if (layout) {
                                asyncData.layout = layout;
                            }
                            dispatchResponse(type, asyncData, response, view);
                        }).catch((e) => {
                            response.status(500);
                            dispatchResponse(type, e, response, view);
                        });
                    } else {
                        // Add layout to the data object
                        if (layout) {
                            data.layout = layout;
                        }
                        dispatchResponse(type, data, response, view);
                    }
                } catch (e) {
                    console.error(e);
                    response.status(500);
                    dispatchResponse(type, e, response, view);
                }
            };
            return descriptor;
        }
    };
}

// Wrapper to the response object to effectively dispatch the final view
function dispatchResponse(type: Enums.ViewType, data: any, response: Response, view?: string): void {
    switch (type) {
        case Enums.ViewType.VIEW:
            // Ensure the data
            if (!data) { data = {}; }

            // Try to set the isDevelopment parameter
            try {
                data.isDevelopment = (new EnvironmentProvider()).isDevelopment();
            } catch (e) {
                data.isDevelopment = true;
            }

            if (view) {
                response.render(view, data);
            } else {
                throw new Error("View is not defined!");
            }
            break;
        case Enums.ViewType.JSON:
            response.json(data);
            break;
        case Enums.ViewType.RAW:
        /* tslint:disable-next-line */
        default:
            response.send(data);
            break;
    }
}

// Check if the target is correct for the decorator
function isTarget(target: any): boolean {
    return typeof target === "object" && target instanceof Controller;
}

// Fix the path, change tilde to the propertykey and return a valid path
function fixPath(propertyKey: string, path?: string): string {
    // Set the path if not defined
    if (path === undefined) {
        path = "/" + propertyKey;
    }

    // Replace the tilde
    path = path.replace("~", propertyKey);

    // Fix the starting tilde
    if (!path.startsWith("/")) {
        path = "/" + path;
    }

    // Return the path
    return path.toLowerCase();
}

// Actionfilter storage item
export class ActionFilter {
    public constructor(
        public className: string,
        public key: string,
        public type: Enums.ActionType,
        public path?: string
    ) {
        if (!this.path || this.path === "") {
            this.path = "/" + this.key.toLowerCase();
        }
        if (!this.path.startsWith("/")) {
            this.path = "/" + this.path;
        }
    }

    public getPath(): string {
        return this.path;
    }
}


// Action context wrapping the request and response objects
// tslint:disable-next-line:max-classes-per-file
export class ActionContext {

    public urlParams: { [key: string]: string } = {};
    public body: any = undefined;

    public constructor(public request: Request, public response: Response) {
        this.urlParams = this.parseParams();
        this.body = this.parseBody();
    }

    private parseBody(): any {
        if (this.request.body) {
            return this.request.body;
        }
    }

    private parseParams(): { [key: string]: string } {
        if (this.request.params) {
            return this.request.params as ({ [key: string]: string });
        }
    }
}
