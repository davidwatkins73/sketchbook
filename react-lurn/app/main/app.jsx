var React = require('react');
var Router = require('react-router');
var { Alert, Col, DropdownButton, Grid, MenuItem, Nav, Navbar, NavItem, NavItemLink, Panel, Row } = require('react-bootstrap');
var { Route, DefaultRoute, RouteHandler, Link } = Router;
var _ = require('lodash');

var NavigationHeader = React.createClass({
    render() {
        return (
            <Navbar staticTop brand={<a href="#">Project X</a>}>
                <Nav>
                    <NavItem eventKey={1} href='#'>Widgets</NavItem>
                    <NavItem eventKey={2} href='#/states'>States</NavItem>
                    <DropdownButton eventKey={3} title='Stuff'>
                        <MenuItem eventKey='1'>Action</MenuItem>
                        <MenuItem eventKey='2'>Another action</MenuItem>
                        <MenuItem eventKey='3'>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey='4'>Separated link</MenuItem>
                    </DropdownButton>
                </Nav>
            </Navbar>
        );
    }
});

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
    hello() {
        alert("Hello");
    },
    render() {
        return (
            <Alert bsStyle='warning' onDismiss={this.hello}>
                <p>Select a state from the left</p>
            </Alert>
        );
    }
});

var State = React.createClass({

    contextTypes: {
        router: React.PropTypes.func
    },

    imageUrl(name) {
        return "http://www.50states.com/maps/" + underscore(name) + ".gif";
    },

    render() {
        var unitedState = findState(this.context.router.getCurrentParams().abbr);
        return (
            <Panel header={unitedState.name}>
                <div className="State">
                    <img src={this.imageUrl(unitedState.name)} width='100%'/>
                </div>
            </Panel>
        );
    }
});

var States = React.createClass({
    getInitialState() {
        return { states: findStates() };
    },

    render() {
        var links = this.state.states.map(state => {
            return (
                <li key={state.abbr}>
                    <Link to="state" params={{ abbr: state.abbr }}>
                        {state.name}
                    </Link>
                </li>
            );
        });
        return (
            <Row>
                <Col md={4}>
                    <Panel header='All States'>
                        <ul className='list-unstyled'>
                            {links}
                        </ul>
                    </Panel>
                </Col>
                <Col md={8}>
                    <RouteHandler/>
                </Col>
            </Row>);
    }
})

var routes = (
    <Route handler={App}>
        <DefaultRoute handler={Index}/>
        <Route name='states' path='states' handler={States}>
            <Route name='state' path="state/:abbr" handler={State}/>
        </Route>
    </Route>
);

Router.run(routes, function (Handler) {
    React.render(<Handler/>, document.getElementById('main'));
});

/*****************************************************************************/
// data stuff

function findState(abbr) {
    var states = findStates();
    return _.findWhere(states, { abbr: abbr });
}

function findStates() {
    return [
        { abbr: "AL", name: "Alabama"},
        { abbr: "AK", name: "Alaska"},
        { abbr: "AZ", name: "Arizona"},
        { abbr: "AR", name: "Arkansas"},
        { abbr: "CA", name: "California"},
        { abbr: "CO", name: "Colorado"},
        { abbr: "CT", name: "Connecticut"},
        { abbr: "DE", name: "Delaware"},
        { abbr: "FL", name: "Florida"},
        { abbr: "GA", name: "Georgia"},
        { abbr: "HI", name: "Hawaii"},
        { abbr: "ID", name: "Idaho"},
        { abbr: "IL", name: "Illinois"},
        { abbr: "IN", name: "Indiana"},
        { abbr: "IA", name: "Iowa"},
        { abbr: "KS", name: "Kansas"},
        { abbr: "KY", name: "Kentucky"},
        { abbr: "LA", name: "Louisiana"},
        { abbr: "ME", name: "Maine"},
        { abbr: "MD", name: "Maryland"},
        { abbr: "MA", name: "Massachusetts"},
        { abbr: "MI", name: "Michigan"},
        { abbr: "MN", name: "Minnesota"},
        { abbr: "MS", name: "Mississippi"},
        { abbr: "MO", name: "Missouri"},
        { abbr: "MT", name: "Montana"},
        { abbr: "NE", name: "Nebraska"},
        { abbr: "NV", name: "Nevada"},
        { abbr: "NH", name: "New Hampshire"},
        { abbr: "NJ", name: "New Jersey"},
        { abbr: "NM", name: "New Mexico"},
        { abbr: "NY", name: "New York"},
        { abbr: "NC", name: "North Carolina"},
        { abbr: "ND", name: "North Dakota"},
        { abbr: "OH", name: "Ohio"},
        { abbr: "OK", name: "Oklahoma"},
        { abbr: "OR", name: "Oregon"},
        { abbr: "PA", name: "Pennsylvania"},
        { abbr: "RI", name: "Rhode Island"},
        { abbr: "SC", name: "South Carolina"},
        { abbr: "SD", name: "South Dakota"},
        { abbr: "TN", name: "Tennessee"},
        { abbr: "TX", name: "Texas"},
        { abbr: "UT", name: "Utah"},
        { abbr: "VT", name: "Vermont"},
        { abbr: "VA", name: "Virginia"},
        { abbr: "WA", name: "Washington"},
        { abbr: "WV", name: "West Virginia"},
        { abbr: "WI", name: "Wisconsin"},
        { abbr: "WY", name: "Wyoming"}
    ];
}

function underscore(str) {
    return str.toLowerCase().replace(/ /, '_');
}
