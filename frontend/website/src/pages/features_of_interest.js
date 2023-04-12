import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import EnhancedTable from '../components/table/EnhancedTable.js'
import FeaturesAPI from '../api/featuresAPI.js'
import { FeatureOfInterest, ObservableProperty, ActuatableProperty } from '../models/features.js'

import { combineArrayNoDuplication } from '../toolbox/utils.js'

function createData(name, type, feature_of_interest, location_name, extra_info) {
  return { name, type, feature_of_interest, location_name, extra_info}
}

export class FeaturesOfInterestTab extends React.Component {
  constructor(props) {
    super(props)

    this.randomIDToForceRefresh = 0
    this.state = {
      selectedDeviceName: '',
      devices: [],
      devicesRows: [],
      filterValues: []
    }
  }

  // TODO Z This function is called twice
  componentDidMount() {
    FeaturesAPI.getFeaturesOfInterest(false, (response) => {
      var featuresFromApi = response.message.map((feature_of_interest) => {
        return new FeatureOfInterest(feature_of_interest.name, feature_of_interest.location_name)
      })
      var resultRows = featuresFromApi.map((feature_of_interest) => {
        return createData(
          feature_of_interest.name,
          "FeatureOfInterest",
          "-",
          feature_of_interest.location_name
        )
      })

      // TODO CombineArray can be removed once TODO Z is solved
      this.setState(prevState => ({
        devices: [...prevState.devices, ...combineArrayNoDuplication(featuresFromApi, prevState.devices)],
        devicesRows: [...prevState.devicesRows, ...combineArrayNoDuplication(resultRows, prevState.devicesRows)],
      }))
    })
    FeaturesAPI.getObservableProperties(false, (response) => {
      var observablePropertiesFromAPI = response.message.map((observable_property) => {
        return new ObservableProperty(observable_property.name, observable_property.type_of_observation, 
          observable_property.feature_of_interest_name, observable_property.location_name)
      })
      var resultRows = observablePropertiesFromAPI.map((observable_property) => {
        return createData(
          observable_property.name,
          "ObservableProperty",
          observable_property.feature_of_interest_name,
          observable_property.location_name,
          observable_property.type_of_observation,
        )
      })
      
      // TODO CombineArray can be removed once TODO Z is solved
      this.setState(prevState => ({
        devices: [...prevState.devices, ...combineArrayNoDuplication(observablePropertiesFromAPI, prevState.devices)],
        devicesRows: [...prevState.devicesRows, ...combineArrayNoDuplication(resultRows, prevState.devicesRows)],
      }))
    })
    FeaturesAPI.getActuatableProperties(false, (response) => {
      var actuatablePropertiesFromAPI = response.message.map((actuatable_property) => {
        return new ActuatableProperty(actuatable_property.name, actuatable_property.feature_of_interest_name, 
          actuatable_property.location_name)
      })
      var resultRows = actuatablePropertiesFromAPI.map((actuatable_property) => {
        return createData(
          actuatable_property.name,
          "ActuatableProperty",
          actuatable_property.feature_of_interest_name,
          actuatable_property.location_name
        )
      })
      
      // TODO CombineArray can be removed once TODO Z is solved
      this.setState(prevState => ({
        devices: [...prevState.devices, ...combineArrayNoDuplication(actuatablePropertiesFromAPI, prevState.devices)],
        devicesRows: [...prevState.devicesRows, ...combineArrayNoDuplication(resultRows, prevState.devicesRows)],
      }))
    })
  }

  render() {
    const columns = [
      {
        id: 'name',
        label: 'Name'
      },
      {
        id: 'type',
        label: 'Type'
      },
      {
        id: 'feature_of_interest',
        label: 'FeatureOfInterest'
      },
      {
        id: 'location_name',
        label: 'Location'
      },
      {
        id: 'extra_info',
        label: 'Extra Information'
      }
    ]

    this.randomIDToForceRefresh++

    return (
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="flex-start"
        style={{ marginTop: '20px' }}
      >
        <Grid item xs={8}>
          <Paper key={this.randomIDToForceRefresh}>
            <EnhancedTable
              toolbarTitle={'Features of Interest (Features of Interest, Observable Properties, and Actuatable Properties)'}
              filterValues={this.state.filterValues}
              dataColumns={columns}
              dataRows={this.state.devicesRows}
            />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default FeaturesOfInterestTab