import * as C from "../../actions/ActionCreators";
import * as React from "react";
import State from "../../state/BaseState";
import { Action } from "redux";
import { Dispatch } from "redux";
import { IPageTitleProperties } from "./Properties";
import { connect } from "react-redux";

/**
 * Statefull component, dispatches a title as page title
 */
@(connect as any)(undefined, PageTitleComponent.mapDispatchToProps)
export default class PageTitleComponent extends React.Component<IPageTitleProperties, State> {

    public static mapDispatchToProps(dispatch: Dispatch<Action>, ownProps: IPageTitleProperties): IPageTitleProperties {
        let props: IPageTitleProperties = Object.assign({}, ownProps);
        props.titleHandler = (title: string) => { dispatch(C.createSetPageTitleAction(title)); };
        return props;
    }

    public render(): any {
        return <span />;
    }

    protected componentDidMount(): void {
        this.props.titleHandler(this.props.title);
    }
}
