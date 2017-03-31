import "reflect-metadata";
import * as Interfaces from "./core/Interfaces";
import BaseApp from "./core/BaseApp";
import Container from "./Container";

export default class App extends BaseApp {

    public static Boot(): void {
        // Create and initialize the app
        // process.chdir("..");
        let app: App = App.Create();
        app.initialize();
    }

    public static Create(): App {
        let app: App = new App(
            Container.get<Interfaces.IEnvironmentProvider>("IEnvironmentProvider"),
            Container.get<Interfaces.ILogger>("ILogger"),
            Container.get<Interfaces.ICoreConfigProvider>("ICoreConfigProvider"),
        );
        return app;
    }

    public constructor(
        environment: Interfaces.IEnvironmentProvider,
        logger: Interfaces.ILogger,
        config: Interfaces.ICoreConfigProvider
    ) {
        super(environment, logger, config, Container);
    }

}

// Boot the app
App.Boot();
