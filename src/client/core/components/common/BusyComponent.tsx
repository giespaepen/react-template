import "./BusyComponent.scss";
import * as React from "react";
import State from "../../state/BaseState";
import { Action } from "redux";
import { Dispatch } from "redux";
import { IBusyProperties } from "./Properties";
import { connect } from "react-redux";

/**
 * Statefull reactcomponent Busy
 */
@(connect as any)(BusyComponent.mapStateToProps, undefined)
export default class BusyComponent extends React.Component<IBusyProperties, State> {

    public static mapStateToProps(state: State, ownProps: IBusyProperties): IBusyProperties {
        let props: IBusyProperties = Object.assign({}, ownProps);
        props.busy = state.busy;

        return props;
    }

    public render(): any {
        if (this.props.busy) {
            return <div className="busy">
                <div className="busy-wrapper">
                    <div className="busy-loader"><span>Loading</span></div>
                </div>
            </div>;
        } else {
            return <span />;
        }
    }
}