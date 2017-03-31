import * as Immutable from "immutable";
import { IGenericAction } from "../actions/Actions";
import * as T from "../actions/ActionTypes";
import * as D from "../Domain";
import { Message } from "../components/messages/Properties";

const INITIAL_STATE: Immutable.List<D.IMessage> = Immutable.List<D.IMessage>();

/**
 * Reduce the messages of the app
 */
export default function messages(
    state: Immutable.List<D.IMessage> = INITIAL_STATE,
    action: IGenericAction<D.IMessage | number>):
    Immutable.List<D.IMessage> {

    switch (action.type) {
        case T.MESSAGES_NEW:
            return state.push(action.payload as D.IMessage);
        case T.MESSAGES_HIDE:
            let index: number = state.findIndex((x: D.IMessage) => x.id === action.payload);
            return state.update(index, (item: D.IMessage) => {
                let newItem: D.IMessage = Object.assign({}, item);
                newItem.isHidden = true;
                return newItem;
            });
        case T.MESSAGES_HIDE_ALL:
            state.forEach((item: D.IMessage) => { item.isHidden = true; });
            return state;
        case T.MESSAGES_PURGE:
            return INITIAL_STATE;
        default:
            return state;
    }
}
