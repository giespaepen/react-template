import * as Enums from "../../../shared/Enums";
import { IConfig } from "../Domain";
import { mapEnum } from "../../../shared/Utils";

declare var Config: IConfig;

export function isDevelopment(): boolean {
    return checkEnvironment(Enums.Environment.DEV, true);
}

export function getEnvironment(): string {
    return Config.environment.toLowerCase();
}

export function getVersion(): string {
    return Config.version;
}

function checkEnvironment(expected: Enums.Environment, defaultValue: boolean) {
    if (Config.environment) {
        // Set the env to lowercase
        let envName: string = Config.environment.toLowerCase();

        // Set a needle and find it
        let env: Enums.Environment | string = undefined;
        let filtered: any = mapEnum(Enums.Environment)
            .filter((e) => e.key.toLowerCase() === envName);

        // Set it if found
        if (filtered.length === 1) {
            env = Enums.Environment[filtered[0].key];
        }

        // Check wether it is true
        return env === expected;
    }
    return defaultValue;
}
