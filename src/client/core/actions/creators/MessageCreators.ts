import * as A from "../Actions";
import * as D from "../../Domain";
import * as T from "../ActionTypes";
import { Message } from "../../components/messages/Properties";
import { createDefaultAction, createGenericAction } from "./BaseCreators";

export function createMessageAction(text: string, type?: string): A.IGenericAction<D.IMessage> {
    let isPersistent: boolean = (type && type.length > 0 && type[0].toLowerCase() === "f") ? true : false;
    return createGenericAction<D.IMessage>(T.MESSAGES_NEW, new Message(text, type, isPersistent));
}

export function createMessageHideAction(id: number): A.IGenericAction<number> {
    return createGenericAction<number>(T.MESSAGES_HIDE, id);
}

export function createMessageHideAllAction(): A.IDefaultAction {
    return createDefaultAction(T.MESSAGES_HIDE_ALL);
}
