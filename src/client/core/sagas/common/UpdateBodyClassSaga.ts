import * as C from "../../actions/ActionCreators";
import * as Routing from "react-router-redux";
import { Effect } from "redux-saga/effects";
import { takeLatest } from "redux-saga";

/**
 * Saga handler to load the strings
 */
function* updateBodyClass(action: Routing.RouterAction): IterableIterator<Effect | any> {
    if (document && document.body) {
        let suffix: string = (action.payload as any).pathname.split("/").pop();
        let className: string = "body--" + suffix;
        document.body.className = className;
    }
}

/**
 * Saga watcher to watch every latest LANGUAGE_CHANGED action
 */
function* updateBodyClassSaga(): IterableIterator<any> {
    yield takeLatest(Routing.LOCATION_CHANGE, updateBodyClass as any);
}

export default updateBodyClassSaga;
