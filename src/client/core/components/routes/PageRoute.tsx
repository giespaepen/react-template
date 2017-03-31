import * as C from "../../actions/ActionCreators";
import * as React from "react";
import directory from "../../pages/PageDirectory";
import { Action } from "redux";
import { Dispatch } from "redux";
import { IPageRouteProperties } from "./Properties";
import { connect } from "react-redux";

/**
 * Statefull reactcomponent Page
 */
@(connect as any)(undefined, PageRoute.mapDispatchToProps)
export default class PageRoute extends React.Component<IPageRouteProperties, {}> {

    public static mapDispatchToProps(dispatch: Dispatch<Action>, ownProps: IPageRouteProperties): IPageRouteProperties {
        let props: IPageRouteProperties = Object.assign({}, ownProps);
        props.errorHandler = (error: Error, errorCode: number) => {
            dispatch(C.createErrorOccurredAction(error, errorCode));
        };
        return props;
    }

    public render(): any {
        try {
            let id: string = (this.props.params.id || "index").toLowerCase();
            let component: any = directory.findItem(id).component;

            return <div className="page-route">
                {React.createElement(component, {})}
            </div>;
        } catch (error) {
            setTimeout(() => { this.props.errorHandler(error, 500); }, 250);
            return <span />;
        }
    }
}
