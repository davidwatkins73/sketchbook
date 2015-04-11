var React = require("react");

var CheckLink = React.createClass({
    render() {
        // This takes any props passed to CheckLink and copies them to <a>
        return (<a {...this.props}> √ {this.props.children}</a>);
    }
});

module.exports=CheckLink;