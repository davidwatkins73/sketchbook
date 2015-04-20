var React = require("react");
var PersonCards = require("../people/PersonCards.jsx");
var Echo = require("../echo/Echo.jsx");
var RGB = require("../basic/RGB.jsx");
var Avatar = require("../avatar/Avatar.jsx");
var ProductTable = require("../productTable/ProductTable.jsx");
var CheckLink = require("../basic/CheckLink.jsx");
var TimeAgo = require("../basic/Timeago.jsx");
var Reveal = require("../basic/Reveal.jsx");

module.exports = React.createClass({
    render() {
        var d = new Date(new Date().getTime() - 43000); // timeago goes from 'a few seconds' to 'about a minute' at the 45 second mark

        return (
            <div className="content">
                <div className="row">
                    <div className="col-md-3"><Avatar username='pwh'/></div>
                    <div className="col-md-3"><Reveal text="Toggle it" hide="false"><TimeAgo date={d}></TimeAgo></Reveal></div>
                    <div className="col-md-3"><CheckLink href="http://www.google.com" title="googly">Go <i>To</i> Google</CheckLink></div>
                    <div className="col-md-3"><RGB/></div>
                </div>
                <div className="row">
                    <div className="col-md-3"><Echo txt='initial text'/></div>
                    <div className="col-md-3"><PersonCards/></div>
                    <div className="col-md-3"><ProductTable.FilterableProductTable products={ProductTable.PRODUCTS} /></div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        );
    }
});
