import * as T from "../actions/ActionTypes";
import { IDefaultAction } from "../actions/Actions";

const INITIAL_STATE: boolean = false;

/**
 * Reduce the configured state of the app
 */
export default function configured(state: boolean = INITIAL_STATE, action: IDefaultAction): boolean {
    switch (action.type) {
        case T.APP_CONFIGURED:
            return true;
        default:
            return state;
    }
}
