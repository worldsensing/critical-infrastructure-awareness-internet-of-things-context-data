import React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

import EnhancedTable from '../components/table/EnhancedTable.js'
import DeviceAPI from '../api/deviceAPI.js'
import { Gateway, Group, Sensor } from '../models/device.js'

import { combineArrayNoDuplication } from '../toolbox/utils.js'

function createData(name, type, location_name, info, active, extra_info) {
  return { name, type, location_name, info, active, extra_info}
}

export class DeviceTab extends React.Component {
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
    DeviceAPI.getGroups(false, (response) => {
      var groupsFromApi = response.message.map((group) => {
        return new Group(group.name, group.location_name)
      })
      var resultRows = groupsFromApi.map((group) => {
        return createData(
          group.name,
          "Group",
          group.location_name
        )
      })

      // TODO CombineArray can be removed once TODO Z is solved
      this.setState(prevState => ({
        devices: [...prevState.devices, ...combineArrayNoDuplication(groupsFromApi, prevState.devices)],
        devicesRows: [...prevState.devicesRows, ...combineArrayNoDuplication(resultRows, prevState.devicesRows)],
      }))
    })
    DeviceAPI.getThings(false, (response) => {
      var thingsFromApi = response.message.map((thing) => {
        return new Gateway(thing.name, thing.location_name, thing.info, thing.active)
      })
      var resultRows = thingsFromApi.map((thing) => {
        let extra_info = ""

        return createData(
          thing.name,
          "Thing",
          thing.location_name,
          thing.info,
          thing.active ? "Yes" : "No",
          extra_info
        )
      })
      
      // TODO CombineArray can be removed once TODO Z is solved
      this.setState(prevState => ({
        devices: [...prevState.devices, ...combineArrayNoDuplication(thingsFromApi, prevState.devices)],
        devicesRows: [...prevState.devicesRows, ...combineArrayNoDuplication(resultRows, prevState.devicesRows)],
      }))
    })
    DeviceAPI.getGateways(false, (response) => {
      var gatewaysFromApi = response.message.map((gateway) => {
        return new Gateway(gateway.name, gateway.location_name, gateway.info, gateway.active, 
          gateway.power_type, gateway.connectivity, gateway.modem_signal, gateway.power_supply)
      })
      var resultRows = gatewaysFromApi.map((gateway) => {
        let extra_info = ""

        if (gateway.power_type) {
          extra_info += "Power Type: " + gateway.power_type + ", "
        }
        if (gateway.connectivity) {
          extra_info += "Connectivity: " + gateway.connectivity + ", "
        }
        if (gateway.modem_signal) {
          extra_info += "Modem Signal: " + gateway.modem_signal + ", "
        }
        if (gateway.power_supply) {
          extra_info += "Power Supply: " + gateway.power_supply + ", "
        }

        return createData(
          gateway.name,
          "Gateway",
          gateway.location_name,
          gateway.info,
          gateway.active ? "Yes" : "No",
          extra_info
        )
      })
      
      // TODO CombineArray can be removed once TODO Z is solved
      this.setState(prevState => ({
        devices: [...prevState.devices, ...combineArrayNoDuplication(gatewaysFromApi, prevState.devices)],
        devicesRows: [...prevState.devicesRows, ...combineArrayNoDuplication(resultRows, prevState.devicesRows)],
      }))
    })
    DeviceAPI.getSensors(false, (response) => {
      var sensorsFromApi = response.message.map((sensor) => {
        return new Sensor(sensor.name, sensor.thing_name, sensor.observable_property_name, sensor.locationname, sensor.info, sensor.active)
      })
      var resultRows = sensorsFromApi.map((sensor) => {
        const extra_info = {
          "observable_property_name": sensor.observable_property_name,
        }
        return createData(
          sensor.name,
          "Sensor",
          sensor.location_name,
          sensor.info,
          sensor.active ? "Yes" : "No",
          JSON.stringify(extra_info, null, 2)
        )
      })

      // TODO CombineArray can be removed once TODO Z is solved
      this.setState(prevState => ({
        devices: [...prevState.devices, ...combineArrayNoDuplication(sensorsFromApi, prevState.devices)],
        devicesRows: [...prevState.devicesRows, ...combineArrayNoDuplication(resultRows, prevState.devicesRows)],
      }))
    })
    DeviceAPI.getActuators(false, (response) => {
      var actuatorsFromApi = response.message.map((actuator) => {
        return new Sensor(actuator.name, actuator.thing_name, actuator.actuatable_property_name, 
          actuator.locationname, actuator.info, actuator.active)
      })
      var resultRows = actuatorsFromApi.map((actuator) => {
        return createData(
          actuator.name,
          "Actuator",
          actuator.location_name,
          actuator.info,
          actuator.active ? "Yes" : "No",
          ''
        )
      })

      // TODO CombineArray can be removed once TODO Z is solved
      this.setState(prevState => ({
        devices: [...prevState.devices, ...combineArrayNoDuplication(actuatorsFromApi, prevState.devices)],
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
        id: 'location_name',
        label: 'Location'
      },
      {
        id: 'info',
        label: 'Info'
      },
      {
        id: 'active',
        label: 'Active'
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
              toolbarTitle={'Devices (Groups, Things, Gateways, Sensors, and Actuators)'}
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

export default DeviceTab