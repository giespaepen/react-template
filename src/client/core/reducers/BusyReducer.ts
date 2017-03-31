import * as T from "../actions/ActionTypes";
import { IDefaultAction } from "../actions/Actions";

const INITIAL_STATE: boolean = false;

/**
 * Reduce the busy state of the application
 */
export default function busy(state: boolean = INITIAL_STATE, action: IDefaultAction): boolean {
    switch (action.type) {
        case T.PROCESS_STARDED:
            return true;
        case T.PROCESS_IDLE:
            return false;
        default:
            return state;
    }
}
