import * as React from "react";
import { ITitleProperties } from "./Properties";

/**
 * Stateless reactcomponent Title
 */
export default class TitleComponent extends React.Component<ITitleProperties, {}> {

    public static DEFAUL_TITLETYPE = 2;

    public render(): any {
        let titleType: number = this.correctTitleType();
        let children: any = this.compileChildren();
        switch (titleType) {
            case 1:
                return <h1 className={this.props.className}>{children}</h1>;
            case 3:
                return <h3 className={this.props.className}>{children}</h3>;
            case 4:
                return <h4 className={this.props.className}>{children}</h4>;
            default:
                return <h2 className={this.props.className}>{children}</h2>;
        }
    }

    private compileChildren(): any {
        if (this.props.children) {
            return this.props.children;
        } else {
            let text: string = this.props.text || "";
            return <span>{text}</span>;
        }
    }

    private correctTitleType(): number {
        if (this.props.titleType > 0 && this.props.titleType < 5) {
            return this.props.titleType;
        }
        return TitleComponent.DEFAUL_TITLETYPE;
    }
}
