// tslint:disable-next-line
import * as React from "react";
import { IPageProperties } from "./Properties";
import page from "../core/pages/PageDecorator";
import CoreConfigProvider from "../../server/core/CoreConfigProvider";
import { Store } from "redux";

/**
 * Example index page
 */
@page("index")
export class IndexPage extends React.Component<IPageProperties, {}> {

    public render(): any {
        return (
            <article>
                <h1>Welcome on your new project</h1>
                <p>
                    If you see this page, everything is running fine.
                    There's a readme included in this project with more stuff.
                </p>
            </article>);
    }
}
