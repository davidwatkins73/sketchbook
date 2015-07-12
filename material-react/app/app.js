import React from 'react';
import { bus, Actions } from './EventSys';
import SomeAwesomeComponent from './SomeAwesomeComponent.jsx';

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