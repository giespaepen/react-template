import * as T from "../actions/ActionTypes";
import { IGenericAction } from "../actions/Actions";

const INITIAL_STATE: string = "";

/**
 * Set the app title to the state
 */
export default function configured(state: string = INITIAL_STATE, action: IGenericAction<string>): string {
    switch (action.type) {
        case T.SET_APP_TITLE:
            return action.payload;
        default:
            return state;
    }
}
