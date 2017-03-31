import * as A from "../Actions";
import * as D from "../../Domain";
import * as T from "../ActionTypes";
import { Message } from "../../components/messages/Properties";
import { createDefaultAction, createGenericAction } from "./BaseCreators";

export function createSetPageTitleAction(title: string): A.IGenericAction<string> {
    if (title && title !== "") {
        return createGenericAction<string>(T.SET_PAGE_TITLE, title);
    }
}
