var _ = require('lodash');
var Reflux = require('reflux');

var Actions = Reflux.createActions([
    "toggle",
    "remove",
    "add",
    "clearCompleted"
]);


var Store = Reflux.createStore( {
    listenables : [Actions],
    onAdd(task) {
        var item = {
            label: task,
            id: this.items.length + 1,
            complete: false
        };

        this.items = _.union(this.items, [item]);
        this.trigger(this.items);
    },
    onToggle(id) {
        var item = _.findWhere(this.items, { id });
        if (item) {
            item.complete = ! item.complete ;
            this.trigger(this.items);
        }
    },
    onClearCompleted() {
        this.items = _.reject(this.items, 'complete');
        this.trigger(this.items);
    },
    getInitialState: function() {
        this.items = [
            {id: 1, label: 'aardvark', complete: false},
            {id: 2, label: 'bear', complete: true},
            {id: 3, label: 'cobra', complete: false}
        ];

        return this.items;
    }
});

module.exports = {
    Actions,
    Store
};