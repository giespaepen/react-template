import * as A from "../Actions";
import * as D from "../../Domain";
import * as T from "../ActionTypes";
import { Message } from "../../components/messages/Properties";
import { createDefaultAction, createGenericAction } from "./BaseCreators";

export function createErrorOccurredAction(error: Error, errorCode: number): A.IGenericAction<D.ISysError> {
    return createGenericAction(
        T.ERROR_OCCURRED, {
            error,
            errorCode,
        });
}
