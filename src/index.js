import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import 'antd/dist/antd.css';

import {setupStore} from "./store";
import "./style.scss";

import App from "./App";

ReactDOM.render(
    <Provider store={setupStore()}>
        <App/>
    </Provider>, document.getElementById( "root" ) );