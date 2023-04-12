import ApiServiceBase from './ApiServiceBase.js'
import Config from '../config.js'

class DeviceAPI extends ApiServiceBase {
  constructor() {
    super()
    this.baseUrlGroups = Config.services.api_groups.url
    this.baseUrlThings = Config.services.api_things.url
    this.baseUrlGateways = Config.services.api_gateways.url
    this.baseUrlSensors = Config.services.api_sensors.url
    this.baseUrlActuators = Config.services.api_actuators.url
  }

  getGroups(priority, callback) {
    this.getFromUrl(
      this.baseUrlGroups,
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

  getThings(priority, callback) {
    this.getFromUrl(
      this.baseUrlThings,
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

  getGateways(priority, callback) {
    this.getFromUrl(
      this.baseUrlGateways,
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

  getSensors(priority, callback) {
    this.getFromUrl(
      this.baseUrlSensors,
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

  getActuators(priority, callback) {
    this.getFromUrl(
      this.baseUrlActuators,
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

  /*getDevice(name, priority, callback, errorCallback) {
    this.getFromUrl(
      this.baseUrl + `${name}`,
      (responseJson) => {
        const response = responseJson
        if (response) {
          console.log(response)
          callback(response)
        }
      },
      (errorJson) => {
        const error = errorJson
        if (error) {
          console.log(error)
          errorCallback(error)
        }
      },
      priority
    )
  }*/

  /*addDevice(device, priority, callback, errorCallback) {
    this.postToUrl(
      this.baseUrl,
      device,
      (responseJson) => {
        const response = responseJson
        if (response) {
          console.log(response)
          callback(response)
        }
      },
      (errorJson) => {
        const error = errorJson
        if (error) {
          console.log(error)
          errorCallback(error)
        }
      },
      priority
    )
  }*/

  /*updateDevice(device, priority, callback, errorCallback) {
    this.putToUrl(
      this.baseUrl + `${device.name}`,
      device,
      (responseJson) => {
        const response = responseJson
        if (response) {
          console.log(response)
          callback(response)
        }
      },
      (errorJson) => {
        const error = errorJson
        if (error) {
          console.log(error)
          errorCallback(error)
        }
      },
      priority
    )
  }*/

  /*deleteDevice(name, priority, callback, errorCallback) {
    this.deleteToUrl(
      this.baseUrl + `${name}`,
      (responseJson) => {
        const response = responseJson
        if (response) {
          console.log(response)
          callback(response)
        }
      },
      (errorJson) => {
        const error = errorJson
        if (error) {
          console.log(error)
          errorCallback(error)
        }
      },
      priority
    )
  }*/
}

export default new DeviceAPI()