import { Environment } from "../../shared/Enums";
import { IEnvironmentProvider } from "./Interfaces";
import { mapEnum } from "../../shared/Utils";
import { injectable } from "inversify";
import { isDevelopment } from "../../client/core/util/ConfigUtils";

/**
 * Simple environment provider to check whether you are working in PRD, DEV etc.
 */
@injectable()
export default class EnvironmentProvider implements IEnvironmentProvider {
    private static currentEnvironment: Environment = undefined;

    public getEnvironment(): Environment {
        if (!EnvironmentProvider.currentEnvironment) {
            let env: Environment | string = undefined;
            if (process && process.env) {
                if (process.env.NODE_ENV) {
                    let envName: string = process.env.NODE_ENV.toLowerCase();
                    let filtered: any = mapEnum(Environment)
                        .filter((e) => e.key.toLowerCase() === envName);

                    if (filtered.length === 1) {
                        env = Environment[filtered[0].key];
                    }
                }
            }

            // Set a default environment if nothing is found
            env = env || Environment.DEV;

            // Set the internal environment
            EnvironmentProvider.currentEnvironment = env as Environment;
            return env as Environment;

        } else {
            return EnvironmentProvider.currentEnvironment;
        }
    }

    public isDevelopment(): boolean {
        return this.getEnvironment() === Environment.DEV;
    }

    public isProduction(): boolean {
        return this.getEnvironment() === Environment.PRD ||
            this.getEnvironment() === Environment.ACC;
    }

    public setEnvironment(env: Environment): void {
        EnvironmentProvider.currentEnvironment = env;
        if (process && process.env) {
            process.env.NODE_ENV = Environment[env];
        }
    }
}
