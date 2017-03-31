import * as A from "../../actions/Actions";
import * as C from "../../actions/ActionCreators";
import * as Domain from "../../Domain";
import * as T from "../../actions/ActionTypes";
import wait from "../common/WaitSaga";
import { put, Effect, select } from "redux-saga/effects";
import { takeLatest, takeEvery } from "redux-saga";
import State from "../../../state/State";

const HIDEMESSAGEDELAY: number = 10 * 1000;

/**
 * Saga to delay the removal of a message
 */
function* delayMessageHide(action: A.IGenericAction<Domain.IMessage>): IterableIterator<Effect | any> {
    if (!action.payload.isPersistent) {
        yield wait(HIDEMESSAGEDELAY);
        yield put(C.createMessageHideAction(action.payload.id));
    }
}

/**
 * Helper function
 */
function* convertErrorsToMessages(action: A.IGenericAction<Error>): IterableIterator<Effect | any> {
    if (action.payload) {
        yield put(C.createMessageAction(action.payload.message, "error"));
    }
}

/**
 * Saga watcher
 */
function* messageSaga(): IterableIterator<any> {
    // Listen to the following actions in sequence
    yield takeEvery(T.MESSAGES_NEW, delayMessageHide);

    // Take every error and convert it to a message
    yield takeEvery(T.ERROR_OCCURRED, convertErrorsToMessages);
}

export default messageSaga;
