let React = require('react');
let ThemeToggle = require('./ThemeToggle.jsx');
let _ = require('lodash');
let { bus, Actions } = require('./EventSys');

let mui = require('material-ui');
let ThemeManager = new mui.Styles.ThemeManager();
let { AppBar, RaisedButton, Checkbox } = mui;

let MyComponent = require('./MyComponent.jsx');
let AnotherComponent = require("./AnotherComponent.jsx");
//
//let Router = require('react-router');
//let { DefaultRoute, Link, NotFoundRoute, Redirect, Route, RouteHandler } = Router;

bus.subscribe(x => console.log("outer", x));

let SomeAwesomeComponent = React.createClass({

    getInitialState() {
        return { showTimer : true };
    },

    childContextTypes: {
        muiTheme: React.PropTypes.object
    },

    componentWillMount() {
        bus.filter(x => x.type === Actions.UPDATE_THEME)
            .subscribe(x => {
                ThemeManager.setComponentThemes(x.data);
                this.forceUpdate()
            });

        bus.filter(x => x.type === Actions.TOGGLE_COUNTER)
            .subscribe(x => {
                let s = this.state;
                let newState = _.extend(s, { showTimer : ! s.showTimer });
                console.log("ns", newState)
                this.setState(newState);
            });
    },

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    },

    onClick() {
        bus.onNext({type: Actions.TOGGLE_COUNTER, data: {}});
    },

    render() {
        let maybeTimer = this.state.showTimer ? <MyComponent/> : null;
        return (
            <div>
                <AppBar title='Title' iconClassNameLeft="muidocs-icon-action-home"/>
                {maybeTimer}
                <ThemeToggle/>
                <RaisedButton label="Default" onClick={this.onClick} />
                <AnotherComponent/>
            </div>
        );
    }

});


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