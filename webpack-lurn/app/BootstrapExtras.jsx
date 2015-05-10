var React = require("react");
var { Input } = require('react-bootstrap');

/*
 var example = (
    <PanelTitle title='hiya'>
        <Button bsSize='xsmall'>Extra small button</Button>
    </PanelTitle>);
 */

var PanelTitle = React.createClass({
    propTypes: {
        title : React.PropTypes.string
    },

    getDefaultProps() {
        return { title: "Defaut Title" }
    },

    render() {
        return (
            <span>{this.props.title}
                <span className='pull-right'>
                    {this.props.children}
                </span>
            </span>
        );
    }
});

module.exports = {
    PanelTitle : PanelTitle
};