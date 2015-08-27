'use strict';

import React from 'react'
import { Button, ButtonToolbar } from 'react-bootstrap'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'

import EquipmentContainer from './EquipmentContainer'
import JobContainer from './JobContainer'
import OperationsContainer from './OperationsContainer'
import MaterialsContainer from './MaterialsContainer'

const ButtonContainer = React.createClass({
  render() {
    return (
      <ButtonToolbar>
        <Button onClick={this.props.handleSubmit} bsStyle="primary">Confirm</Button>
        <Button onClick={this.props.handleSubmit}>Reset</Button>
      </ButtonToolbar>
    )
  }
});

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      equipmentValid: getters.equipmentValid,
    }
  },

  handleSubmit: function(event) {
    actions.submitJob()
    window.scrollTo (0,0)
  },

  render() {
    var jobContainer = <div></div>;
    var operationsContainer = <div></div>;
    var materialsContainer = <div></div>;
    var buttonContainer = <div></div>;
    if (this.state.equipmentValid) {
      jobContainer = <JobContainer />;
      operationsContainer = <OperationsContainer />
      materialsContainer = <MaterialsContainer />
      buttonContainer = <ButtonContainer handleOnSubmit={this.handleSubmit} />;
    }
    return (
      <div className="container">
        <form >
          <h2>Small Entities - Job Confirmation</h2>
          <EquipmentContainer />
          { jobContainer }
          { operationsContainer }
          { materialsContainer }
          <div>
            <br />
            { buttonContainer }
          </div>
        </form>
      </div>
    );
  }
});
