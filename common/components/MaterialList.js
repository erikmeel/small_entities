'use strict';

var React = require('react');

var MaterialList = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },

  render: function () {
    return (
      <div>{this.props.children}</div>
    );
  }
});

module.exports = MaterialList;
