import { IGenericAction } from "../../core/actions/Actions";
import { Action } from "redux";

type RootTestReducer = (state: any, action: IGenericAction<any>) => any;

/**
 * TestReducer to be used in jest
 */
export default class TestReducer {
    private counter: number = 0;
    private lastAction: IGenericAction<any>;

    public getCounter() {
        return this.counter;
    }

    public getLastAction() {
        return this.lastAction;
    }

    public createReducerHandler(): RootTestReducer {
        return (state: any, action: IGenericAction<any>) => {
            this.counter++;
            this.lastAction = action;
            return state;
        };
    }
}
