import * as A from "../../actions/Actions";
import * as C from "../../actions/ActionCreators";
import * as Constants from "../../Constants";
import * as Routing from "react-router-redux";
import * as T from "../../actions/ActionTypes";
import State from "../../../state/State";
import axios from "axios";
import { Effect, call, select } from "redux-saga/effects";
import { takeLatest } from "redux-saga";

/**
 * Report an error back to the server
 */
function* setWindowTitle(action: A.IGenericAction<string>): IterableIterator<Effect | any> {
    // Report error to the server
    if (action.payload) {
        if (document) {
            let appTitle: string = yield select((state: State) => state.title);
            let title: string = (appTitle) ? `${appTitle} - ${action.payload}` : action.payload;
            document.title = title;
        }
    }
}

function* titleSaga() {
    yield takeLatest(T.SET_PAGE_TITLE, setWindowTitle);
}

export default titleSaga;
