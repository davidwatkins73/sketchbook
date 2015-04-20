var React = require("react");
var Moment = require("moment");

var TimeAgo = React.createClass({

    propTypes: {
        date : React.PropTypes.oneOfType([
            React.PropTypes.object,
            React.PropTypes.number
        ]),
        updateInterval : React.PropTypes.number
    },

    getDefaultProps() {
        updateInterval: 1
    },

    componentWillMount() {
        this.intervalRef = setInterval(() => {
            this.forceUpdate();
        }, this.props.updateInterval * 1000);
    },

    componentWillUnmount() {
        clearInterval(this.interval.ref);
    },

    render() {
        var t = Moment(this.props.date).fromNow();
        return (
            <span>{t}</span>
        );
    }
});

module.exports = TimeAgo;
