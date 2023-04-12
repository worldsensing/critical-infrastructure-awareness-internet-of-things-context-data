class FeatureOfInterest {
  constructor(name = 'Sample name', location_name = '') {
    this.name = name
    this.location_name = location_name
  }
}

class ObservableProperty {
  constructor(name = 'Sample name', type_of_observation = 'Sample type', feature_of_interest_name = '', location_name = '') {
    this.name = name
    this.type_of_observation = type_of_observation
    this.feature_of_interest_name = feature_of_interest_name
    this.location_name = location_name
  }
}

class ActuatableProperty {
  constructor(name = 'Sample name', feature_of_interest_name = '', location_name = '') {
    this.name = name
    this.feature_of_interest_name = feature_of_interest_name
    this.location_name = location_name
  }
}

export { FeatureOfInterest, ObservableProperty, ActuatableProperty }