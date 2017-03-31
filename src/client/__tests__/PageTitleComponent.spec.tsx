import * as React from "react";
import * as renderer from "react-test-renderer";
import PageTitleComponent from "../core/components/common/PageTitleComponent";
import createTestStore from "../core/util/TestStore";
import { Provider } from "react-redux";
import { SET_PAGE_TITLE } from "../core/actions/ActionTypes";
import { applyMiddleware, compose, createStore, Store } from "redux";

type Action = { type: string, payload: any };

// 
let actionCounter: number = 0;
let lastAction: Action;

test("PageTitleComponent snapshot test", () => {
    // Arrange
    const { reducer, store } = createTestStore({});
    const initialCount: number = reducer.getCounter();
    const expectedAction: string = SET_PAGE_TITLE;

    // Act
    const component = renderer.create(<Provider store={store}><PageTitleComponent title="test" /></Provider>);
    const tree = component.toJSON();
    const actualCount: number = reducer.getCounter();

    // Assert
    expect(tree).toMatchSnapshot();
    expect(actualCount).toBeGreaterThan(initialCount);
    expect(expectedAction).toBe(reducer.getLastAction().type);
});

