var React = require("react");
var Reflux = require("reflux");
var request = require("superagent");  // convention is to name this request...

var _ = require("lodash");

var store = Reflux.createStore({
    data: { message: 0 },
    init() {
        setInterval(() => {
            this.data.message++;
            this.trigger(this.data);
        }, 1000);
    },
    getInitialState() {
        return this.data;
    }
});

var remoteStore = Reflux.createStore({
    data: {people: []},
    init() {
        request
            .get("../api/people.json")
            .end((err, res) => {
                this.data.people = res.body;
                this.trigger(this.data);
                console.log("kick", this.data)
            });
    },
    getInitialState() {
        return this.data;
    }
});

var RemoteCard = React.createClass({
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

var RemoteCards = React.createClass({
    mixins: [Reflux.connect(remoteStore)],
    render() {
        console.log("REmoteCards", this.state)
        return (
            <div>
                <h1>Remote Cards</h1>
                {
                    this.state.people.map(p => {
                        return ( <RemoteCard name={p.name} avatar={p.avatar}></RemoteCard> );
                    })
                }
            </div>
        )
    }
});

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

var Counter = React.createClass({
    mixins: [Reflux.connect(store)],
    render() {
        return (
            <h1>{this.state.message}</h1>
        )
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
React.render(<Counter></Counter>, document.getElementById("example2"))
React.render(<RemoteCards></RemoteCards>, document.getElementById("example3"))
