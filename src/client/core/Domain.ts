/**
 * Configuration items
 */
export interface IConfig {
    environment: string;
    version: string;
}

/**
 * Wrapper for axios respons
 */
export interface IAxiosResponse<T> {
    data: T;
}

/**
 * Internal messaging interface
 */
export interface IMessage {
    id: number;
    isHidden: boolean;
    isPersistent: boolean;
    text: string | JSX.Element;
    type: MessageType;
    typeAsString: string;
}

/**
 * Internal message type enum
 */
export enum MessageType {
    DEBUG = 0,
    INFO = 1,
    WARNING = 2,
    ERROR = 4,
    FATAL = 8,
}

/**
 * Page directory
 */
export interface IPageDirectoryItem {
    component: React.Component<any, any>;
    id: string;
}

/**
 * Error payload
 */
export interface ISysError {
    error: Error;
    errorCode: number;
}
