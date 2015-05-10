var React = require('react');
var { Alert, Button, Col, Input, Panel, Row } = require('react-bootstrap');
var { DefaultRoute, Link, Route, RouteHandler } = require('react-router');
var _ = require('lodash');

var { PanelTitle } = require('./BootstrapExtras.jsx');


var StateIndex = React.createClass({
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

var StatesHeader = React.createClass({
    render() {
        return (
            <div>
                <span>States</span>
                <Button bsSize='xsmall' className='pull-right'>hello</Button>
            </div>
        );
    }
});

var State = React.createClass({
    contextTypes: {
        router: React.PropTypes.func
    },
    imageUrl(name) {
        return "http://www.50states.com/maps/" + _.snakeCase(name) + ".gif";
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
        return {
            states: findStates(),
            query: ""
        };
    },

    handleChange: function() {
        var q = this.refs.query.getValue();
        this.setState(_.extend(this.state, { query: q }));
    },

    render() {

        var q = this.state.query.toLowerCase();
        var states = _.isEmpty(this.state.query)
            ? this.state.states
            : _.filter(this.state.states, s =>  _.contains(s.name.toLowerCase(), q));

        var links = states.map(state => {
            return (
                <li key={state.abbr}>
                    <Link to="state" params={{ abbr: state.abbr }}>
                        {state.name}
                    </Link>
                </li>
            );
        });

        var title = (
            <PanelTitle title='States'>
                <Input
                    type='search'
                    className='panel-heading-input'
                    value={this.state.query}
                    onChange={this.handleChange}
                    placeholder='Search'
                    ref='query'/>
            </PanelTitle>);

        return (
            <Row>
                <Col sm={4}>
                    <Panel collapsable={false} header={title}>
                        <ul className='list-unstyled'>
                            {links}
                        </ul>
                    </Panel>
                </Col>
                <Col sm={8}>
                    <RouteHandler/>
                </Col>
            </Row>
        );
    }
});

var StatesRoutes = (
    <Route name='states' path='states' handler={States}>
        <DefaultRoute handler={StateIndex} />
        <Route name='state' path="state/:abbr" handler={State} />
    </Route>
);

module.exports = {
    StatesRoutes : StatesRoutes
};


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