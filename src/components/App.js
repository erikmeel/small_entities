'use strict';

import React from 'react'
import actions from '../actions'
import CartContainer from './CartContainer'
import ProductsContainer from './ProductsContainer'
import EquipmentContainer from './EquipmentContainer'
import JobContainer from './JobContainer'
import OperationsContainer from './OperationsContainer'
import MaterialsContainer from './MaterialsContainer'

export default React.createClass({


  handleSubmit: function(event) {
    actions.submitJob()
  },

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          <h2>Small Entities - Job Confirmation</h2>
          <EquipmentContainer />
          <JobContainer />
          <OperationsContainer />
          <MaterialsContainer />
          <div>
            <br />
            <input type="submit" value="Confirm" className="btn btn-primary" />
          </div>
        </form>
      </div>
    );
  }
});
