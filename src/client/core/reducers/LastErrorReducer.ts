import * as T from "../actions/ActionTypes";
import { IGenericAction } from "../actions/Actions";

const INITIAL_STATE: Error | any = {};

/**
 * Reduce the busy state of the application
 */
export default function lastError(
    state: Error | any = INITIAL_STATE,
    action: IGenericAction<Error | any>): Error | any {
    switch (action.type) {
        case T.ERROR_OCCURRED:
        case T.SET_ERROR:
            return action.payload;
        case T.CLEAR_ERROR:
            return {};
        default:
            return state;
    }
}
