import * as A from "../Actions";

/**
 * Create a generic action with a type and payload
 */
export function createGenericAction<T>(type: string, payload: T, error?: Error): A.IGenericAction<T> {
    return {
        error,
        payload,
        type,
    };
}

/**
 * Create a default action with a type
 */
export function createDefaultAction(type: string): A.IDefaultAction {
    return {
        type,
    };
}
