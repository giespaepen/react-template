import * as React from "react";
import * as renderer from "react-test-renderer";
import Title from "../core/components/common/Title";
import { shallow } from "enzyme";

test("Title H1 rendered", () => {
    // Arrange
    let element: JSX.Element = <Title titleType={1}><span>title</span></Title>;

    // Act
    let html = shallow(element);
    let component = renderer.create(element);
    let tag = html.find("h1");

    // Assert
    expect(component).toMatchSnapshot();
    expect(tag).toBeDefined();
});

test("Title H1 rendered", () => {
    // Arrange
    let element: JSX.Element = <Title titleType={1}><span>title</span></Title>;

    // Act
    let html = shallow(element);
    let component = renderer.create(element);
    let tag = html.find("h1");

    // Assert
    expect(component).toMatchSnapshot();
    expect(tag).toBeDefined();
});

test("Title H2 rendered", () => {
    // Arrange
    let element: JSX.Element = <Title titleType={2}><span>title</span></Title>;

    // Act
    let html = shallow(element);
    let component = renderer.create(element);
    let tag = html.find("h2");

    // Assert
    expect(component).toMatchSnapshot();
    expect(tag).toBeDefined();
});

test("Title H3 rendered", () => {
    // Arrange
    let element: JSX.Element = <Title titleType={1}><span>title</span></Title>;

    // Act
    let html = shallow(element);
    let component = renderer.create(element);
    let tag = html.find("h3");

    // Assert
    expect(component).toMatchSnapshot();
    expect(tag).toBeDefined();
});

test("Title H4 rendered", () => {
    // Arrange
    let element: JSX.Element = <Title titleType={4}><span>title</span></Title>;

    // Act
    let html = shallow(element);
    let component = renderer.create(element);
    let tag = html.find("h4");

    // Assert
    expect(component).toMatchSnapshot();
    expect(tag).toBeDefined();
});

test("Title H2 as default rendered", () => {
    // Arrange
    let element: JSX.Element = <Title titleType={5}><span>title</span></Title>;

    // Act
    let html = shallow(element);
    let component = renderer.create(element);
    let tag = html.find("h2");

    // Assert
    expect(component).toMatchSnapshot();
    expect(tag).toBeDefined();
});
