var React = require("react");
var _ = require("lodash");

console.log("Hello");

var people = [
    {
        "name": "Anderson Turner",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/craigrcoles/128.jpg",
        "id": 0
    },
    {
        "name": "Freddy Jones",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/ivanfilipovbg/128.jpg",
        "id": 1
    },
    {
        "name": "Angus Baumbach",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/abovefunction/128.jpg",
        "id": 2
    },
    {
        "name": "Sister Altenwerth",
        "avatar": "https://s3.amazonaws.com/uifaces/faces/twitter/ryandownie/128.jpg",
        "id": 3
    }
];

var Card = React.createClass({
    render() {
        return (
            <div>
                <h1>Hello {this.props.name}</h1>
                <img src={this.props.avatar} width="100"/>
                <br/>
                <button onClick={this.props.onDelete}>Delete Me</button>
                <hr/>
            </div>
        );
    }
});

var App = React.createClass({
    getInitialState() {
        return { people : this.props.people.splice(0) };
    },
    deletePerson(p) {
        this.state.people.splice(this.state.people.indexOf(p), 1);
        this.setState({people: this.state.people});
    },
    render() {
        var self = this;
        return (
            <div>
                {
                    this.state.people.map(p => {
                        return ( <Card onDelete={self.deletePerson.bind(null, p)} name={p.name} avatar={p.avatar}></Card> );
                    })
                }
            </div>
        )
    }
});

React.render(<App people={_.clone(people)}></App>, document.getElementById("example"));
React.render(<App people={_.clone(people)}></App>, document.getElementById("example2"))

window._ = _;
window.z = people;
