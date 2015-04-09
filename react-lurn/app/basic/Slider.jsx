var React = require("react");

module.exports = React.createClass({
   render() {
       return (
           <div>
               <input type="range" max="255" min="0" ref="inp" onChange={this.props.update}/>
           </div>
       );
   }
});