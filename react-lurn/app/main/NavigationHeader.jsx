var React = require('react');
var { DropdownButton, MenuItem, Nav, Navbar } = require('react-bootstrap');
var { NavItemLink } = require("react-router-bootstrap");

var NavigationHeader = React.createClass({
    render() {
        return (
            <Navbar staticTop brand={<a href="#">Project X</a>}>
                <Nav>
                    <NavItemLink eventKey={1} to='/'>Widgets</NavItemLink>
                    <NavItemLink eventKey={2} to='states'>States</NavItemLink>
                    <DropdownButton eventKey={3} title='Stuff'>
                        <MenuItem eventKey='1'>Action</MenuItem>
                        <MenuItem eventKey='2'>Another action</MenuItem>
                        <MenuItem eventKey='3'>Something else here</MenuItem>
                        <MenuItem divider />
                        <MenuItem eventKey='4'>Separated link</MenuItem>
                    </DropdownButton>
                </Nav>
            </Navbar>
        );
    }
});

module.exports = NavigationHeader;