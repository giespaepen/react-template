import { Action } from "redux";

export interface IDefaultAction extends Action {
}

export interface IGenericAction<T> extends IDefaultAction {
    payload: T;
    error?: Error;
}
