class Group {
  constructor(name = 'Sample name', location_name = '') {
    this.name = name
    this.location_name = location_name
  }
}

class Thing {
  constructor(name = 'Sample name', location_name = '', info = '', active = '') {
    this.name = name
    this.location_name = location_name
    this.info = info
    this.active = active
  }
}

class Gateway {
  constructor(name = 'Sample name', location_name = '', info = '', active = '', power_type = '', 
    connectivity = '', modem_signal = '', power_supply = '') {
    this.name = name
    this.location_name = location_name
    this.info = info
    this.active = active
    this.power_type = power_type
    this.connectivity = connectivity
    this.modem_signal = modem_signal
    this.power_supply = power_supply
  }
}

class Sensor {
  constructor(name = 'Sample name', thing_name = 'Sample Thing', observable_property_name = 'Sample Observable Property',
    location = '', info = '', active = '') {
    this.name = name
    this.thing_name = thing_name
    this.observable_property_name = observable_property_name
    this.location = location
    this.info = info
    this.active = active
  }
}

class Actuator {
  constructor(name = 'Sample name', thing_name = 'Sample Thing', actuatable_property_name = 'Sample Actuatable Property',
    location = '', info = '', active = '') {
    this.name = name
    this.thing_name = thing_name
    this.actuatable_property_name = actuatable_property_name
    this.location = location
    this.info = info
    this.active = active
  }
}
  
export { Group, Thing, Gateway, Sensor, Actuator }