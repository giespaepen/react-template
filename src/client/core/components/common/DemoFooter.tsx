import * as React from "react";
import { getVersion, getEnvironment } from "../../util/ConfigUtils";

/**
 * Stateless reactcomponent DemoFooter
 */
export default class DemoFooterComponent extends React.Component<{}, {}> {

    public render(): any {
        let version: string = getVersion();
        let environment: string = getEnvironment();
        return <span>Contentful-React demo. {version} - Environment: {environment}</span>;
    }
}
