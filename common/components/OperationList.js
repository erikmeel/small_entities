'use strict';

var React = require('react');

var OperationList = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
  },

  render: function () {
    return (
      <div className="operations">
        <div className="row">
          <div className="col-lg-8 col-lg-offset-2">
            <div className="row">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = OperationList;
