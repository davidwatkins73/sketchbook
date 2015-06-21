let Rx = require('rx');
let React = require("react");

let stream = Rx.Observable.interval(1000).map(function (interval) {
    return {
        secondsElapsed: interval * 3
    };
});

let MyComponent = React.createClass({

    componentWillMount() {
        console.log("mounting timer")
        this.subscription = stream.subscribe(x => this.setState(x))
    },

    componentWillUnmount() {
        console.log("unmount")
        this.subscription.dispose();
    },

    getInitialState() {
        return {
            secondsElapsed : 0
        };
    },

    render() {
        return (
            <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
        );
    }
})


module.exports = MyComponent;