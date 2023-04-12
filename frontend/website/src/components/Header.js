import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

import '../App.css'

class Header extends Component {
  render() {
    return (
      <div>
        <header className="header">
          <div>
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/devices" style={({ isActive }) => ({ fontWeight: isActive ? '600' : '300' })}>
                  Devices
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/features-of-interest" style={({ isActive }) => ({ fontWeight: isActive ? '600' : '300' })}>
                  Features of Interest
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/observations" style={({ isActive }) => ({ fontWeight: isActive ? '600' : '300' })}>
                  Observations
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/context-aware-rules" style={({ isActive }) => ({ fontWeight: isActive ? '600' : '300' })}>
                  Context Aware Rules
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/actuations" style={({ isActive }) => ({ fontWeight: isActive ? '600' : '300' })}>
                  Actuations
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/grafana" style={({ isActive }) => ({ fontWeight: isActive ? '600' : '300' })}>
                  Grafana Monitoring
                </NavLink>
              </li>
            </ul>
          </div>
        </header>
      </div>
    )
  }
}

export default Header