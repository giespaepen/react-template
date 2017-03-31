import * as Enums from "../../shared/Enums";

/**
 * Logger interface
 */
export interface ILogger {
    debug(...params: any[]): void;
    error(...params: any[]): void;
    fatal(...params: any[]): void;
    info(...params: any[]): void;
    warn(...params: any[]): void;
}

/**
 * Environment provider
 */
export interface IEnvironmentProvider {
    getEnvironment(): Enums.Environment;
    isDevelopment(): boolean;
    isProduction(): boolean;
    setEnvironment(env: Enums.Environment): void;
}

/**
 * Core config provider
 */
export interface ICoreConfigProvider {
    apiKey: string;
    appTitle: string;
    logDir: string;
    port: number;
    spaceId: string;
    ssl: boolean;
    sslCertLocation: string;
}
