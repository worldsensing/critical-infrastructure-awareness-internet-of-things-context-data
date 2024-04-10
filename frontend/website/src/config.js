console.log('Running in mode: ' + process.env.REACT_APP_MODE)

const dev_url = "http://localhost"
const prod_url = "http://localhost:8000"
//const prod_url = "http://34.122.80.205:8000" // EXTERNAL_URL

const dev = {
  services: {
    api_actuatable_properties: {
      url: dev_url + ':5000/actuatable-properties/',
    },
    api_actuations: {
      url: dev_url + ':5000/actuations/'
    },
    api_actuators: {
      url: dev_url + ':5000/actuators/'
    },
    api_condition_rules: {
      url: dev_url + ':5000/condition-rules/'
    },
    api_context_aware_rules: {
      url: dev_url + ':5000/context-aware-rules/'
    },
    api_event_rules: {
      url: dev_url + ':5000/event-rules/'
    },
    api_event_rule_types: {
      url: dev_url + ':5000/event-rule-types/'
    },
    api_features_of_interest: {
      url: dev_url + ':5000/features-of-interest/'
    },
    api_gateways: {
      url: dev_url + ':5000/gateways/'
    },
    api_groups: {
      url: dev_url + ':5000/groups/'
    },
    api_locations: {
      url: dev_url + ':5000/locations/'
    },
    api_observable_properties: {
      url: dev_url + ':5000/observable-properties/'
    },
    api_observations: {
      url: dev_url + ':5000/observations/'
    },
    api_response_procedures: {
      url: dev_url + ':5000/response-procedures/'
    },
    api_procedure_types: {
      url: dev_url + ':5000/procedure-types/'
    },
    api_sensors: {
      url: dev_url + ':5000/sensors/'
    },
    api_things: {
      url: dev_url + ':5000/things/'
    },
    grafana: {
      url: dev_url + ':3001'
    }
  }
}

const prod = {
  services: {
    api_actuatable_properties: {
      url: prod_url + '/api/actuatable-properties/',
    },
    api_actuations: {
      url: prod_url + '/api/actuations/'
    },
    api_actuators: {
      url: prod_url + '/api/actuators/'
    },
    api_condition_rules: {
      url: prod_url + '/api/condition-rules/'
    },
    api_context_aware_rules: {
      url: prod_url + '/api/context-aware-rules/'
    },
    api_event_rules: {
      url: prod_url + '/api/event-rules/'
    },
    api_event_rule_types: {
      url: prod_url + '/api/event-rule-types/'
    },
    api_features_of_interest: {
      url: prod_url + '/api/features-of-interest/'
    },
    api_gateways: {
      url: prod_url + '/api/gateways/'
    },
    api_groups: {
      url: prod_url + '/api/groups/'
    },
    api_locations: {
      url: prod_url + '/api/locations/'
    },
    api_observable_properties: {
      url: prod_url + '/api/observable-properties/'
    },
    api_observations: {
      url: prod_url + '/api/observations/'
    },
    api_response_procedures: {
      url: prod_url + '/api/response-procedures/'
    },
    api_procedure_types: {
      url: prod_url + '/api/procedure-types/'
    },
    api_sensors: {
      url: prod_url + '/api/sensors/'
    },
    api_things: {
      url: prod_url + '/api/things/'
    },
    api_graph: {
      url: prod_url + '/api/graph/'
    },
    grafana: {
      url: prod_url + '/grafana'
    }
  }
}

const config = process.env.REACT_APP_MODE === 'production' ? prod : dev

export default config