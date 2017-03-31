import * as fs from "fs";
import * as path from "path";
import { ILogger } from "./Interfaces";

const JS_EXTENSION: string = ".js";

/**
 * Autload function to search for classes in the given basePath directory
 */
export default function (basePath: string, logger?: ILogger): void {
    if (fs.existsSync(basePath)) {
        fs.readdirSync(basePath)
            .filter(f => f.endsWith(JS_EXTENSION))
            .forEach(f => {
                let requirePath: string = path.join(basePath, f.replace(JS_EXTENSION, ""));
                if (logger) {
                    logger.debug(`Autload: ${requirePath}`);
                }
                require(requirePath);
            });
    } else {
        throw new Error(`Cannot autoload controllers, ${path} does not exist`);
    }
}
