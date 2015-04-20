var React = require("react");
var ProductCategoryRow = React.createClass({
    propTypes : {
        category : React.PropTypes.string.isRequired
    },
    render() {
        return (<tr><th colSpan="2">{this.props.category}</th></tr>);
    }
});

var ProductRow = React.createClass({
    propTypes : {
        product : React.PropTypes.object.isRequired
    },
    render() {
        var name = this.props.product.stocked ?
            this.props.product.name :
            <span style={{color: 'red'}}>
                {this.props.product.name}
            </span>;
        return (
            <tr>
                <td>{name}</td>
                <td>{this.props.product.price}</td>
            </tr>
        );
    }
});

var NoProductsFoundRow = React.createClass({
    render() {
        return ( <td colspan="2"><i>No products found</i></td> );
    }
});

var ProductTable = React.createClass({
    propTypes : {
        products : React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
        inStockOnly: React.PropTypes.bool.isRequired
    },
    render() {
        var rows = [];
        var lastCategory = null;
        this.props.products.forEach(function(product) {
            if (product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)) {
                return;
            }
            if (product.category !== lastCategory) {
                rows.push(<ProductCategoryRow category={product.category} key={product.category} />);
            }
            rows.push(<ProductRow product={product} key={product.name} />);
            lastCategory = product.category;
        }.bind(this));

        if (rows.length == 0) {
            rows.push(<NoProductsFoundRow/>);
        }

        return (
            <table className="table table-condensed table-striped" width="100%">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var SearchBar = React.createClass({
    propTypes : {
        filterText : React.PropTypes.string.isRequired,
        inStockOnly: React.PropTypes.bool.isRequired
    },
    handleChange() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value,
            this.refs.inStockOnlyInput.getDOMNode().checked
        );
    },
    render() {
        return (
            <form>
                <input type="text"
                       ref="filterTextInput"
                       placeholder="Search..."
                       value={this.props.filterText}
                       onChange={this.handleChange} />
                <p>
                    <input type="checkbox"
                           ref="inStockOnlyInput"
                           checked={this.props.inStockOnly}
                           onChange={this.handleChange}/>
                    &nbsp;
                    Only show products in stock
                </p>
            </form>
        );
    }
});

var FilterableProductTable = React.createClass({
    propTypes : {
        products: React.PropTypes.arrayOf(React.PropTypes.object).isRequired
    },

    getInitialState() {
        return {
            filterText: '',
            inStockOnly: false
        };
    },

    handleUserInput(filterText, inStockOnly) {
        this.setState({
            filterText: filterText,
            inStockOnly: inStockOnly
        });
    },

    render() {
        return (
            <div>
                <SearchBar
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    onUserInput={this.handleUserInput}
                    />
                <ProductTable
                    products={this.props.products}
                    filterText={this.state.filterText}
                    inStockOnly={this.state.inStockOnly}
                    />
            </div>
        );
    }
});

var PRODUCTS = [
    {category: 'Sporting Goods', price: '$49.99', stocked: true, name: 'Football'},
    {category: 'Sporting Goods', price: '$9.99', stocked: true, name: 'Baseball'},
    {category: 'Sporting Goods', price: '$29.99', stocked: false, name: 'Basketball'},
    {category: 'Electronics', price: '$99.99', stocked: true, name: 'iPod Touch'},
    {category: 'Electronics', price: '$399.99', stocked: false, name: 'iPhone 5'},
    {category: 'Electronics', price: '$199.99', stocked: true, name: 'Nexus 7'}
];

module.exports = {
    FilterableProductTable, PRODUCTS
};

