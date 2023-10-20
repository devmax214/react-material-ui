import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from '@material-ui/core/TablePagination';
import Checkbox from '@material-ui/core/Checkbox';
// core components
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle";
import EnhancedTableToolBar from "./EnhancedTableToolBar.jsx";
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...tableStyle(theme),
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

class CustomPaginationTable extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selected: [],
      page: 0,
      rowsPerPage: 10,
      noteKey: null,
      reasonKey: null,
      open: false,
      checkedIds: [],
      tableHeaderColor: '',
      tableHead: [],
      tableData: [],
      cellClassWidth: [],
      usingCheckBox: '',
      unselected: '',
    }
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      tableHeaderColor: nextProps.tableHeaderColor,
      tableHead: nextProps.tableHead,
      tableData: nextProps.tableData,
      cellClassWidth: nextProps.cellClassWidth,
      usingCheckBox: nextProps.usingCheckBox,
      unselected: this.getNumAsQuery(nextProps.tableData, nextProps.usingCheckBox.role),
      selected: [],
      checkedIds: [],
    })
  }

  handleChangePage = (event, page) => {
    this.setState({ selected: [] })
    this.setState({ checkedIds: [] })
    this.setState({ page })
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  };

  isSelected = id => this.state.checkedIds.indexOf(id) !== -1

  rowData = (data, headData) => {
    if (window.innerWidth > 600 || window.location.pathname.includes("/admin")) return true
    this.props.rowDetail(data, headData)
  }

  clickCheckBox = (rowKey, id) => {
    const { selected } = this.state
    const { checkedIds } = this.state
    const selectedIndex = selected.indexOf(rowKey)
    let newSelected = []
    let newCheckedIds = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, rowKey);
      newCheckedIds = newCheckedIds.concat(checkedIds, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      newCheckedIds = newCheckedIds.concat(checkedIds.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      newCheckedIds = newCheckedIds.concat(checkedIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );

      newCheckedIds = newCheckedIds.concat(
        checkedIds.slice(0, selectedIndex),
        checkedIds.slice(selectedIndex + 1),
      );
    }

    this.setState({ selected: newSelected });
    this.setState({ checkedIds: newCheckedIds });
  }

  onSelectAllClick = (event, checked) => {
    let Data = this.state.tableData
    if (checked) {
      let selectKey = []
      let selectIds = []
      Data.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).forEach((row, key) => {
        if (row[2].props.role === this.props.usingCheckBox.role) {
          selectKey.push(key)
          selectIds.push(row[2].props.id)
        }
      })

      this.setState({ selected: selectKey })
      this.setState({ checkedIds: selectIds })
      return;
    }
    this.setState({ selected: [] });
    this.setState({ checkedIds: [] });
  }

  getNumAsQuery(data, query) {
    let output = data.map((row, key) => { return row[2].props.role === query ? key : 0; });
    let evalCheckBox = []

    for (let index = 0; index * this.state.rowsPerPage <= output.length; index++) {
      // eslint-disable-next-line
      evalCheckBox.push(eval(output.slice(index * this.state.rowsPerPage, index * this.state.rowsPerPage + this.state.rowsPerPage).join('+')) > 0 ? true : false)
    }
    return evalCheckBox
  }

  render() {
    const { classes } = this.props
    const { order, orderBy, page, rowsPerPage, selected, checkedIds, tableHeaderColor, tableHead, tableData, cellClassWidth, usingCheckBox, unselected } = this.state
    const hiddenKeys = []

    return (
      <div className={classes.tableResponsive}>
        {usingCheckBox.enable && checkedIds.length > 0 ?
          <EnhancedTableToolBar checkedIds={checkedIds} markAsRead={() => this.props.markAsRead(this.state.checkedIds)} /> : null
        }
        <Table className={classes.table}>
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((columnTitle, orderKey) => {
                let mobileHide = ''
                if (columnTitle === getMessage('Note') || columnTitle === getMessage('Reject Reason')) {
                  hiddenKeys.push(orderKey)
                  mobileHide = classes.mobileHide
                }

                if (columnTitle === 'checkbox' && usingCheckBox.enable && unselected[page])
                  return (
                    <TableCell
                      key={orderKey}
                      className={classes.tableCell + " " + classes.tableHeadCell}
                      style={{
                        width: cellClassWidth[orderKey] + '%'
                      }}
                    >
                      <Checkbox
                        indeterminate={selected.length > 0 && selected.length < tableData.length}
                        checked={selected.length > 0}
                        onChange={this.onSelectAllClick}
                      />
                    </TableCell>
                  );

                return columnTitle !== 'checkbox' ?
                  (
                    <TableCell
                      key={orderKey}
                      className={classes.tableCell + " " + classes.tableHeadCell + " " + mobileHide}
                      sortDirection={orderBy === orderKey ? order : false}
                      style={{
                        width: cellClassWidth[orderKey] + '%'
                      }}
                    >
                      {columnTitle}
                    </TableCell>
                  ) : (
                    <TableCell key={orderKey} className={classes.tableCell + " " + cellClassWidth}></TableCell>
                  )
              }, this)}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((rowData, key) => {
              const isSelected = this.isSelected(rowData[2].props.id);
              return (
                <TableRow
                  key={key}
                  hover
                  role="checkbox"
                  aria-checked={isSelected}
                  tabIndex={-1}
                  selected={isSelected}
                  className={classes.tableRow}
                  onClick={() => this.rowData(rowData, tableHead)}
                >
                  {rowData.map((cellData, i) => {
                    let mobileHide = hiddenKeys.indexOf(i) !== -1 ? classes.mobileHide : ''
                    return (
                      <TableCell
                        key={i}
                        className={classes.tableCell + " " + mobileHide}
                        style={{
                          width: cellClassWidth[i] + '%'
                        }}
                      >{cellData}</TableCell>
                    )
                  })}
                  {usingCheckBox.enable && (usingCheckBox.role === rowData[2].props.role) ? (
                    <TableCell
                      className={classes.tableCell}
                      onClick={() => this.clickCheckBox(key, rowData[2].props.id)}
                      selected={isSelected}
                      style={{
                        width: cellClassWidth[rowData.length - 1] + '%'
                      }}
                    >
                      <Checkbox checked={isSelected} />
                    </TableCell>
                  ) : (
                      <TableCell></TableCell>
                    )}
                </TableRow>
              );
            })}
            {tableData.length === 0 && (
              <TableRow><TableCell colSpan={tableHead.length}>{getMessage('No data to display.')}</TableCell></TableRow>
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

CustomPaginationTable.defaultProps = {
  tableHeaderColor: "gray",
  usingCheckBox: {},
};

CustomPaginationTable.propTypes = {
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
  usingCheckBox: PropTypes.any,
  markAsRead: PropTypes.func,
};

export default withStyles(styles)(CustomPaginationTable);

