import * as fs from "fs";
import * as path from "path";
import * as winston from "winston";
import { ILogger } from "./Interfaces";
import { Environment } from "../../shared/Enums";
import EnvironmentProvider from "./EnvironmentProvider";
import { injectable } from "inversify";
import AppConstants from "./AppConstants";

/**
 * Simple logger wrapper around a concrete logger instance, Winston in this case
 * Ref: https://github.com/winstonjs/winston 
 */
@injectable()
export default class Logger implements ILogger {

    private internalLogger: winston.LoggerInstance;
    private environment: EnvironmentProvider;
    private logDir: string = process.env.NODE_LOG || AppConstants.LOG_DIR;

    public constructor() {
        this.environment = new EnvironmentProvider();
        this.ensureDirectory();
        this.initializeLogger();
    }

    public debug(...params: any[]): void {
        if (!this.environment.isProduction()) {
            let message: string = this.paramsToString(params);
            this.internalLogger.debug(message);
        }
    }

    public error(...params: any[]): void {
        let message: string = this.paramsToString(params);
        this.internalLogger.error(message);
    }

    public info(...params: any[]): void {
        let message: string = this.paramsToString(params);
        this.internalLogger.info(message);
    }

    public warn(...params: any[]): void {
        let message: string = this.paramsToString(params);
        this.internalLogger.warn(message);
    }

    public fatal(...params: any[]): void {
        let message: string = this.paramsToString(params);
        this.internalLogger.error("FATAL! >> " + message);
    }

    private ensureDirectory(): void {
        if (!fs.existsSync(this.logDir)) {
            fs.mkdirSync(this.logDir);
        }
    }

    private initializeLogger(): void {
        this.internalLogger = new winston.Logger({
            timestamp: true,
            transports: [
                new (winston.transports.Console)({
                    colorize: true,
                    level: "debug",
                    prettyPrint: true,
                    silent: false,
                    timestamp: false,
                }),
                new (winston.transports.File)({
                    filename: path.join(this.logDir, Environment[this.environment.getEnvironment()] + ".log"),
                }),
            ],
        });
    }

    private paramsToString(...params: any[]): string {
        return params.map(((value) => value.toString())).join(" ");
    }
}
