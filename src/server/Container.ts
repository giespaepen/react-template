import * as Interfaces from "./core/Interfaces";
import CoreConfigProvider from "./core/CoreConfigProvider";
import EnvironmentProvider from "./core/EnvironmentProvider";
import Logger from "./core/Logger";
import { Container } from "inversify";

// Instantiate kernel and dependencies
let kernel: Container = new Container();

kernel.bind<Interfaces.ILogger>("ILogger").to(Logger);
kernel.bind<Interfaces.IEnvironmentProvider>("IEnvironmentProvider").to(EnvironmentProvider);
kernel.bind<Interfaces.ICoreConfigProvider>("ICoreConfigProvider").to(CoreConfigProvider);

export default kernel;
