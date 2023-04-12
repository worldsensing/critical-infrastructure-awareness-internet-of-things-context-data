import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import EnhancedTable from '../components/table/EnhancedTable.js'
import ContextAPI from '../api/contextAPI.js'
import { ContextAwareRule, EventRule, EventRuleType, ConditionRule, ResponseProcedure, ProcedureType } from '../models/context.js'

import { combineArrayNoDuplication } from '../toolbox/utils.js'

function createData(name, type, context_aware_rule_name, extra_info) {
  return { name, type, context_aware_rule_name, extra_info}
}

export class ContextAwareRulesTab extends React.Component {
  constructor(props) {
    super(props)

    this.randomIDToForceRefresh = 0
    this.state = {
      selectedDeviceName: '',
      devices: [],
      devicesRows: [],
      filterValues: []
    }
  }

  // TODO Z This function is called twice
  componentDidMount() {
    ContextAPI.getContextAwareRules(false, (response) => {
      var contextAwareRulesFromApi = response.message.map((context_aware_rules) => {
        return new ContextAwareRule(context_aware_rules.name, context_aware_rules.executing)
      })
      var resultRows = contextAwareRulesFromApi.map((context_aware_rule) => {
        const extra_info = {
          "executing": context_aware_rule.executing
        }
        return createData(
          context_aware_rule.name,
          "ContextAwareRule",
          "-",
          JSON.stringify(extra_info, null, 2)
        )
      })

      // TODO CombineArray can be removed once TODO Z is solved
      this.setState(prevState => ({
        devices: [...prevState.devices, ...combineArrayNoDuplication(contextAwareRulesFromApi, prevState.devices)],
        devicesRows: [...prevState.devicesRows, ...combineArrayNoDuplication(resultRows, prevState.devicesRows)],
      }))
    })
    ContextAPI.getEventRules(false, (response) => {
      var eventRulesFromAPI = response.message.map((event_rule) => {
        return new EventRule(event_rule.name, event_rule.value_to_compare_integer, event_rule.value_to_compare_boolean,
          event_rule.value_to_compare_string, event_rule.value_to_compare_float, event_rule.context_aware_rule_name, 
          event_rule.event_rule_type_name, event_rule.sensor_1_name, event_rule.sensor_2_name)
      })
      var resultRows = eventRulesFromAPI.map((event_rule) => {
        const extra_info = {
          "value_to_compare_integer": event_rule.value_to_compare_integer,
          "value_to_compare_boolean": event_rule.value_to_compare_boolean,
          "value_to_compare_string": event_rule.value_to_compare_string,
          "value_to_compare_float": event_rule.value_to_compare_float,
          "event_rule_type_name": event_rule.event_rule_type_name,
          "sensor_1_name": event_rule.sensor_1_name,
          "sensor_2_name": event_rule.sensor_2_name,
        }
        return createData(
          event_rule.name,
          "EventRule",
          event_rule.context_aware_rule_name,
          JSON.stringify(extra_info, null, 2),
        )
      })
      
      // TODO CombineArray can be removed once TODO Z is solved
      this.setState(prevState => ({
        devices: [...prevState.devices, ...combineArrayNoDuplication(eventRulesFromAPI, prevState.devices)],
        devicesRows: [...prevState.devicesRows, ...combineArrayNoDuplication(resultRows, prevState.devicesRows)],
      }))
    })
    ContextAPI.getEventRuleTypes(false, (response) => {
      var eventRuleTypesFromAPI = response.message.map((event_rule_type) => {
        return new EventRuleType(event_rule_type.name, event_rule_type.event_rule_type, 
          event_rule_type.event_rule_comparation_type, event_rule_type.event_rule_value_type)
      })
      var resultRows = eventRuleTypesFromAPI.map((event_rule_type) => {
        const extra_info = {
          "event_rule_type": event_rule_type.event_rule_type,
          "event_rule_comparation_type": event_rule_type.event_rule_comparation_type,
          "event_rule_value_type": event_rule_type.event_rule_value_type
        }
        return createData(
          event_rule_type.name,
          "EventRuleType",
          "-",
          JSON.stringify(extra_info, null, 2)
        )
      })
      
      // TODO CombineArray can be removed once TODO Z is solved
      this.setState(prevState => ({
        devices: [...prevState.devices, ...combineArrayNoDuplication(eventRuleTypesFromAPI, prevState.devices)],
        devicesRows: [...prevState.devicesRows, ...combineArrayNoDuplication(resultRows, prevState.devicesRows)],
      }))
    })
    ContextAPI.getConditionRules(false, (response) => {
      var conditionRuleFromAPI = response.message.map((condition_rule) => {
        return new ConditionRule(condition_rule.name, condition_rule.context_aware_rule_name, 
          condition_rule.condition_comparation_type, condition_rule.event_rule_1_name, condition_rule.event_rule_2_name,
          condition_rule.condition_rule_1_name, condition_rule.condition_rule_2_name)
      })
      var resultRows = conditionRuleFromAPI.map((condition_rule) => {
        const extra_info = {
          "condition_comparation_type": condition_rule.condition_comparation_type,
          "event_rule_1_name": condition_rule.event_rule_1_name,
          "event_rule_2_name": condition_rule.event_rule_2_name,
          "condition_rule_1_name": condition_rule.condition_rule_1_name,
          "condition_rule_2_name": condition_rule.condition_rule_2_name
        }
        return createData(
          condition_rule.name,
          "ConditionRule",
          condition_rule.context_aware_rule_name,
          JSON.stringify(extra_info, null, 2)
        )
      })
      
      // TODO CombineArray can be removed once TODO Z is solved
      this.setState(prevState => ({
        devices: [...prevState.devices, ...combineArrayNoDuplication(conditionRuleFromAPI, prevState.devices)],
        devicesRows: [...prevState.devicesRows, ...combineArrayNoDuplication(resultRows, prevState.devicesRows)],
      }))
    })
    ContextAPI.getResponseProcedures(false, (response) => {
      var responseProcedureFromAPI = response.message.map((response_procedure) => {
        return new ResponseProcedure(response_procedure.name, response_procedure.context_aware_rule_name, 
          response_procedure.procedure_type_name, response_procedure.actuator_name)
      })
      var resultRows = responseProcedureFromAPI.map((response_procedure) => {
        const extra_info = {
          "procedure_type_name": response_procedure.procedure_type_name,
          "actuator_name": response_procedure.actuator_name
        }
        return createData(
          response_procedure.name,
          "ResponseProcedure",
          response_procedure.context_aware_rule_name,
          JSON.stringify(extra_info, null, 2)
        )
      })
      
      // TODO CombineArray can be removed once TODO Z is solved
      this.setState(prevState => ({
        devices: [...prevState.devices, ...combineArrayNoDuplication(responseProcedureFromAPI, prevState.devices)],
        devicesRows: [...prevState.devicesRows, ...combineArrayNoDuplication(resultRows, prevState.devicesRows)],
      }))
    })
    ContextAPI.getProcedureTypes(false, (response) => {
      var procedureTypesFromAPI = response.message.map((procedure_type) => {
        return new ProcedureType(procedure_type.name, procedure_type.procedure_type)
      })
      var resultRows = procedureTypesFromAPI.map((procedure_type) => {
        const extra_info = {
          "procedure_type": procedure_type.procedure_type,
        }
        return createData(
          procedure_type.name,
          "ProcedureType",
          "-",
          JSON.stringify(extra_info, null, 2)
        )
      })
      
      // TODO CombineArray can be removed once TODO Z is solved
      this.setState(prevState => ({
        devices: [...prevState.devices, ...combineArrayNoDuplication(procedureTypesFromAPI, prevState.devices)],
        devicesRows: [...prevState.devicesRows, ...combineArrayNoDuplication(resultRows, prevState.devicesRows)],
      }))
    })
  }

  render() {
    const columns = [
      {
        id: 'name',
        label: 'Name'
      },
      {
        id: 'type',
        label: 'Type'
      },
      {
        id: 'context_aware_rule_name',
        label: 'ContextAwareRule'
      },
      {
        id: 'extra_info',
        label: 'Extra Information'
      }
    ]

    this.randomIDToForceRefresh++

    return (
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
        style={{ marginTop: '20px' }}
      >
        <Grid item xs={8}>
          <Paper key={this.randomIDToForceRefresh}>
            <EnhancedTable
              toolbarTitle={'Context Aware Rules (ContextAwareRules, EventRules [+Types], ConditionRules, ResponseProcedures [+Types])'}
              filterValues={this.state.filterValues}
              dataColumns={columns}
              dataRows={this.state.devicesRows}
            />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default ContextAwareRulesTab