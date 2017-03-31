import * as Interfaces from "./Interfaces";
import * as fs from "fs";
import * as http from "http";
import * as https from "https";
import * as os from "os";
import * as path from "path";
import * as Enums from "../../shared/Enums";
import AppConstants from "./AppConstants";
import AutoLoader from "./AutoLoader";
import ControllerBootstrapper from "./ControllerBootstrapper";
import express = require("express");
import moment = require("moment");
import { Container } from "inversify";

// Express imports
/* tslint:disable */
let bodyParser = require("body-parser");
let cookieParser = require("cookie-parser");
let session = require("express-session");
let favicon = require("serve-favicon");
let hbs = require("express-handlebars");
/* tslint:enable */

/**
 * Base app with main initialization methods.
 */
export default class BaseApp {

    private lastInitialized: moment.Moment;
    private express: express.Application;
    private bootstrapper: ControllerBootstrapper;

    public constructor(
        private environment: Interfaces.IEnvironmentProvider,
        private logger: Interfaces.ILogger,
        private config: Interfaces.ICoreConfigProvider,
        private kernel: Container,
    ) {
        this.bootstrapper = new ControllerBootstrapper(kernel);
    }

    public initialize(): void {
        this.onInitialize();
        this.initializeExpress();
        this.autoLoad();
        this.initializeCommonMiddleware();
        this.initializeWebpack();
        this.initializeHandlebars();
        this.initializeRoutes();
        this.initializeServer();
        this.onInitialized();
    }

    private autoLoad(): void {
        AutoLoader(path.join(__dirname, AppConstants.FOLDER_CONTROLLERS), this.logger);
    }

    private initializeExpress(): void {
        if (!this.express) {
            this.express = express();
        }
    }

    private initializeCommonMiddleware(): void {
        this.express.use(bodyParser.json());
        this.express.use(bodyParser.urlencoded({ extended: false }));
        this.express.use(cookieParser());


        // Setup the static content
        let clientdir: string = path.join(__dirname, AppConstants.FOLDER_CLIENT);
        let faviconPath: string = path.join(clientdir, "favicon.ico");
        this.assertDir(clientdir);
        this.express.use(express.static(clientdir));
        if (fs.existsSync(faviconPath)) {
            this.express.use(favicon(faviconPath));
        } else {
            this.logger.debug(`Favicon could not be found: ${faviconPath}`);
        }
    }

    private initializeWebpack(): void {
        if (!this.environment.isProduction()) {
            let webpack: any = require("webpack");
            let webpackDevMiddleware: any = require("webpack-dev-middleware");
            let webpackHotMiddleware: any = require("webpack-hot-middleware");
            let webpackConfig: any = require(AppConstants.WEBPACK_CONFIG);
            let wpCompiler: any = new webpack(webpackConfig);
            this.express.use(webpackDevMiddleware(wpCompiler, {
                inline: true,
                noInfo: true,
                path: "/",
                publicPath: "http://localhost:3000/assets/scripts",
                stats: { colors: true },
            }));
            this.express.use(webpackHotMiddleware(wpCompiler));

            this.logger.info("Webpack initialized");
        }
    }

    private initializeHandlebars(): void {
        let viewsdir: string = path.join(__dirname, AppConstants.FOLDER_VIEWS);
        let layoutsdir: string = path.join(__dirname, AppConstants.FOLDER_VIEWS, "layouts");
        let partialsdir: string = path.join(__dirname, AppConstants.FOLDER_VIEWS, "partials");

        this.assertDir(viewsdir);
        this.assertDir(layoutsdir);
        this.assertDir(partialsdir);

        let engine: any = hbs({
            defaultLayout: "layout.hbs",
            extname: "hbs",
            layoutsDir: layoutsdir,
            partialsDir: partialsdir,
        });

        this.express.set("views", viewsdir);
        this.express.engine("hbs", engine);
        this.express.set("view engine", "hbs");
    }

    private initializeRoutes(): void {
        this.bootstrapper.bindRoutes(this.express, this.logger);
    }

    private initializeServer(): void {
        let server: http.Server | https.Server;
        let port: number = this.config.port;
        if (this.config.ssl) {
            // Override the port to the default ssl port 443
            port = AppConstants.SSL_PORT;

            // Assert the certification dir
            this.assertDir(this.config.sslCertLocation);

            // Create the https options
            let options: any = {
                ca: fs.readFileSync(path.join(this.config.sslCertLocation, AppConstants.SSL_PEM_CHAIN)),
                cert: fs.readFileSync(path.join(this.config.sslCertLocation, AppConstants.SSL_PEM_FULLCHAIN)),
                key: fs.readFileSync(path.join(this.config.sslCertLocation, AppConstants.SSL_PEM_PRIVKEY)),
            };

            server = https.createServer(options, this.express as any);

        } else {
            server = http.createServer(this.express as any);

        }

        // Setup the server
        server.listen(port);
        server.on("error", this.onServerErrorHandler(port));
        server.on("close", () => { this.logger.info("Server closed"); });
        server.on("connect", (request: http.ServerRequest) => {
            this.logger.debug(`[${request.method}] ${request.url}`);
        });

        this.logger.info(`Server listening on port ${port} on ${os.hostname()}`);
    }

    private onInitialize(): void {
        let version: string = require(AppConstants.PROJECT_FILE).version;
        let env: string = Enums.Environment[this.environment.getEnvironment()];

        // Start the timer
        this.lastInitialized = moment();

        // Print the title
        this.logger.info("");
        this.logger.info(AppConstants.APP_TITLE);
        this.logger.info(`**** version: ${version} - ${env}`);
        this.logger.debug("");
    }

    private onInitialized(): void {
        let now: moment.Moment = moment();
        let duration: number = moment.duration(now.diff(this.lastInitialized)).asMilliseconds();

        if (duration > AppConstants.MAX_BOOTDURATION) {
            this.logger.warn(`Intialization took longer than ${AppConstants.MAX_BOOTDURATION}ms: ${duration}ms`);
        } else {
            this.logger.info(`Initialization took ${duration}ms`);
        }
    }

    private onServerErrorHandler(port: number): Function {
        return (error: any) => {
            switch (error.code) {
                case "EACCESS":
                    this.logger.fatal(`Port ${port} needs more privileges`);
                    process.exit(1);
                    break;
                case "EADDRINUSE":
                    this.logger.fatal(`Port ${port} is already in use`);
                    process.exit(1);
                    break;
                default:
                    this.logger.error(`Server Error of type ${error.code}: ${error.message}`);
                    this.logger.debug(error);
                    throw error;
            }
        };
    }

    private assertDir(dir: string): void {
        if (!fs.existsSync(dir)) {
            throw new Error(`Directory doesn't exist: ${dir}`);
        }
    }
}
