import * as A from "../../actions/Actions";
import * as C from "../../actions/ActionCreators";
import * as Constants from "../../Constants";
import * as D from "../../Domain";
import * as T from "../../actions/ActionTypes";
import State from "../../../state/State";
import axios from "axios";
import wait from "../common/WaitSaga";
import { put, call, Effect, select, take } from "redux-saga/effects";
import { takeLatest, takeEvery } from "redux-saga";

/**
 * Main initialization saga. This will load the config and the index of items
 */
function* init(action: A.IDefaultAction): IterableIterator<Effect | any> {
    // Get the config
    let config: D.IConfig = yield select((state: State) => state.config);

    // If not there, load it from the server
    if (!config || Object.keys(config).length === 0) {
        let configResponse: D.IAxiosResponse<D.IConfig> = yield call(axios.get, Constants.CONFIG_ENDPOINT);
        if (configResponse && configResponse.data) {
            config = configResponse.data;

            // Set the state
            yield put(C.createConfigReceivedAction(config));

        } else {
            throw new Error("No valid response received");
        }

        // Dispatch the app configured signal
        yield put(C.createAppConfiguredAction());
    }
}

/**
 * Init watcher
 */
function* initSaga(): IterableIterator<any> {
    // Listen to the following actions in sequence
    yield takeEvery(T.APP_INIT, init);
}

/**
 * Configure the axios client
 */
function configureAxiosAuthorization(apiKey: string) {
    // tslint:disable-next-line
    axios.defaults.headers.common["Authorization"] = "Bearer " + apiKey;
}

export default initSaga;
