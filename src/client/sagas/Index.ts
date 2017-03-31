import Errors from "../core/sagas/common/ErrorSaga";
import Init from "../core/sagas/init/InitSaga";
import Messages from "../core/sagas/messages/MessageSaga";
import UpdateBodyClass from "../core/sagas/common/UpdateBodyClassSaga";
import Title from "../core/sagas/common/TitleSaga";
import { fork } from "redux-saga/effects";

/**
 * Hook up all the saga's
 */
export default function* rootSaga(): IterableIterator<any[]> {
    yield [
        fork(Errors),
        fork(Init),
        fork(Messages),
        fork(Title),
        fork(UpdateBodyClass),
    ];
}
