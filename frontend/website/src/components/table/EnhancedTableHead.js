import React from 'react'
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip'

import './css/EnhancedTableHead.css';

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property)
  }

  render() {
    const { dataColumns, order, orderBy } = this.props

    return (
      <TableHead>
        <TableRow
          className="head-row">
          {dataColumns.map(column => {
            return (
              <TableCell
                className="head-cell"
                key={column.id}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title={"Sort"}
                  enterDelay={250}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            )
          }, this)}
        </TableRow>
      </TableHead>
    )
  }
}

EnhancedTableHead.propTypes = {
  dataColumns: PropTypes.array.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
}

export default EnhancedTableHead