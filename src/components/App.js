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
        <Alert bsStyle={this.props.flashStyle} onDismiss={this.handleAlertDismiss} dismissAfter={15000}>
          <p>{this.props.flashMessage}</p>
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
    var wellStyles = {maxWidth: 400, margin: '0 auto 10px'};

    return (
      <div className='well' style={wellStyles}>
        <Button onClick={this.handleSubmit} bsStyle='primary' bsSize='large' block>Submit Job</Button>
      </div>
    )
  }
});

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      flashMessageSuccess: getters.flashSuccess,
      flashMessageError: getters.flashError,
      flashMessageVisisble: getters.flashMessageVisisble,
      equipmentValid: getters.equipmentValid,
      jobValid: getters.jobValid,
    }
  },

  render() {
    var jobContainer = <div></div>;
    var operationsContainer = <div></div>;
    var materialsContainer = <div></div>;
    var buttonContainer = <div className="text-center">The form is not complete yet</div>;
    if (this.state.equipmentValid) {
      jobContainer = <JobContainer />;
      operationsContainer = <OperationsContainer />
      materialsContainer = <MaterialsContainer />
      if (this.state.jobValid) {
        buttonContainer = <ButtonContainer handleOnSubmit={this.handleSubmit} />;
      }
    }
    var flashContainer = <div></div>
    if (this.state.flashMessageSuccess) {
      flashContainer = <FlashContainer flashMessage={this.state.flashMessageSuccess} flashMessageVisisble={this.state.flashMessageVisisble} flashStyle='success' />
    } else if (this.state.flashMessageError) {
      flashContainer = <FlashContainer flashMessage={this.state.flashMessageError} flashMessageVisisble={this.state.flashMessageVisisble} flashStyle='danger' />
    }
    return (
      <div className="container">
        {flashContainer}
        <form >
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
