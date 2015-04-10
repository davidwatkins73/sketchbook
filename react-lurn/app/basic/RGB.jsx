var React = require("react");
var Slider = require("../basic/Slider.jsx");

module.exports = React.createClass({
    getInitialState() {
        return {
            red: 228,
            green: 128,
            blue: 128
        };
    },

    update() {
        this.setState({
            red: this.refs.red.refs.inp.getDOMNode().value,
            green: this.refs.green.refs.inp.getDOMNode().value,
            blue: this.refs.blue.refs.inp.getDOMNode().value
        });
    },

    render() {
        return (
            <div>
                <Slider ref="red" update={this.update}/>
                <Slider ref="green" update={this.update}/>
                <Slider ref="blue" update={this.update}/>
                <div style={{ 'backgroundColor' : 'rgb(' + this.state.red +','+ this.state.green +',' + this.state.blue + ')'}}>
                    {this.state.red}, {this.state.green}, {this.state.blue}
                </div>
            </div>

        );
    }
});
