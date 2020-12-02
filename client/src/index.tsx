import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import { Provider } from "react-redux"
import { createStore } from "redux";
import reducer from "./redux/store";

const store = createStore(reducer);

const Root = () => (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(<Root />, document.getElementById("root"));
