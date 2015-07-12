import React from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import _ from 'lodash';
import mui from 'material-ui';
import MyComponent from './MyComponent.jsx';
import AnotherComponent from './AnotherComponent.jsx';
import { bus, Actions } from './EventSys';
import SomeAwesomeComponent from './SomeAwesomeComponent.jsx';
let { AppBar, RaisedButton, Checkbox } = mui;
let ThemeManager = new mui.Styles.ThemeManager();

//
//let Router = require('react-router');
//let { DefaultRoute, Link, NotFoundRoute, Redirect, Route, RouteHandler } = Router;

bus.subscribe(x => console.log("outer", x));



React.render(
    <div>
        <SomeAwesomeComponent/>
    </div>,
    document.getElementById('main'));


let injectTapEventPlugin = require("react-tap-event-plugin");

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();