import * as C from "../../actions/ActionCreators";
import * as React from "react";
import Error from "../common/Error";
import State from "../../state/BaseState";
import { Action } from "redux";
import { Dispatch } from "redux";
import { IErrorRouteProperties } from "./Properties";
import { connect } from "react-redux";

/**
 * Stateless reactcomponent ErrorRoute
 */
@(connect as any)(ErrorRoute.mapStateToProps, undefined)
export default class ErrorRoute extends React.Component<IErrorRouteProperties, {}> {

    public static mapStateToProps(state: State, ownProps: IErrorRouteProperties): IErrorRouteProperties {
        let props: IErrorRouteProperties = Object.assign({}, ownProps);
        props.error = state.lastError;
        return props;
    }

    public render(): any {
        let code: number = parseInt(this.props.params.id || "400", 10);
        return (
            <div className="error-route">
                <Error code={code} error={this.props.error} />
            </div>);
    }
}
