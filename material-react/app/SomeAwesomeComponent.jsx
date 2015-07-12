import React from 'react';
import ThemeToggle from './ThemeToggle.jsx';
import mui from 'material-ui';
import MyComponent from './MyComponent.jsx';
import AnotherComponent from './AnotherComponent.jsx';
import { bus, Actions } from './EventSys';
let { AppBar, RaisedButton } = mui;
let ThemeManager = new mui.Styles.ThemeManager();


class SomeAwesomeComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { showTimer : true };
    }

    componentWillMount() {
        bus.filter(x => x.type === Actions.UPDATE_THEME)
            .subscribe(x => {
                ThemeManager.setComponentThemes(x.data);
                this.forceUpdate()
            });

        bus.filter(x => x.type === Actions.TOGGLE_COUNTER)
            .subscribe(x => {
                let s = this.state;
                let newState = _.extend(s, { showTimer : ! s.showTimer });
                console.log("ns", newState)
                this.setState(newState);
            });
    }

    getChildContext() {
        return {
            muiTheme: ThemeManager.getCurrentTheme()
        };
    }

    onClick() {
        bus.onNext({type: Actions.TOGGLE_COUNTER, data: {}});
    }

    render() {
        let maybeTimer = this.state.showTimer ? <MyComponent/> : null;
        return (
            <div>
                <AppBar title='Title' iconClassNameLeft="muidocs-icon-action-home"/>
                {maybeTimer}
                <ThemeToggle/>
                <RaisedButton label="Default" onClick={this.onClick} />
                <AnotherComponent/>
            </div>
        );
    }

};

SomeAwesomeComponent.childContextTypes = {muiTheme: React.PropTypes.object };

export default SomeAwesomeComponent;