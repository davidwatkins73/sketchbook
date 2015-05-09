var React = require('react');
var Router = require('react-router');
var { Button, Grid, Jumbotron } = require('react-bootstrap');
var { DefaultRoute, Link, NotFoundRoute, Redirect, Route, RouteHandler } = Router;

var NavigationHeader = require('./NavigationHeader.jsx');
var NotFound = require("./NotFound.jsx");
var { StatesRoutes } = require("./States.jsx");

var _ = require('lodash');

var App = React.createClass({
    render() {
        return (
            <Grid className="App">
                <NavigationHeader/>
                <RouteHandler/>
            </Grid>
        );
    }
});

var Index = React.createClass({
    render() {
        return (
            <Jumbotron>
                <h1>Hello, world!</h1>
                <p>This is a simple hero unit, a simple jumbotron-style
                    component for calling extra attention to featured content or information.</p>
                <p>
                    <Button bsStyle='primary'>Learn more</Button>
                </p>
            </Jumbotron>
        );
    }
});

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Index} />
        <NotFoundRoute handler={NotFound} />
        {StatesRoutes}
        <Redirect from="places" to="states" />
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('main'));
});

