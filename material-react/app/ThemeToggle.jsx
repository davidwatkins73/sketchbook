import React from 'react';
import {Checkbox, Styles} from 'material-ui';
import {bus, Actions} from './EventSys';

class ThemeToggle extends React.Component{
    constructor(props) {
        super(props);
        this.state =  {
            checked : false
        };
    }

    onCheck(e, b) {
        console.log("Checked!", b);
        let c = b ? Styles.Colors.amber100 : Styles.Colors.lime500;

        bus.onNext({ type: Actions.UPDATE_THEME, data: {
            raisedButton : {
                color: c
            }
        }});

        this.setState({ checked : b});
    }

    render() {
        return (
            <Checkbox
                label="Change style"
                onCheck={this.onCheck}/>
        );
    }
};


export default ThemeToggle;