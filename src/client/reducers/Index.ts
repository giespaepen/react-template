import busy from "../core/reducers/BusyReducer";
import busyReducer from "../core/reducers//BusyReducer";
import configuredReducer from "../core/reducers/ConfiguredReducer";
import lastErrorReducer from "../core/reducers/LastErrorReducer";
import messagesReducer from "../core/reducers/MessagesReducer";
import { combineReducers, Reducer } from "redux";
import { routerReducer } from "react-router-redux";

/**
 * Hook up all the reducers/
 */
const rootReducer: Reducer<any> = combineReducers({
    busy: busyReducer,
    configured: configuredReducer,
    lastError: lastErrorReducer,
    messages: messagesReducer,
    routing: routerReducer,
});

export default rootReducer;
