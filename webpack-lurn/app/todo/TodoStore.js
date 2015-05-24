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
    COUNTER: 0,
    KEY: 'sketchbook.todo',
    write() {
        var json = JSON.stringify(this.items);
        window.localStorage.setItem(this.KEY, json);
        this.trigger(this.items);
    },
    onAdd(task) {
        var item = {
            label: task,
            id: ++this.COUNTER,
            complete: false
        };

        this.items = _.union(this.items, [item]);
        this.write();
    },
    onToggle(id) {
        var item = _.findWhere(this.items, { id });
        if (item) {
            item.complete = ! item.complete ;
            this.write();
        }
    },
    onClearCompleted() {
        this.items = _.reject(this.items, 'complete');
        this.write();
    },
    getInitialState: function() {
        var json = window.localStorage.getItem(this.KEY) || '[]';
        this.items = JSON.parse(json);
        this.COUNTER = this.items.length;
        return this.items;
    }
});

module.exports = {
    Actions,
    Store
};