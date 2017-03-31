import * as A from "../Actions";

export function resolveActionType(creator: (...params: any[]) => A.IDefaultAction): string {
    try {
        return creator().type;
    } catch (e) {
        console.error(e);
    }
}
