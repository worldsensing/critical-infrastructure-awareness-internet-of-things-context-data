import React from 'react'
import PropTypes from 'prop-types'

import './css/EnhancedTableFilter.css'

class EnhancedTableFilter extends React.Component {
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    const filterName = this.props.options[0]
    const newValue = event.target.value

    this.props.filterChange(
      filterName,
      newValue
    )
  }

  render() {
    const { classForFilter, options } = this.props

    return (
      <label>
        <select
          onChange={this.handleChange}
          className={classForFilter}
        >
          {options.map((option, i) => {
            return (
              <option key={i}>
                {option}
              </option>
            )
          })}
        </select>
      </label>
    )
  }
}

EnhancedTableFilter.propTypes = {
  classForFilter: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
}

export default EnhancedTableFilter