import React from 'react'
import { Input } from 'react-bootstrap'

import JobFixedPrice from '../../common/components/JobFixedPrice'
import validations from '../../common/utils/SmallEntityValidations'

import reactor from '../reactor'
import getters from '../getters'
import actions from '../actions'

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getInitialState: function() {
    return {
    }
  },

  getDataBindings() {
    return {
      job: getters.job,
    }
  },

  updateField(fieldName, e) {
    actions.setJobValue(fieldName, e.target.value)
  },

  render: function () {
    let job = this.state.job.toJS();
    var fixedPrice = <div></div>;
    if (job.maint_act_type.match(/^(FP|OH|MX|CX|UC|UP)/)) {
      fixedPrice = <JobFixedPrice job={job} onUpdateField={this.updateField} bsStyle={validations.vs(validations.validatePriceForFlow(job.fixed_price, job.maint_act_type))} />
    }
    return (
      <div className="row">
        <div className="col-sm-6 col-lg-4">
          <Input type='select' label='Flow' placeholder='select' value={job.maint_act_type} onChange={this.updateField.bind(this, "maint_act_type")} bsStyle={validations.vs(validations.validateFlow(job.maint_act_type))} hasFeedback>
            <option value="select">Select a Flow</option>
            <option value="FP">Fixed Price</option>
            <option value="OH">Overhaul Fixed Price</option>
            <option value="MX">Motor Xchange</option>
            <option value="CX">Converter Xchange</option>
            <option value="UC">Upgrades (Controls)</option>
            <option value="UP">Upgrades (Protection)</option>
            <option value="CH">Service Repair</option>
            <option value="SG">Service Goodwill</option>
            <option value="GW">Sales Goodwill</option>
          </Input>
          { fixedPrice }
        </div>
        <div className="col-sm-6 col-lg-4">
          <Input type="text" label="Execution Date" placeholder="Execution Date" value={job.execution_date} bsStyle={validations.vs(validations.validateExecutionDate(job.execution_date))} hasFeedback onChange={this.updateField.bind(this, "execution_date")} />
          <Input type="text" label="Work Center" placeholder="Work Center" value={job.main_workctr} bsStyle={validations.vs(validations.validateMainWorkcenter(job.main_workctr))} hasFeedback onChange={this.updateField.bind(this, "main_workctr")} />
        </div>
        <div className="col-sm-12 col-lg-4">
          <Input type="text" label="Description" placeholder="Description" value={job.description} bsStyle={validations.vs(validations.validateDescription(job.description))} hasFeedback onChange={this.updateField.bind(this, "description")} />
          <Input type="textarea" label="Remarks Customer (Visible on Invoice)" placeholder="Remarks Customer" value={job.sales_order_text} onChange={this.updateField.bind(this, "sales_order_text")} />
        </div>
      </div>
    );
  },
});
