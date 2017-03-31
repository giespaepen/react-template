import "./Error.scss";
import * as React from "react";
import State from "../../state/BaseState";
import { Action } from "redux";
import { Dispatch } from "redux";
import { IErrorProperties } from "./Properties";
import { connect } from "react-redux";
import { createErrorOccurredAction } from "../../actions/ActionCreators";

/**
 * Stateless Error component
 */
export default class Error extends React.Component<IErrorProperties, State> {

    public render(): any {
        return <div className="error">
            <h2>{this.props.code} - Error :(</h2>
            <h3>{this.props.error.message}</h3>
            <p className="error-content">
                Something went wrong while requesting the page.
            </p>
            <p className="error-stack">
                {this.props.error.stack}
            </p>
        </div>;
    }
}
