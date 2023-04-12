import ApiServiceBase from './ApiServiceBase.js'
import Config from '../config.js'

class ActuationAPI extends ApiServiceBase {
  constructor() {
    super()
    this.baseUrl = Config.services.api_actuations.url
  }

  getActuations(priority, callback) {
    this.getFromUrl(
      this.baseUrl,
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

  getActuation(id, priority, callback, errorCallback) {
    this.getFromUrl(
      this.baseUrl + `${id}`,
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
  }

  addActuation(observation, priority, callback, errorCallback) {
    this.postToUrl(
      this.baseUrl,
      observation,
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
  }

  deleteActuation(id, priority, callback, errorCallback) {
    this.deleteToUrl(
      this.baseUrl + `${id}`,
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
  }
}

export default new ActuationAPI()