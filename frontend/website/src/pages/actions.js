import React from 'react'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';

import DeviceAPI from '../api/deviceAPI.js'
import ObservationAPI from '../api/observationAPI.js'
import { Sensor } from '../models/device.js'

export class ObservationTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      sensors: [{name:'Loading Sensors...'}],
      selectedSensor: '',
      currentObservation: '',
      observablePropertySelected: "Observable Property",
      consoleValue: "$ "
    }
  }

  componentDidMount() {
    DeviceAPI.getAllSensors(false, (response) => {
      var sensorsFromApi = response.message.map((sensor) => {
        return new Sensor(sensor.name, sensor.type, sensor.device_type, sensor.location, sensor.info, sensor.active, sensor.observable_property)
      })

      this.setState({ sensors: sensorsFromApi })
    })
  }

  appendToConsole(message) {
    let newConsoleValue = this.state.consoleValue + " " + message + "\n\n $"

    this.setState({ consoleValue: newConsoleValue })
  }

  handleSelectChange(event) {
    console.log("Selected")
    console.log(event.target.value)

    const sensorSel = event.target.value
    this.setState({ selectedSensor: sensorSel })

    let observableProperty = "None"
    for (var i = 0; i < this.state.sensors.length; i++) {
      if (this.state.sensors[i].name === sensorSel.name) {
        observableProperty = this.state.sensors[i].observable_property
      }
    }
    
    this.appendToConsole("Selected sensor\n"+JSON.stringify(sensorSel))

    this.setState({ observablePropertySelected: observableProperty })
  }

  handleChangeObservation(event) {
    this.setState({ currentObservation: event.target.value })
  }

  handleClickAddObservation(event) {
    console.log("Sending Observation...")

    const observation = {
      "sensor_name": this.state.selectedSensor.name,
      "observable_property": this.state.observablePropertySelected,
      "value_int": parseInt(this.state.currentObservation)
    }

    this.appendToConsole("Sending Observation\n"+JSON.stringify(observation))

    ObservationAPI.addObservation(observation, false, (response) => {
      console.log(response)
    })
  }

  render() {
    return (
      <Grid 
        container
        spacing={2} 
        justifyContent="center" 
        alignItems="flex-start"
        style={{ marginTop: '20px' }}
      >
        <Grid item xs={11} sm={8} md={6}>
          <Card sx={{ minWidth: 275 }}>
          <CardContent>
            <Grid 
              container
              spacing={2} 
              justifyContent="center" 
              alignItems="flex-start"
              style={{ marginTop: '20px' }}
            >
              <Grid item xs={7} sm={5} md={5}>
                <h2>
                  Insert a new Observation
                </h2>
                <FormControl fullWidth>
                  <InputLabel id="sensor-select-label">Sensor</InputLabel>
                  <Select
                    labelId="sensor-select-select1"
                    id="sensor-select-select2"
                    value={this.state.selectedSensor}
                    onChange={this.handleSelectChange.bind(this)}
                  >
                    {this.state.sensors.map(function(sensor, i){
                        return <MenuItem value={sensor} key={i}> {sensor.name} </MenuItem>;
                    })}
                  </Select>
                </FormControl>

                <TextField id="input-observable-property-value" 
                  label={this.state.observablePropertySelected} 
                  variant="standard"
                  disabled={true}/>
                <br/>
                <TextField id="input-observation-value" 
                  label="Input Observation Value" 
                  variant="standard" 
                  onChange={this.handleChangeObservation.bind(this)}/>
              </Grid>
              <Grid item xs={5} sm={7} md={7}>
                <TextField id="input-console-value" 
                  label="Console" 
                  value={this.state.consoleValue}
                  minRows={4}
                  inputProps={{ style: { fontFamily: "monospace", fontSize: "14px" } }}
                  multiline
                  fullWidth/>
              </Grid>
            </Grid>
            </CardContent>
            <CardActions>
              <Button size="small" 
                onClick={this.handleClickAddObservation.bind(this)}>Send</Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    )
  }
}

export default ObservationTab