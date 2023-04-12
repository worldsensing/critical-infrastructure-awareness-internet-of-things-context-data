import React from 'react'
import PropTypes from 'prop-types'
import Toolbar from '@material-ui/core/Toolbar'

import EnhancedTableFilter from './EnhancedTableFilter.js'

import './css/EnhancedTableToolbar.css'

let EnhancedTableToolbar = (props) => {
  const { title } = props

  let toolbarLeftSide = <h4>{title}</h4>
  let toolbarRightSide = (
    <div className="div-filter">
      {props.filterOptions.length > 0 && (
        <div>
          <label>Filter by</label>
          <EnhancedTableFilter
            options={props.filterOptions}
            filterChange={props.filterChange}
            classForFilter={'enhanced_filter_list_header'}
          />
        </div>
      )}
    </div>
  )

  return (
    <div>
      <Toolbar>
        <div className="title">{toolbarLeftSide}</div>
        <div className="spacer" />
        <div className="actions">{toolbarRightSide}</div>
      </Toolbar>
    </div>
  )
}

EnhancedTableToolbar.propTypes = {
  title: PropTypes.string.isRequired,
  filterOptions: PropTypes.array.isRequired,
  filterChange: PropTypes.func
}

export default EnhancedTableToolbar