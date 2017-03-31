import * as logger from "redux-logger";
import createSagaMiddleware from "redux-saga";
import rootReducer from "../../reducers/Index";
import rootSaga from "../../sagas/Index";
import { applyMiddleware, compose, createStore, Store } from "redux";
import { isDevelopment } from "../util/ConfigUtils";

// Get the initial state
const INITIAL_STATE: any = {};

// Setup Saga and the store
const sagaMiddleware: any = createSagaMiddleware();
const store: Store<any> = createStore(
    rootReducer,
    INITIAL_STATE,
    compose(
        (isDevelopment() ? applyMiddleware(logger(), sagaMiddleware) : applyMiddleware(sagaMiddleware)),
        (window as any).devToolsExtension ? (window as any).devToolsExtension() : (f: any) => f,
    ),
);

// Hook up the saga middleware
sagaMiddleware.run(rootSaga);

export default store;
