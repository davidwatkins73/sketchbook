var React = require("react");

var Foo = React.createClass({
    render() {
        console.log("here")
        return (<h1>Hello Foo and Baa Too</h1>);
    }
});

module.exports = Foo;