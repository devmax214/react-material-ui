import React from "react";
import moment from 'moment';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";

import GridItem from "components/admin/Grid/GridItem.jsx";
import CustomInput from "components/admin/CustomInput/CustomInput.jsx";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";

import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";

import { WITHDRAWAL_STATUS } from '../../../constants';
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...tableStyle(theme),
  ...typographyStyle,
  ...cardStyle,
  status: {
    fontSize: '13px',
    textTransform: 'uppercase',
  },
  formControl: {
    minWidth: 120,
    width: "100%",
    margin: "27px 0 0",
    position: "relative",
    paddingBottom: "10px",
  },
  inputLabel: {
    color: "#aaa !important",
    fontSize: "14px !important",
    transformOrigin: "top left !important",
    transform: "translate(0, 1.5px) scale(0.75) !important"
  },
  saleSelect: {
    textTransform: "capitalize",
    '&:after': {
      borderBottom: "2px solid #8e24aa",
    },
    '&:before, &:hover:before': {
      borderBottom: "1px solid rgba(0, 0, 0, 0.2) !important",
    }
  },
  optionSelect: {
    textTransform: "capitalize",
  }
});

class WithdrawalList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 100,
      filteredWithdrawals: [],
      queryName: '',
    }
  }

  componentWillMount() {
    this.props.getWithdrawalList()
  }

  handleEdit(id) {
    this.props.push(`/admin/withdrawals/${id}`)
  }

  handleChange = (event) => {
    if (event.target.value === 'all') this.setState({ status: 100 })
    else {
      let id
      WITHDRAWAL_STATUS.forEach(function (val, key) {
        if (val === event.target.value) id = key
      })
      this.setState({ status: id })
    }
  }

  handleProcess = (id) => {
    this.props.push(`/admin/withdrawals/${id}`)
  }

  filterAsQuery(data, query, queryName) {
    let seachQuery = queryName.toLowerCase()
    if (WITHDRAWAL_STATUS[query] === undefined) {
      if (seachQuery !== '') return data.filter((item) => item.member.name.toLowerCase().indexOf(seachQuery) > -1 || item.member.username.toLowerCase().indexOf(seachQuery) > -1)
      return data
    } else {
      if (seachQuery !== '') return data.filter((item) => item.status === query && (item.member.name.toLowerCase().indexOf(seachQuery) > -1 || item.member.username.toLowerCase().indexOf(seachQuery) > -1))
      return data.filter((item) => item.status === query)
    }
  }

  handleQuery = (event) => {
    this.setState({ queryName: event.target.value })
  }

  render() {
    const { classes, withdrawals } = this.props
    const filteredWithdrawals = this.filterAsQuery(withdrawals, this.state.status, this.state.queryName)

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>{getMessage('Withdrawal List')}</h4>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={2}>
                  <FormControl className={classes.formControl}>
                    <InputLabel className={classes.inputLabel}>{getMessage('Filter By Status')}</InputLabel>
                    <Select
                      className={classes.saleSelect}
                      inputProps={{
                        name: "status",
                        open: this.state.open,
                        onClose: this.handleClose,
                        onOpen: this.handleOpen,
                        onChange: this.handleChange,
                        value: WITHDRAWAL_STATUS[this.state.status] === undefined ? 'all' : WITHDRAWAL_STATUS[this.state.status],
                      }}
                    >
                      <MenuItem value="all">{getMessage('All')}</MenuItem>
                      {WITHDRAWAL_STATUS.map((status, key) => {
                        return <MenuItem value={WITHDRAWAL_STATUS[key]} key={key} className={classes.optionSelect}>{getMessage(status)}</MenuItem>
                      })}
                    </Select>
                  </FormControl>
                </GridItem>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText={getMessage('Member Name or Member ID')}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: "name",
                      onChange: this.handleQuery,
                      value: this.state.queryName
                    }}
                  />
                </GridItem>
              </Grid>
              <SortableTable
                tableHeaderColor="primary"
                tableHead={[getMessage('Requested Date'), getMessage('Member'), getMessage('Amount'), getMessage('Status'), getMessage('Accepted Date'), getMessage('Rejected Date'), getMessage('Reject Reason'), getMessage('Note'), ""]}
                tableDataTypes={["date", "string", "number", "", "date", "date", "string", "string", ""]}
                firstOrderBy='desc'
                tableData={filteredWithdrawals.map((withdrawal) => {
                  const status = WITHDRAWAL_STATUS[withdrawal.status] ? WITHDRAWAL_STATUS[withdrawal.status] : ''
                  let statusClass = ''
                  if (status === 'accepted') {
                    statusClass = classes.successText
                  } else if (status === 'rejected') {
                    statusClass = classes.dangerText
                  }
                  return [
                    moment(withdrawal.created_at).format('MM/DD/YYYY'),
                    `${withdrawal.member.name}(${withdrawal.member.username})`,
                    '¥' + withdrawal.amount,
                    <span className={classes.status + ' ' + statusClass}><span>{getMessage(status)}</span></span>,
                    status === 'accepted' ? moment(withdrawal.accepted_date).format('MM/DD/YYYY') : '',
                    status === 'rejected' ? moment(withdrawal.rejected_date).format('MM/DD/YYYY') : '',
                    withdrawal.reject_reason,
                    withdrawal.note,
                    status === 'requested' ?
                      <IconButton
                        aria-label="Process"
                        className={classes.tableActionButton}
                        onClick={() => this.handleProcess(withdrawal.id)}
                      >
                        <EditIcon
                          className={classes.tableActionButtonIcon + " " + classes.edit}
                        />
                      </IconButton>
                      : ''
                  ]
                })}
                cellClassWidth={['8', '12', '7', '7', '8', '8', '28', '16', '5']}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid >
    );
  }
}

WithdrawalList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(WithdrawalList);
