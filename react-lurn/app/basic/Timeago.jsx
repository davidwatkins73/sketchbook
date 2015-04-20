var React = require("react");
var Moment = require("moment");

var TimeAgo = React.createClass({
    propTypes: {
        date : React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.number
        ])
    },

    render() {
        var t = Moment(this.props.date).fromNow();
        return (
            <span>{t}</span>
        );
    }
});

module.exports = TimeAgo;
