import * as A from "../Actions";
import * as D from "../../Domain";
import * as T from "../ActionTypes";
import { Message } from "../../components/messages/Properties";
import { createDefaultAction, createGenericAction } from "./BaseCreators";

export function createProcessStartedAction(process?: string): A.IGenericAction<string> {
    return createGenericAction<string>(T.PROCESS_STARDED, process || "");
}

export function createProcessIdleAction(): A.IDefaultAction {
    return createDefaultAction(T.PROCESS_IDLE);
}
