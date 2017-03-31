import { createStore, Store } from "redux";
import TestReducer from "./TestReducer";

export default function createTestStore(preloadedState: any): { reducer: TestReducer, store: Store<any> } {
    let reducer: TestReducer = new TestReducer();
    let store: Store<any> = createStore(reducer.createReducerHandler(), preloadedState);
    return { reducer, store };
}
