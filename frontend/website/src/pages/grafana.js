import React from 'react'
import Iframe from 'react-iframe'

import config from '../config'

export class GrafanaTab extends React.Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <Iframe
        url={`${config.services.grafana.url}/d/VyeKOtuZl/sensor-dashboard?orgId=1`}
        width="100%"
        height="100%"
      />
    )
  }
}

export default GrafanaTab