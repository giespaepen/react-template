"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enums = require("../../../shared/Enums");
const Utils_1 = require("../../../shared/Utils");
function isDevelopment() {
    return checkEnvironment(Enums.Environment.DEV, true);
}
exports.isDevelopment = isDevelopment;
function getEnvironment() {
    return Config.environment.toLowerCase();
}
exports.getEnvironment = getEnvironment;
function getVersion() {
    return Config.version;
}
exports.getVersion = getVersion;
function checkEnvironment(expected, defaultValue) {
    if (Config.environment) {
        let envName = Config.environment.toLowerCase();
        let env = undefined;
        let filtered = Utils_1.mapEnum(Enums.Environment)
            .filter((e) => e.key.toLowerCase() === envName);
        if (filtered.length === 1) {
            env = Enums.Environment[filtered[0].key];
        }
        return env === expected;
    }
    return defaultValue;
}
//# sourceMappingURL=ConfigUtils.js.map