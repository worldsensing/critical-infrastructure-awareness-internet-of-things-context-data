import React from 'react'
import Iframe from 'react-iframe'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import EnhancedTable from '../components/table/EnhancedTable.js'
import DeviceAPI from '../api/deviceAPI.js'
import ObservationAPI from '../api/observationAPI.js'
import Observation from '../models/observation.js'
import { Sensor } from '../models/device.js'
import config from '../config'

function createData(id, sensor_name, observable_property_name, time_start, time_end, value) {
  return { id, sensor_name, observable_property_name, time_start, time_end, value }
}

export class ObservationTab extends React.Component {
  constructor(props) {
    super(props)

    this.randomIDToForceRefresh = 0
    this.state = {
      observations: [],
      observationsRows: [],
      filterValues: ['All Sensors']
    }
  }

  componentDidMount() {
    ObservationAPI.getObservations(false, (response) => {
      var observationsFromApi = response.message.map((observation) => {
        return new Observation(observation.id, observation.sensor_name, observation.observable_property_name,
          observation.time_start, observation.time_end, observation.value_int, observation.value_float,
          observation.value_bool, observation.value_str)
      })
      var resultRows = observationsFromApi.map((observation) => {
        var value;
        if (observation.value_int !== null) {
          value = observation.value_int
        } else if (observation.value_float !== null) {
          value = observation.value_float
        } else if (observation.value_bool !== null) {
          value = observation.value_bool
        } else {
          value = observation.value_str
        }
        return createData(observation.id, observation.sensor_name, observation.observable_property_name, 
          observation.time_start, observation.time_end, value)
      })
      this.setState({ observations: observationsFromApi, observationsRows: resultRows })

      if (resultRows.length > 0) {
        this.onClickonRow(resultRows[0])
      }
    })

    DeviceAPI.getSensors(false, (response) => {
      var sensorsFromApi = response.message.map((sensor) => {
        return new Sensor(sensor.name, sensor.thing_name, sensor.observable_property_name, sensor.location, sensor.info, sensor.active)
      })
      var resultFilters = sensorsFromApi.map((sensor) => {
        return sensor.name
      })
      resultFilters.unshift('All Sensors')
      this.setState({ filterValues: resultFilters })
    })
  }

  onClickonRow(row) {
    this.setState({ selectedSensorName: row.sensor_name })
  }

  render() {
    const columns = [
      {
        id: 'id',
        label: 'ID'
      },
      {
        id: 'value',
        label: 'Value'
      },
      {
        id: 'time_start',
        label: 'Time' //'Time Start'
      },
      //{
      //  id: 'time_end',
      //  label: 'Time End'
      //},
      {
        id: 'sensor_name',
        label: 'Sensor'
      },
      {
        id: 'observable_property_name',
        label: 'ObservableProperty'
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
        <Grid item xs={6}>
          <Paper key={this.randomIDToForceRefresh}>
            <EnhancedTable
              toolbarTitle={'Observations'}
              filterValues={this.state.filterValues}
              dataColumns={columns}
              dataRows={this.state.observationsRows}
              onClickonRow={this.onClickonRow.bind(this)}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper key={this.randomIDToForceRefresh} style={{ height: '375px' }}>
            <Iframe
              url={`${config.services.grafana.url}/d/VyeKOtuZl/sensor-dashboard?orgId=1&var-sensor_name=${this.state.selectedSensorName}&kiosk&fullscreen`}
              width="100%"
              height="100%"
            />
          </Paper>
        </Grid>
      </Grid>
    )
  }
}

export default ObservationTab