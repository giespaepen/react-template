import "./assets/style/App.scss";
import * as Constants from "./core/Constants";
import * as Pages from "./pages/Index";
import * as React from "react";
import * as ReactDOM from "react-dom";
import AppComponent from "./components/AppComponent";
import ErrorRoute from "./core/components/routes/ErrorRoute";
import PageRoute from "./core/components/routes/PageRoute";
import Store from "./core/state/Store";
import { Provider } from "react-redux";
import { Router, Route, hashHistory, Redirect, IndexRoute } from "react-router";
import { syncHistoryWithStore } from "react-router-redux";

// Assign polyfill
// tslint:disable-next-line
require('es6-object-assign').polyfill();

// Define the history
const history: any = syncHistoryWithStore(hashHistory as any, Store as any);

ReactDOM.render(
    <Provider store={Store}>
        <Router history={history as any}>
            <Route path="/" component={AppComponent}>
                <Route path={Constants.PATH_PAGE + Constants.PATH_PARAM} component={PageRoute} />
                <Route path={Constants.PATH_ERROR + Constants.PATH_PARAM} component={ErrorRoute} />
                <IndexRoute component={Pages.IndexPage} />
            </Route>
        </Router>
    </Provider>,

    // See client/assets/views/index.hbs
    document.getElementById("mount"),
);

// Hook up hot reloading
if ((module as any).hot) {
    (module as any).hot.accept();
}
