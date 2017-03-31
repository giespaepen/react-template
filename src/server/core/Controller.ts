import {ActionContext} from "./ControllerAttributes";
import {injectable} from "inversify";

/**
 * A basic controller class to be used with express
 */
@injectable()
export default class Controller {
    public basePath: string = "";

    public getBaseUrl(context: ActionContext, siteroot: string = "/"): string {

        // Get all the parts
        let host: string = context.request.hostname;
        let port: number = context.request.socket.localPort;
        let protocol: string = (context.request.secure) ? "https" : "http";

        // Correct the siteroot
        siteroot = (siteroot[0] === "/") ? siteroot : `/${siteroot}`;

        return `${protocol}://${host}:` + `${port}${siteroot}/${this.basePath}`.replace("//", "/");
    }
}
