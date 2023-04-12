class Actuation {
    constructor(
      id,
      actuator_name,
      actuatable_property_name,
      time_start,
      time_end
    ) {
      this.id = id
      this.actuator_name = actuator_name
      this.actuatable_property_name = actuatable_property_name
      this.time_start = time_start
      this.time_end = time_end
    }
  }
  
  export default Actuation