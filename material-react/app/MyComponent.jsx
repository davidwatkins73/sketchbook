import Rx from 'rx';
import React from "react";

let stream = Rx.Observable.interval(1000).map(function (interval) {
    return {
        secondsElapsed: interval * 3
    };
});

class MyComponent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            secondsElapsed : 0
        };
    }

    componentWillMount() {
        console.log("mounting timer")
        this.subscription = stream.subscribe(x => this.setState(x))
    }

    componentWillUnmount() {
        console.log("unmount")
        this.subscription.dispose();
    }

    render() {
        return (
            <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
        );
    }
}


export default MyComponent;