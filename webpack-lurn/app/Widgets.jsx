var React = require('react');
var { DefaultRoute, Link, Route, RouteHandler } = require('react-router');
var { PageHeader, Panel } = require('react-bootstrap');
var { TodoPanel } = require('./todo/Todo.jsx');

const headline = (
    <PageHeader>Widgets and Doo-hickeys <small>With which to charm and delight</small></PageHeader>
);

var SlopeDemo = React.createClass({
    render() {
        return (
            <div>Hello <SlopeGraph/> </div>
        );
    }
});

var SlopeGraph = React.createClass({

    render() {
        return (
            <svg>
                <circle cx='10' cy='10' r='10' fill='green'></circle>
            </svg>);
    }
});

var Widgets = React.createClass({
    render() {
        return (
            <div>
                {headline}
                <Panel header='demos'>
                    <ul>
                        <li><Link to='slope'>Slope</Link></li>
                    </ul>
                </Panel>
                <RouteHandler/>
                <TodoPanel/>
            </div>
        );
    }
});

var WidgetRoutes = (
    <Route name='widgets' path='widgets' handler={Widgets}>
        <Route path='slope' name='slope' handler={SlopeDemo}/>
    </Route>
);

module.exports = { routes : WidgetRoutes };