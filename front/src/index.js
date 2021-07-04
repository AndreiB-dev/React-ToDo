import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import rootReducer from "./redux/rootReducer";

import "./index.css";

const composeEnhancers = composeWithDevTools({});

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk)),
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>,
    document.getElementById("root"),
);
