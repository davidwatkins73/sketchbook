var _ = require('lodash');
var React = require('react');
var Reflux = require('reflux');
var { Badge, Button, Col, Input, ListGroup, ListGroupItem, Panel, Row } = require('react-bootstrap');
var { DefaultRoute, Link, Route, RouteHandler } = require('react-router');

var { PanelTitle } = require('../BootstrapExtras.jsx');
var { Actions : TodoActions, Store: TodoStore } = require("./TodoStore.js");


var TodoIndex = React.createClass({

    mixins: [Reflux.connect(TodoStore, "todos")],

    clear() {
        TodoActions.clearCompleted();
    },

    render() {

        var todos = this.state.todos;
        var total = todos.length;
        var open = total - _.filter(todos, 'complete').length;

        var title = (
            <PanelTitle title='Todos'>
                <Button onClick={this.clear} bsStyle='warning' bsSize='xsmall'>Clear completed</Button>
                &nbsp;
                <Badge title='Open / Total' >{open} / {total}</Badge>
            </PanelTitle>);


        return (
            <Row>
                <Col sm={12}>
                    <Panel header={title}>
                        <TodoList items={todos}/>
                    </Panel>
                </Col>
            </Row>
        );
    }
});

var TodoList = React.createClass({
    render() {

        var listGroupItems = _.chain(this.props.items)
            .sortBy('label')
            .map(item => (
                <ListGroupItem key={item.id}>
                    <TodoItem label={item.label}
                              id={item.id}
                              complete={item.complete}>
                    </TodoItem>
                </ListGroupItem>
            ))
            .value();

        return (
            <ListGroup>
                {listGroupItems}
            </ListGroup>
        );
    }
});

var TodoItem = React.createClass({

    click() {
        TodoActions.toggle(this.props.id);
    },
    render() {
        return (
            <div>
                <Input onClick={this.click} type='checkbox' checked={this.props.complete} label={this.props.label}/>
            </div>
        );
    }
});

var TodoRoutes = (
    <Route name='todos' path='todos' handler={TodoIndex}>
    </Route>
);


window.act = TodoActions;
window.store = TodoStore;

module.exports = {
    routes: TodoRoutes
}