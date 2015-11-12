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
      workcenterDisabled: getters.jobWorkcenterDisabled
    }
  },

  updateField(fieldName, e) {
    actions.setJobValue(fieldName, e.target.value)
  },

  render: function () {
    let job = this.state.job.toJS();
    let processCreateClassName = "marked end";
    let processPlanClassName = "unmarked";
    let processConfirmClassName = "unmarked";
    let processInvoiceClassName = "unmarked";
    if (job.process === 'X3') {
      processCreateClassName = "marked";
      processPlanClassName = "marked end";
      processConfirmClassName = "unmarked";
      processInvoiceClassName = "unmarked";
    } else if (job.process === 'X4') {
      processCreateClassName = "marked";
      processPlanClassName = "marked";
      processConfirmClassName = "marked end";
      processInvoiceClassName = "unmarked";
    } else if (job.process === 'X1') {
      processCreateClassName = "marked";
      processPlanClassName = "marked";
      processConfirmClassName = "marked";
      processInvoiceClassName = "marked end";
    }
    var fixedPrice = <div></div>;
    if (job.maint_act_type.match(/^(FP|OH|MX|CX|UC|UP)/)) {
      fixedPrice = <JobFixedPrice job={job} onUpdateField={this.updateField} bsStyle={validations.vs(validations.validatePriceForFlow(job.fixed_price, job.maint_act_type))} />
    }
    var remarksCustomer = <div></div>;
    if (job.process.match(/^(X1|X4)/)) {
      remarksCustomer = <Input type="textarea" label="Remarks Customer (Visible on Invoice)" placeholder="Remarks Customer" value={job.sales_order_text} onChange={this.updateField.bind(this, "sales_order_text")} />
    }
    return (
      <div className="row job-details">
        <div className="col-lg-8 col-lg-offset-2">
          <div className="form-inline">
            <div className='process-select'>
              <label className={processCreateClassName}><input type='radio' name='process' value='X2' checked={job.process === 'X2'} onChange={this.updateField.bind(this, "process")}></input><span className="process-label">Create</span> <span className="glyphicon glyphicon-triangle-top process-marker"></span></label>
              <label className={processPlanClassName}><input type='radio' name='process' value='X3' checked={job.process === 'X3'} onChange={this.updateField.bind(this, "process")}></input><span>Plan</span> <span className="glyphicon glyphicon-triangle-top process-marker"></span></label>
              <label className={processConfirmClassName}><input type='radio' name='process' value='X4' checked={job.process === 'X4'} onChange={this.updateField.bind(this, "process")}></input><span>Confirm</span> <span className="glyphicon glyphicon-triangle-top process-marker"></span></label>
              <label className={processInvoiceClassName}><input type='radio' name='process' value='X1' checked={job.process === 'X1'} onChange={this.updateField.bind(this, "process")}></input><span>Invoice</span> <span className="glyphicon glyphicon-triangle-top process-marker"></span></label>
            </div>
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
            <Input type="text" label="Execution Date" placeholder="Execution Date" value={job.execution_date} bsStyle={validations.vs(validations.validateExecutionDate(job.execution_date))} hasFeedback onChange={this.updateField.bind(this, "execution_date")} />
            <Input type="text" label="Work Center" placeholder="Work Center" value={job.main_workctr} bsStyle={validations.vs(validations.validateMainWorkcenter(job.main_workctr))} hasFeedback onChange={this.updateField.bind(this, "main_workctr")} disabled={this.state.workcenterDisabled} />
            <Input type="text" label="Description" placeholder="Description" value={job.description} bsStyle={validations.vs(validations.validateDescription(job.description))} hasFeedback onChange={this.updateField.bind(this, "description")} />
            { remarksCustomer }
          </div>
        </div>
      </div>
    );
  },
});
