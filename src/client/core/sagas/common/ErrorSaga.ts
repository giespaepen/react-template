import * as A from "../../actions/Actions";
import * as C from "../../actions/ActionCreators";
import * as Constants from "../../Constants";
import * as D from "../../Domain";
import * as Routing from "react-router-redux";
import * as T from "../../actions/ActionTypes";
import axios from "axios";
import { Effect, call } from "redux-saga/effects";
import { hashHistory } from "react-router";
import { takeEvery } from "redux-saga";

/**
 * Report an error back to the server
 */
function* reportError(action: A.IGenericAction<D.ISysError>): IterableIterator<Effect | any> {
    // Report error to the server
    if (action.payload.error) {
        let error: Error = action.payload.error;

        // Log it on the server
        yield call(axios.post, Constants.ERROR_ENDPOINT, {
            messages: error.message,
            name: error.name,
            stack: error.stack,
        });

        // Relay to the error route
        hashHistory.push("/error/" + action.payload.errorCode);
    } else {
        console.warn("The action did'nt contain any error");
    }
}

function* errorSaga() {
    yield takeEvery([T.ERROR_OCCURRED, T.SET_ERROR], reportError);
}

export default errorSaga;
