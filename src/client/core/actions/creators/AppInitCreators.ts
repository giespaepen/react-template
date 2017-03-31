import * as A from "../Actions";
import * as D from "../../Domain";
import * as T from "../ActionTypes";
import { Message } from "../../components/messages/Properties";
import { createDefaultAction, createGenericAction } from "./BaseCreators";

export function createAppInitAction(): A.IDefaultAction {
    return createDefaultAction(T.APP_INIT);
}

export function createAppConfiguredAction(): A.IDefaultAction {
    return createDefaultAction(T.APP_CONFIGURED);
}

export function createConfigReceivedAction(config: D.IConfig) {
    return createGenericAction<D.IConfig>(T.CONFIG_RECEIVED, config);
}
