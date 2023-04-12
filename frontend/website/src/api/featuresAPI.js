import ApiServiceBase from './ApiServiceBase.js'
import Config from '../config.js'

class FeaturesAPI extends ApiServiceBase {
  constructor() {
    super()
    this.baseUrlFeaturesOfInterest = Config.services.api_features_of_interest.url
    this.baseUrlObservableProperties = Config.services.api_observable_properties.url
    this.baseUrlActuatableProperties = Config.services.api_actuatable_properties.url
  }

  getFeaturesOfInterest(priority, callback) {
    this.getFromUrl(
      this.baseUrlFeaturesOfInterest,
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

  getObservableProperties(priority, callback) {
    this.getFromUrl(
      this.baseUrlObservableProperties,
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

  getActuatableProperties(priority, callback) {
    this.getFromUrl(
      this.baseUrlActuatableProperties,
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

export default new FeaturesAPI()