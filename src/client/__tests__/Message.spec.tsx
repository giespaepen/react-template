import * as Immutable from "immutable";
import * as React from "react";
import * as renderer from "react-test-renderer";
import MessageComponent from "../core/components/messages/Message";
import createTestStore from "../core/util/TestStore";
import { Message } from "../core/components/messages/Properties";
import { Provider } from "react-redux";
import { applyMiddleware, compose, createStore, Store } from "redux";
import { shallow, mount } from "enzyme";

let hideCount: number = 0;
let hideHandler: (id: number) => void = (id: number) => hideCount++;

test("Message renders info", () => {
    // Arrange
    let expected: string = "blabla";
    let expectedType: string = "info";
    let message: Message = new Message(expected, expectedType.charAt(0));

    // Act
    let html = shallow(<MessageComponent message={message} hideHandler={hideHandler} />);
    let className: string = html.props().className;

    // Assert
    expect(html.html()).toContain(expected);
    expect(className).toContain("--" + expectedType);
});

test("Message renders warning", () => {
    // Arrange
    let expected: string = "blabla";
    let expectedType: string = "warning";
    let message: Message = new Message(expected, expectedType.charAt(0));

    // Act
    let html = shallow(<MessageComponent message={message} hideHandler={hideHandler} />);
    let className: string = html.props().className;

    // Assert
    expect(html.html()).toContain(expected);
    expect(className).toContain("--" + expectedType);
});

test("Message renders fatal", () => {
    // Arrange
    let expected: string = "blabla";
    let expectedType: string = "fatal";
    let message: Message = new Message(expected, expectedType.charAt(0));

    // Act
    let html = shallow(<MessageComponent message={message} hideHandler={hideHandler} />);
    let className: string = html.props().className;

    // Assert
    expect(html.html()).toContain(expected);
    expect(className).toContain("--" + expectedType);
});

test("Message renders hidden message", () => {
    // Arrange
    let expected: string = "hidden";
    let message: Message = new Message(expected);
    message.isHidden = true;

    // Act
    let html = shallow(<MessageComponent message={message} hideHandler={hideHandler} />);
    let className: string = html.props().className;

    // Assert
    expect(className).toContain("--" + expected);
});

test("Message accepts click", () => {
    // Arrange
    let expected: number = hideCount + 1;
    let message: Message = new Message("blabla");

    // Act
    let html = shallow(<MessageComponent message={message} hideHandler={hideHandler} />);
    html.first().simulate("click");
    let actual: number = hideCount;

    // Assert
    expect(actual).toBe(expected);
});
