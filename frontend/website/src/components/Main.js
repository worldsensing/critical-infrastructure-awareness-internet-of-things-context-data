import React, { Component } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import DeviceTab from '../pages/device.js'
import FeaturesOfInterestTab from '../pages/features_of_interest.js'
import ObservationTab from '../pages/observation.js'
import ContextAwareRulesTab from '../pages/context_aware_rules.js'
import ActuationTab from '../pages/actuation.js'
import GrafanaTab from '../pages/grafana.js'

import '../App.css'

// <Route path="/actuations" element={<ActuationTab />} />
class Main extends Component {
  render() {
    return (
      <div className="app-content">
        <Routes>
          <Route path="/devices" element={<DeviceTab />} />
          <Route path="/features-of-interest" element={<FeaturesOfInterestTab />} />
          <Route path="/observations" element={<ObservationTab />} />
          <Route path="/context-aware-rules" element={<ContextAwareRulesTab />} />
          <Route path="/actuations" element={<ActuationTab />} />
          <Route path="/grafana" element={<GrafanaTab />} />
          <Route
                exact
                path="/"
                render={() => {
                    return (
                      <Navigate to="/devices" />
                    )
                }}
              />
        </Routes>
      </div>
    )
  }
}

export default Main