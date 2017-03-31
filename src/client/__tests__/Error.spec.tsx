import * as React from "react";
import * as renderer from "react-test-renderer";
import Error from "../core/components/common/Error";

test("Error snapshot test", () => {
    const error = { name: "error", message: "the error" };
    const component = renderer.create(<Error error={error} code={400} />);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
