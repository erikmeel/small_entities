'use strict';

import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'

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
    window.scrollTo (0,0)
  },

  render() {
    return (
      <div className="container">
        <form >
          <h2>Small Entities - Job Confirmation</h2>
          <EquipmentContainer />
          <JobContainer />
          <OperationsContainer />
          <MaterialsContainer />
          <div>
            <br />
            <ButtonToolbar>
              <Button onClick={this.handleSubmit} bsStyle="primary">Confirm</Button>
              <Button onClick={this.handleSubmit}>Reset</Button>
            </ButtonToolbar>
          </div>
        </form>
      </div>
    );
  }
});
