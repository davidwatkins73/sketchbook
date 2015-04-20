var React = require("react");
var Reflux = require("reflux");
var _ = require("lodash");

var PeopleStore = require("./PersonStore.js");


var PersonCard =  React.createClass({
    render() {
        return (
            <div className="row">
                <div className="columns small-8">
                    <h4>{this.props.name}</h4>
                </div>
                <div className="columns small-4">
                    <img src={this.props.avatar}/>
                    <span>{this.props.id}</span>
                </div>
            </div>
        );
    }
});

var PersonCards =  React.createClass({
    mixins: [Reflux.connect(PeopleStore)],
    getInitialState() {
        return {
            filterText : "adam"
        }
    },
    onSearch(s) {
        console.log("Search", s);
        this.setState({
            filterText: s
        });
    },
    render() {
        return (
            <div>
                <h1>Remote Cards</h1>
                <SearchBar filterText={this.state.filterText} onUserInput={this.onSearch}></SearchBar>
                <PersonCardList people={this.state.people} filterText={this.state.filterText}></PersonCardList>
            </div>
        );
    }
});


var PersonCardList = React.createClass({
    propTypes: {
        filterText: React.PropTypes.string.isRequired,
        people: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },
    render() {
        var self = this;
        var cards = _.chain(this.props.people)
            .filter(p => {
                return _.contains(p.name.toLowerCase(), self.props.filterText.toLowerCase());
            })
            .map(p => {
                return (<PersonCard name={p.name} avatar={p.avatar}></PersonCard>);
            })
            .value();

        return (
            <div>{cards}</div>
        );

    }
});

var SearchBar = React.createClass({
    propTypes : {
        filterText : React.PropTypes.string.isRequired,
        onUserInput: React.PropTypes.func.isRequired
    },
    handleChange() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value
        );
    },
    render() {
        return (
            <form>
                <input type="text"
                       ref="filterTextInput"
                       placeholder="Search..."
                       value={this.props.filterText}
                       onChange={this.handleChange} />
            </form>
        );
    }
});

module.exports = PersonCards;