jest.dontMock('../../app/echo/Echo.jsx');
describe('EchoWidget', function() {
    it('changes the text after input updated', function() {
        var React = require('react/addons');
        var Echo = require('../../app/echo/Echo.jsx');


        var TestUtils = React.addons.TestUtils;

        var echoer = TestUtils.renderIntoDocument(
            <Echo txt="before" />
        );

        var label = TestUtils.findRenderedDOMComponentWithTag(
            echoer, 'h1');
        expect(label.getDOMNode().textContent).toEqual('before');

        var input = TestUtils.findRenderedDOMComponentWithTag(
            echoer, 'input');
        TestUtils.Simulate.change(input, "after");
        expect(label.getDOMNode().textContent).toEqual('after');
    });
});