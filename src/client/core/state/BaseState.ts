// import * as Immutable from "immutable";
import * as D from "../Domain";
import * as Immutable from "immutable";

/**
 * Main application state for redux
 */
export default class BaseState {
    public busy: boolean;
    public config: D.IConfig;
    public configured: boolean;
    public lastError: Error;
    public messages: Immutable.List<D.IMessage>;
    public title: string;
}
