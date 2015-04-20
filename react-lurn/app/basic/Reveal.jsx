var React = require("react/addons");

var Reveal = React.createClass({


    propTypes: {
        hide: React.PropTypes.bool
    },

    getInitialState() {
        return {
            hide: this.props.hide
        };
    },

    toggleOpen() {
        var nextHide = ! this.state.hide;
        this.setState({
            hide: nextHide
        });
    },

    render() {
        var cx = React.addons.classSet;

        var childClasses = cx({
            hide : this.state.hide
        });

        var revealClasses = cx('no-text-select');

        return (
            <div className={revealClasses}>
                <h3 onClick={this.toggleOpen}> {this.props.text}</h3>
                <div className={childClasses}>
                    {this.props.children}
                </div>
            </div>
        );
    }
});



module.exports = Reveal;