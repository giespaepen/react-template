import * as A from "../core/actions/Actions";
import * as C from "../core/actions/ActionCreators";
import * as D from "../core/Domain";
import * as T from "../core/actions/ActionTypes";
import { Action } from "redux";
import { ActionType } from "../../server/core/ControllerEnums";
import { resolveActionType } from "../core/actions/creators/CreatorUtils";


test("ActionCreator createAppInitAction", () => {
    testCreator(C.createAppInitAction, T.APP_INIT);
});

test("ActionCreator createAppConfiguredAction", () => {
    testCreator(C.createAppConfiguredAction, T.APP_CONFIGURED);
});

test("ActionCreator createConfigReceivedAction", () => {
    testCreator(C.createConfigReceivedAction, T.CONFIG_RECEIVED);
});

test("ActionCreator createErrorOccurredAction", () => {
    testCreator(C.createErrorOccurredAction, T.ERROR_OCCURRED);
});

test("ActionCreator createSetPageTitleAction", () => {
    testCreator(C.createSetPageTitleAction, T.SET_PAGE_TITLE);
});

test("ActionCreator createMessageAction", () => {
    testCreator(C.createMessageAction, T.MESSAGES_NEW);
});

test("ActionCreator createMessageAction fatal as persistent", () => {
    // Arrange
    let expected: boolean = true;

    // Act
    let action: A.IGenericAction<any> = C.createMessageAction("blabla", "fatal");

    // Assert
    expect(action.payload.isPersistent).toBe(expected);
});

test("ActionCreator createMessageAction non-fatal as non-persistent", () => {
    // Arrange
    let expected: boolean = false;

    // Act
    let action: A.IGenericAction<any> = C.createMessageAction("blabla", "warning");

    // Assert
    expect(action.payload.isPersistent).toBe(expected);
});

test("ActionCreator createMessageHideAction", () => {
    testCreator(C.createMessageHideAction, T.MESSAGES_HIDE);
});

test("ActionCreator createMessageHideAllAction", () => {
    testCreator(C.createMessageHideAllAction, T.MESSAGES_HIDE_ALL);
});

test("ActionCreator createProcessStartedAction", () => {
    testCreator(C.createProcessStartedAction, T.PROCESS_STARDED);
});

test("ActionCreator createProcessIdleAction", () => {
    testCreator(C.createProcessIdleAction, T.PROCESS_IDLE);
});

/**
 * Util method
 */
function testCreator(creator: (...args) => A.IDefaultAction, expected: string) {
    // Act
    let actual: string = creator({}).type;

    // Assert
    expect(actual).toBe(expected);
}
