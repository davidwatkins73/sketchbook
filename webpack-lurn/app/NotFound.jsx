var React = require("react");
var { Alert } = require("react-bootstrap");

var NotFound = React.createClass({
    render() {
        return (
            <Alert bsStyle='warning'>Not Found</Alert>
        );
    }
});

module.exports = NotFound;
