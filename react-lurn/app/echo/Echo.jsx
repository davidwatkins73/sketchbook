var React = require("react");

module.exports = React.createClass({
    getInitialState() {
        return {
            txt: this.props.txt || 'the state txt'
        }
    },
    update(e){
        this.setState({txt: e.target.value});
    },
    render(){
        return (
            <div>
                <input type="text" onChange={this.update} />
                <h1>{this.state.txt}</h1>
            </div>
        );
    }
});
