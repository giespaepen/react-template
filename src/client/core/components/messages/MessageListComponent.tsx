import "./MessageListComponent.scss";
import * as C from "../../actions/ActionCreators";
import * as Domain from "../../Domain";
import * as React from "react";
import Message from "./Message";
import State from "../../state/BaseState";
import { Action } from "redux";
import { Dispatch } from "redux";
import { IMessageListProperties } from "./Properties";
import { connect } from "react-redux";

@(connect as any)(MessageListComponent.mapStateToProps, MessageListComponent.mapDispatchToProps)
export default class MessageListComponent extends React.Component<IMessageListProperties, State> {

    public static mapStateToProps(state: State, ownProps: IMessageListProperties): IMessageListProperties {
        let props: IMessageListProperties = Object.assign({}, ownProps);
        props.messages = state.messages;
        return props;
    }

    public static mapDispatchToProps(dispatch: Dispatch<Action>, ownProps: IMessageListProperties):
        IMessageListProperties {
        let props: IMessageListProperties = Object.assign({}, ownProps);
        props.hideAllHandler = () => { dispatch(C.createMessageHideAllAction()); };
        props.hideHandler = (id: number) => { dispatch(C.createMessageHideAction(id)); };
        return props;
    }

    public render(): any {
        return <div className="messages" >{this.renderMessages()}</div>;
    }

    private renderMessages(): JSX.Element[] {
        return this.props.messages.map((x: Domain.IMessage) => {
            return <Message key={x.id} message={x} hideHandler={this.props.hideHandler} />;
        }).toArray();
    }
}
