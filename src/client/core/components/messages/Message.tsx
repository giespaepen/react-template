// tslint:disable-next-line
import * as React from "react";

import { IMessageProperties } from "./Properties";

export default class Message extends React.Component<IMessageProperties, {}> {
    public render(): any {
        let id: number = this.props.message.id;
        let handler: any = () => {
            this.props.hideHandler(id);
        };
        let className: string = "messages-item--" +
            this.props.message.typeAsString +
            (!this.props.message.isHidden ? " fadeIn animated" : "--hidden");

        return <div className={className} onClick={handler}>
            <span className="messages-item-type" />
            <span className="messages-item-text">{this.props.message.text}</span>
        </div>;
    }
}
