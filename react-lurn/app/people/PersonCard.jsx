var React = require("react");

module.exports = React.createClass({
    render() {
        return (
            <div>
                <h1>{this.props.name}</h1>
                <img src={this.props.avatar}/>
                <span>{this.props.id}</span>
            </div>
        );
    }
});