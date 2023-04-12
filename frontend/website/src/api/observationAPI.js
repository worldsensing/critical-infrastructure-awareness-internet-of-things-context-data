import ApiServiceBase from './ApiServiceBase.js'
import Config from '../config.js'

class ObservationAPI extends ApiServiceBase {
  constructor() {
    super()
    this.baseUrl = Config.services.api_observations.url
  }

  getObservations(priority, callback) {
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

  getObservation(id, priority, callback, errorCallback) {
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

  addObservation(observation, priority, callback, errorCallback) {
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

  deleteObservation(id, priority, callback, errorCallback) {
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

export default new ObservationAPI()