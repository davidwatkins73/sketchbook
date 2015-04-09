var React = require("react");
var Reflux = require("reflux");
var request = require("superagent");



module.exports = {
    BookmarkTypes : {
          DOC: Symbol()
        , SCM: Symbol()
        , TASK: Symbol()
        , QA: Symbol()
    },

    Bookmark : React.createClass({
        render() {
            return (
                <div>
                    <BookmarkIcon type={this.props.type}></BookmarkIcon>
                    {this.props.url}
                </div>
            );
        }
    })
};