import * as C from "../core/actions/ActionCreators";
import * as React from "react";
import BusyComponent from "../core/components/common/BusyComponent";
import MessageListComponent from "../core/components/messages/MessageListComponent";
import State from "../state/State";
import { Action } from "redux";
import { Dispatch } from "redux";
import { IAppProperties } from "./Properties";
import { connect } from "react-redux";
import DemoFooterComponent from "../core/components/common/DemoFooter";

/**
 * Statefull main app component
 */
@(connect as any)(AppComponent.mapStateToProps, AppComponent.mapDispatchToProps)
export default class AppComponent extends React.Component<IAppProperties, any> {

    public static mapStateToProps(state: State, ownProps: IAppProperties): IAppProperties {
        let props: IAppProperties = Object.assign({}, ownProps);
        props.routeSuffix = (state as any).routing.locationBeforeTransitions.pathname.split("/").pop();
        return props;
    }

    public static mapDispatchToProps(dispatch: Dispatch<Action>, ownProps: IAppProperties): IAppProperties {
        let props: IAppProperties = Object.assign({}, ownProps);
        props.initHandler = () => { dispatch(C.createAppInitAction()); };
        return props;
    }

    public render(): any {
        const { children }: any = this.props;
        const className: string = "app" + (this.props.routeSuffix ? "--" + this.props.routeSuffix : "");
        return <section className={className}>
            <header>
                <MessageListComponent />
                <BusyComponent />
            </header>
            {children}
            <footer>
                <DemoFooterComponent />
            </footer>
        </section>;
    }

    protected componentWillMount(): void {
        this.props.initHandler();
    }
}
