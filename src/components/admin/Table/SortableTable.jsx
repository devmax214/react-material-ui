import React from "react";
import PropTypes from "prop-types";
import moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from '@material-ui/core/TablePagination';
import TableSortLabel from '@material-ui/core/TableSortLabel';
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle";
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...tableStyle(theme),
  tableCell: {
    ...tableStyle(theme).tableCell,
    "@media (max-width: 600px)": {
      fontSize: "14px"
    }
  },
  tableHeadCell: {
    ...tableStyle(theme).tableHeadCell,
    "@media (max-width: 600px)": {
      fontSize: "14px"
    }
  },
  tableRow: {
    '&:nth-child(odd)': {
      backgroundColor: "#f2f2f2",
    },
    "@media (max-width: 600px)": {
      height: "30px"
    }
  },
  tableSortlabel: {
    color: "#9c27b0",
    '&:hover, &:focus': {
      color: "#9c27b0",
    }
  },
  tableResponsive: {
    margin: "0",
    overflowX: "auto",
  },
  pageNationToolBar: {
    '& > div': {
      "@media (max-width: 767px)": {
        paddingLeft: "0",
        '& > div:first-child': {
          display: "none",
        },
      },
      '& > div': {
        fontSize: "13px"
      }
    },
    '& button': {
      "@media (max-width: 600px)": {
        width: "42px"
      }
    }
  },
  mobileHide: {
    "@media (max-width: 767px)": {
      display: "none"
    }
  },
  mobileReason: {
    "@media (max-width: 767px)": {
      display: "none"
    }
  }
});

class SortableTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      order: props.firstOrderBy ? props.firstOrderBy : 'asc',
      orderBy: 0,
      selected: [],
      page: 0,
      rowsPerPage: 10,
      noteKey: null,
      reasonKey: null,
      open: false,
      checkedIds: [],
    }

    this.fieldID = props.tableHead.indexOf('ID');
  }

  getSorting = (order, orderBy) => {
    return order === 'desc'
      ? (a, b) => (this.getFormatValue(a, orderBy) < this.getFormatValue(b, orderBy) ? 1 : -1)
      : (a, b) => (this.getFormatValue(a, orderBy) < this.getFormatValue(b, orderBy) ? -1 : 1)
  }

  getFormatValue = (row, orderBy) => {
    const { tableDataTypes } = this.props
    const value = row[orderBy]

    if (tableDataTypes) {
      if (tableDataTypes[orderBy]) {
        if (tableDataTypes[orderBy] === 'date') {
          if (value) {
            return moment(value, 'MM/DD/YYYY').format('YYYYMMDD')
          }
        } else if (tableDataTypes[orderBy] === 'number') {
          if (value) {
            return parseFloat(value.replace(/[$,¥]/g, ''))
          }
        } else if (tableDataTypes[orderBy] === 'date-ID') {
          if (this.fieldID !== -1) {
            return row[this.fieldID]
          }
        }
      }
    }

    return value;
  }

  handleRequestSort = property => event => {
    const orderBy = property
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  };

  handleChangePage = (event, page) => {
    this.setState({ page })
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1

  rowData = (data, headData) => {
    if (window.innerWidth > 600 || window.location.pathname.includes("/admin")) return true
    this.props.rowDetail(data, headData)
  }

  render() {
    const { classes, tableHeaderColor, tableHead, tableData, cellClassWidth } = this.props
    const { order, orderBy, page, rowsPerPage } = this.state
    let mobileDisplay = this.props.mobileDisplay

    if (mobileDisplay.length === 0) {
      mobileDisplay = tableHead.map((cell, i) => i);
    }

    return (
      <div className={classes.tableResponsive}>
        <Table className={classes.table}>
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((columnTitle, orderKey) => {
                let mobileHide = ''
                if (mobileDisplay.indexOf(orderKey) === -1) {
                  mobileHide = classes.mobileHide
                }

                if (columnTitle === 'ID') {
                  return null
                } else if (columnTitle === '') {
                  return <TableCell key={orderKey} className={classes.tableCell + " " + cellClassWidth[orderKey]}></TableCell>
                } else {
                  return <TableCell
                    key={orderKey}
                    className={classes.tableCell + " " + classes.tableHeadCell + " " + mobileHide}
                    sortDirection={orderBy === orderKey ? order : false}
                    style={{
                      width: cellClassWidth[orderKey] + '%'
                    }}
                  >
                    <TableSortLabel
                      active={orderBy === orderKey}
                      direction={order}
                      onClick={this.handleRequestSort(orderKey)}
                      className={classes.tableSortlabel}
                    >
                      {columnTitle}
                    </TableSortLabel>
                  </TableCell>
                }
              }, this)}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.sort(this.getSorting(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((rowData, key) => {
                return (
                  <TableRow
                    key={key}
                    hover
                    tabIndex={-1}
                    className={classes.tableRow}
                    onClick={() => this.rowData(rowData, tableHead)}
                  >
                    {rowData.map((cellData, i) => {
                      if (i === this.fieldID) {
                        return null;
                      } else {
                        let mobileHide = mobileDisplay.indexOf(i) === -1 ? classes.mobileHide : ''
                        return (
                          <TableCell
                            key={i}
                            className={classes.tableCell + " " + mobileHide}
                            style={{
                              width: cellClassWidth[i] + '%'
                            }}
                          >{cellData}</TableCell>
                        )
                      }
                    })}
                  </TableRow>
                )
              })}
            {tableData.length === 0 && (
              <TableRow>
                <TableCell colSpan={this.fieldID === -1 ? tableHead.length : tableHead.length - 1}>
                  {getMessage('No data to display.')}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {tableData.length > 10 && (
          <TablePagination
            className={classes.pageNationToolBar}
            component="div"
            count={tableData.length}
            labelRowsPerPage={getMessage('Rows per page:')}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[10, 25, 50, 100]}
            page={page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        )}
      </div>
    );
  }
}

SortableTable.defaultProps = {
  tableHeaderColor: "gray",
  mobileDisplay: []
};

SortableTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.any)).isRequired,
  tableDataTypes: PropTypes.arrayOf(PropTypes.string),
  rowDetail: PropTypes.func,
  cellClassWidth: PropTypes.arrayOf(PropTypes.string),
};

export default withStyles(styles)(SortableTable);
