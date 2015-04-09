var Reflux = require("reflux");
var request = require("superagent");

module.exports = Reflux.createStore({
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
