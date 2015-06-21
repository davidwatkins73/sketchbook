let React = require('react');
let {Checkbox, Styles} = require('material-ui');
let {bus, Actions} = require('./EventSys');

let ThemeToggle = React.createClass({
    getInitialState() {
        return {
            checked : false
        };
    },
    onCheck(e, b) {
        console.log("Checked!", b);
        let c = b ? Styles.Colors.amber100 : Styles.Colors.lime500;

        bus.onNext({ type: Actions.UPDATE_THEME, data: {
            raisedButton : {
                color: c
            }
        }});

        this.setState({ checked : b});
    },
    render() {
        return (
            <Checkbox
                label="Change style"
                onCheck={this.onCheck}/>
        )
    }
});

window.m = require('material-ui')

    module.exports = ThemeToggle;