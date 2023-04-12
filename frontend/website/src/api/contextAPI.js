import ApiServiceBase from './ApiServiceBase.js'
import Config from '../config.js'

class ContextAPI extends ApiServiceBase {
  constructor() {
    super()
    this.baseUrlContextAwareRules = Config.services.api_context_aware_rules.url
    this.baseUrlEventRules = Config.services.api_event_rules.url
    this.baseUrlEventRuleTypes = Config.services.api_event_rule_types.url
    this.baseUrlConditionRules = Config.services.api_condition_rules.url
    this.baseUrlResponseProcedures = Config.services.api_response_procedures.url
    this.baseUrlProcedureTypes = Config.services.api_procedure_types.url
  }

  getContextAwareRules(priority, callback) {
    this.getFromUrl(
      this.baseUrlContextAwareRules,
      (responseJson) => {
        const response = responseJson
        if (response) {
          console.log(response)
          callback(response)
        }
      },
      priority
    )
  }

  getEventRules(priority, callback) {
    this.getFromUrl(
      this.baseUrlEventRules,
      (responseJson) => {
        const response = responseJson
        if (response) {
          console.log(response)
          callback(response)
        }
      },
      priority
    )
  }

  getEventRuleTypes(priority, callback) {
    this.getFromUrl(
      this.baseUrlEventRuleTypes,
      (responseJson) => {
        const response = responseJson
        if (response) {
          console.log(response)
          callback(response)
        }
      },
      priority
    )
  }

  getConditionRules(priority, callback) {
    this.getFromUrl(
      this.baseUrlConditionRules,
      (responseJson) => {
        const response = responseJson
        if (response) {
          console.log(response)
          callback(response)
        }
      },
      priority
    )
  }
  getResponseProcedures(priority, callback) {
    this.getFromUrl(
      this.baseUrlResponseProcedures,
      (responseJson) => {
        const response = responseJson
        if (response) {
          console.log(response)
          callback(response)
        }
      },
      priority
    )
  }
  getProcedureTypes(priority, callback) {
    this.getFromUrl(
      this.baseUrlProcedureTypes,
      (responseJson) => {
        const response = responseJson
        if (response) {
          console.log(response)
          callback(response)
        }
      },
      priority
    )
  }
}

export default new ContextAPI()