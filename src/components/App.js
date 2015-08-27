'use strict';

import React from 'react'
import { Alert, Button, ButtonToolbar } from 'react-bootstrap'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'

import EquipmentContainer from './EquipmentContainer'
import JobContainer from './JobContainer'
import OperationsContainer from './OperationsContainer'
import MaterialsContainer from './MaterialsContainer'

const FlashContainer = React.createClass({
  render() {
    if (this.props.flashMessageVisisble) {
      return (
        <Alert bsStyle='success' onDismiss={this.handleAlertDismiss} dismissAfter={1000}>
          <h4>Job Sent Successfully</h4>
          <p>The service job was successfully sent to SAP where it will be processed. Check transaction ZSTC_REPROCESSING for more information.</p>
          </Alert>
      )
    }
    return <div></div>
  },

  handleAlertDismiss() {
    actions.dismissFlash();
  }
});

const ButtonContainer = React.createClass({
  handleSubmit: function(event) {
    actions.submitJob()
    window.scrollTo (0,0)
  },

  render() {
    return (
      <ButtonToolbar>
        <Button onClick={this.handleSubmit} bsStyle="primary">Confirm</Button>
        <Button>Reset</Button>
      </ButtonToolbar>
    )
  }
});

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      flashMessage: getters.flashSuccess,
      flashMessageVisisble: getters.flashMessageVisisble,
      equipmentValid: getters.equipmentValid,
    }
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
        <FlashContainer flashMessage={this.state.flashMessage} flashMessageVisisble={this.state.flashMessageVisisble} />
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
