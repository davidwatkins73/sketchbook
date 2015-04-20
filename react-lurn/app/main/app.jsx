var React = require("react");
var Reflux = require("reflux");
var request = require("superagent");  // convention is to name this request...
var PersonCards = require("../people/PersonCards.jsx");
var Echo = require("../echo/Echo.jsx");
var RGB = require("../basic/RGB.jsx");
var Avatar = require("../avatar/Avatar.jsx");
var ProductTable = require("../productTable/ProductTable.jsx");
var CheckLink = require("../basic/CheckLink.jsx");
var TimeAgo = require("../basic/Timeago.jsx");
var Reveal = require("../basic/Reveal.jsx");

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
            <div> {
                this.state.people.map(p => {
                    return ( <Card onDelete={self.deletePerson.bind(null, p)} name={p.name} avatar={p.avatar}></Card> );
                })
            } </div>
        );
    }
});

var d = new Date(new Date().getTime() - 43000); // timeago goes from 'a few seconds' to 'about a minute' at the 45 second mark

React.render(<Counter></Counter>, document.getElementById("example2"));
React.render(<PersonCards></PersonCards>, document.getElementById("people"));
React.render(<Echo txt="hello"></Echo>, document.getElementById("example4"));
React.render(<RGB></RGB>, document.getElementById("example5"));
React.render(<Avatar username="pwh"></Avatar>, document.getElementById('example6'));
React.render(<ProductTable.FilterableProductTable products={ProductTable.PRODUCTS} />, document.getElementById("example7"));
//React.render(<CheckLink href="http://www.google.com" title="googly">Go <i>To</i> Google</CheckLink>, document.getElementById("example8"));
React.render(<Reveal text="Toggle it" hide="false"><TimeAgo date={d}></TimeAgo></Reveal>, document.getElementById("example8"));