let Rx = require("rx");

let bus = new Rx.Subject();

let Actions = {
    UPDATE_THEME: {},
    TOGGLE_COUNTER : {}
};

module.exports = {
    bus, Actions
};