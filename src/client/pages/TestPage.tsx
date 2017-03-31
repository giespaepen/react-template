import * as React from "react";
import page from "../core/pages/PageDecorator";
import { IPageProperties } from "./Properties";

/**
 * Example test page
 */
@page("test")
export class TestPage extends React.Component<IPageProperties, {}> {

    public render(): any {
        return <div>This is a test page</div>;
    }
}