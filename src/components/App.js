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
        <Alert bsStyle='success' onDismiss={this.handleAlertDismiss} dismissAfter={15000}>
          <p>The service job was successfully sent to SAP where it will be processed.</p>
          <p>The following transactions can be called in SAP for more information</p>
          <ul>
            <li><strong>ZSTC_REPROCESSING</strong> for monitoring the processing.</li>
            <li><strong>IW59</strong> for a listing of all notifications.</li>
          </ul>
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
      jobValid: getters.jobValid,
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
      if (this.state.jobValid) {
        buttonContainer = <ButtonContainer handleOnSubmit={this.handleSubmit} />;
      }
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
            <br />
          </div>
        </form>
      </div>
    );
  }
});
