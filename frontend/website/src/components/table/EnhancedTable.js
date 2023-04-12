import React from 'react'
import PropTypes from 'prop-types'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import EnhancedTableHead from './EnhancedTableHead.js'
import EnhancedTableToolbar from './EnhancedTableToolbar.js'
import { stableSort, getComparator } from './tableUtils.js'

import './css/EnhancedTable.css';

class EnhancedTable extends React.Component {
  constructor(props) {
    super(props)

    this.dataRows = props.dataRows

    this.state = {
      order: 'asc',
      orderBy: 'name',
      dataColumns: props.dataColumns,
      dataRowsFiltered: props.dataRows,
      page: 0,
      rowsPerPage: 10
    }
  }

  handleRequestSort = (event, property) => {
    this.setState(prevState => ({
      order: prevState.order === 'desc' && prevState.orderBy === property ? 'asc' : 'desc',
      orderBy: property
    }))
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({
      page: 0,
      rowsPerPage: event.target.value
    })
  }

  filterChange(filterName, filterValue) {
    this.tempRows = []
    this.dataRows.forEach(function (rowToFilter) {
      if (filterName === "All Devices") {
        if (filterName === filterValue) {
          this.tempRows.push(rowToFilter)
        } else if (filterValue === rowToFilter.device_name) {
          this.tempRows.push(rowToFilter)
        }
      }
    }, this)

    this.setState({ dataRowsFiltered: this.tempRows })
  }

  render() {
    const {
      dataRowsFiltered,
      dataColumns,
      order,
      orderBy,
      rowsPerPage,
      page
    } = this.state

    return (
      <Paper>
        <EnhancedTableToolbar
          title={this.props.toolbarTitle}
          filterChange={this.filterChange.bind(this)}
          filterOptions={this.props.filterValues}
        />
        <Table aria-labelledby="table">
          <EnhancedTableHead
            dataColumns={dataColumns}
            order={order}
            orderBy={orderBy}
            onRequestSort={this.handleRequestSort}
          />
          <TableBody>
            {stableSort(dataRowsFiltered, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow
                    hover
                    key={row.name}
                  >
                    {dataColumns.map(dataColumn => (
                      <TableCell
                        key={row.id + dataColumn.id}
                        onClick={() => this.props.onClickonRow(row)}
                      >
                        {row[dataColumn.id]}
                      </TableCell>
                    ))}
                  </TableRow>
                )
              })}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15, 20, 25]}
          component="div"
          count={dataRowsFiltered.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        />
      </Paper>
    )
  }
}

EnhancedTable.propTypes = {
  toolbarTitle: PropTypes.string.isRequired,
  filterValues: PropTypes.array,
  dataColumns: PropTypes.array.isRequired,
  dataRows: PropTypes.array.isRequired,
  onClickonRow: PropTypes.func
}

EnhancedTable.defaultProps = {
  toolbarTitle: 'Default title',
  dataColumns: {},
  dataRows: {},
  onClickonRow: () => { }
}

export default EnhancedTable