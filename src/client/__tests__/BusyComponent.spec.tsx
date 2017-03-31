import * as React from "react";
import * as renderer from "react-test-renderer";
import BusyComponent from "../core/components/common/BusyComponent";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore, Store } from "redux";
import createTestStore from "../core/util/TestStore";
import store from "../core/state/Store";

test("BusyComponent idle snapshot", () => {
    // Arrange
    let state: any = { busy: false };
    let {reducer, store} = createTestStore({ busy: false });

    // Act
    const component = renderer.create(<Provider store={store}><BusyComponent /></Provider>);
    let tree = component.toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
});

test("BusyComponent busy snapshot", () => {
    // Arrange
    const {reducer, store} = createTestStore({ busy: true });
    // Act
    const component = renderer.create(<Provider store={store}><BusyComponent /></Provider>);
    let tree = component.toJSON();

    // Assert
    expect(tree).toMatchSnapshot();
});
