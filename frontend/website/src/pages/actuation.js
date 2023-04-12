import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import EnhancedTable from '../components/table/EnhancedTable.js'
import DeviceAPI from '../api/deviceAPI.js'
import ActuationAPI from '../api/actuationAPI.js'
import Actuation from '../models/actuation.js'
import { Actuator } from '../models/device.js'

function createData(id, actuator_name, actuatable_property_name, time_start, time_end, value) {
  return { id, actuator_name, actuatable_property_name, time_start, time_end, value }
}

export class ActuationTab extends React.Component {
  constructor(props) {
    super(props)

    this.randomIDToForceRefresh = 0
    this.state = {
      actuations: [],
      actuationsRows: [],
      filterValues: ['All Actuators']
    }
  }

  componentDidMount() {
    ActuationAPI.getActuations(false, (response) => {
      var actuationsFromApi = response.message.map((actuation) => {
        return new Actuation(actuation.id, actuation.actuator_name, actuation.actuatable_property_name,
          actuation.time_start, actuation.time_end)
      })
      var resultRows = actuationsFromApi.map((actuation) => {
        return createData(actuation.id, actuation.actuator_name, actuation.actuatable_property_name, 
          actuation.time_start, actuation.time_end)
      })
      this.setState({ actuations: actuationsFromApi, actuationsRows: resultRows })

      if (resultRows.length > 0) {
        this.onClickonRow(resultRows[0])
      }
    })

    DeviceAPI.getActuators(false, (response) => {
      var actuatorsFromApi = response.message.map((actuator) => {
        return new Actuator(actuator.name, actuator.thing_name, actuator.actuatable_property_name, actuator.location, actuator.info, actuator.active)
      })
      var resultFilters = actuatorsFromApi.map((actuator) => {
        return actuator.name
      })
      resultFilters.unshift('All Actuators')
      this.setState({ filterValues: resultFilters })
    })
  }

  onClickonRow(row) {
    this.setState({ selectedActuatorName: row.actuator_name })
  }

  render() {
    const columns = [
      {
        id: 'id',
        label: 'ID'
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
        id: 'actuator_name',
        label: 'Actuator'
      },
      {
        id: 'actuatable_property_name',
        label: 'ActuatableProperty'
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
              toolbarTitle={'Actuations'}
              filterValues={this.state.filterValues}
              dataColumns={columns}
              dataRows={this.state.actuationsRows}
              onClickonRow={this.onClickonRow.bind(this)}
            />
          </Paper>
        </Grid>
        <Grid item xs={4}>
        </Grid>
      </Grid>
    )
  }
}

export default ActuationTab