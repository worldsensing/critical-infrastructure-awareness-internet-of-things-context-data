class ContextAwareRule {
  constructor(name = 'Sample name', executing = false) {
    this.name = name
    this.executing = executing
  }
}

class EventRule {
  constructor(name = 'Sample name', value_to_compare_integer, value_to_compare_boolean, value_to_compare_string, 
    value_to_compare_float, context_aware_rule_name, event_rule_type_name, sensor_1_name, sensor_2_name) {
    this.name = name
    this.value_to_compare_integer = value_to_compare_integer
    this.value_to_compare_boolean = value_to_compare_boolean
    this.value_to_compare_string = value_to_compare_string
    this.value_to_compare_float = value_to_compare_float
    this.context_aware_rule_name = context_aware_rule_name
    this.event_rule_type_name = event_rule_type_name
    this.sensor_1_name = sensor_1_name
    this.sensor_2_name = sensor_2_name
  }
}

class EventRuleType {
  constructor(name = 'Sample name', event_rule_type, event_rule_comparation_type, event_rule_value_type) {
    this.name = name
    this.event_rule_type = event_rule_type
    this.event_rule_comparation_type = event_rule_comparation_type
    this.event_rule_value_type = event_rule_value_type
  }
}

class ConditionRule {
  constructor(name = 'Sample name', context_aware_rule_name, condition_comparation_type, event_rule_1_name, 
    event_rule_2_name, condition_rule_1_name, condition_rule_2_name) {
    this.name = name
    this.context_aware_rule_name = context_aware_rule_name
    this.condition_comparation_type = condition_comparation_type
    this.event_rule_1_name = event_rule_1_name
    this.event_rule_2_name = event_rule_2_name
    this.condition_rule_1_name = condition_rule_1_name
    this.condition_rule_2_name = condition_rule_2_name
  }
}

class ResponseProcedure {
  constructor(name = 'Sample name', context_aware_rule_name, procedure_type_name, actuator_name) {
    this.name = name
    this.context_aware_rule_name = context_aware_rule_name
    this.procedure_type_name = procedure_type_name
    this.actuator_name = actuator_name
  }
}

class ProcedureType {
  constructor(name = 'Sample name', procedure_type) {
    this.name = name
    this.procedure_type = procedure_type
  }
}

export { ContextAwareRule, EventRule, EventRuleType, ConditionRule, ResponseProcedure, ProcedureType }