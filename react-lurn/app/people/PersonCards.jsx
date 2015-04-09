var React = require("react");
var Reflux = require("reflux");

var PeopleStore = require("./PersonStore.jsx");
var PersonCard = require("./PersonCard.jsx");

module.exports =  React.createClass({
    mixins: [Reflux.connect(PeopleStore)],
    render() {
        return (
            <div>
                <h1>Remote Cards</h1>
                {
                    this.state.people.map(p => {
                        return ( <PersonCard name={p.name} avatar={p.avatar}></PersonCard> );
                    })
                }
            </div>
        );
    }
});