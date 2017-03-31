export interface ITitleProperties {
    children?: any;
    className?: string;
    text?: string;
    titleType: number;
}

export interface IPageTitleProperties {
    title: string;
    titleHandler?: (title: string) => void;
}

export interface IErrorProperties {
    code?: number;
    dispatcher?: (error: Error) => void;
    error: Error;
}

export interface IBusyProperties {
    busy?: boolean;
}
