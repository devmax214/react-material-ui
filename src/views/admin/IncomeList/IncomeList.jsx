import React from "react";
import PropTypes from 'prop-types';
import moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/admin/Grid/GridItem.jsx";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import CustomInput from "components/admin/CustomInput/CustomInput.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";

import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import { INCOME_TYPES } from "../../../constants";
import { getMessage, sprintf } from 'utils/helpers';

const styles = theme => ({
  ...tableStyle(theme),
  ...typographyStyle,
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
  },
  type: {
    fontSize: '13px',
    textTransform: 'uppercase',
  },
  userImg: {
    display: "inline-flex",
    alignItems: "center",
    '& div': {
      width: "30px",
      display: "inline-block",
    },
    '& img': {
      width: "100%",
    },
    '& span': {
      display: "inline-block",
      width: "calc(100% - 40px)",
      marginLeft: 10,
    }
  }
});

const imgUrl = '/static/media/sidebar.310509c9.jpg';

class IncomeList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 100,
      queryName: '',
    }
  }

  componentWillMount() {
    this.props.getIncomes()
  }

  handleChange = (event) => {
    if (event.target.value === 'all') this.setState({ status: 100 })
    else {
      let id
      INCOME_TYPES.forEach(function (val, key) {
        if (val === event.target.value) id = key
      })
      this.setState({ status: id })
    }
  }

  filterAsQuery(data, query, queryName) {
    let seachQuery = queryName.toLowerCase()
    if (INCOME_TYPES[query] === undefined) {
      if (seachQuery !== '') return data.filter((item) => item.member.name.toLowerCase().indexOf(seachQuery) > -1 || item.member.username.toLowerCase().indexOf(seachQuery) > -1)
      return data
    } else {
      if (seachQuery !== '') return data.filter((item) => item.type === query && (item.member.name.toLowerCase().indexOf(seachQuery) > -1 || item.member.username.toLowerCase().indexOf(seachQuery) > -1))
      return data.filter((item) => item.type === query)
    }
  }

  handleQuery = (event) => {
    this.setState({ queryName: event.target.value })
  }

  render() {
    const { classes, incomes } = this.props
    const filteredIncomes = this.filterAsQuery(incomes, this.state.status, this.state.queryName)

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>{getMessage('Income List')}</h4>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={2}>
                  <FormControl className={classes.formControl}>
                    <InputLabel className={classes.inputLabel}>{getMessage('Filter By Type')}</InputLabel>
                    <Select
                      className={classes.saleSelect}
                      inputProps={{
                        name: "status",
                        open: this.state.open,
                        onClose: this.handleClose,
                        onOpen: this.handleOpen,
                        onChange: this.handleChange,
                        value: INCOME_TYPES[this.state.status] === undefined ? 'all' : INCOME_TYPES[this.state.status],
                      }}
                    >
                      <MenuItem value="all">{getMessage('All')}</MenuItem>
                      {INCOME_TYPES.map((status, key) => {
                        return <MenuItem value={INCOME_TYPES[key]} key={key} className={classes.optionSelect}>{getMessage(status)}</MenuItem>
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
                tableHead={[getMessage('Date'), getMessage('Member'), getMessage('Amount'), getMessage('New Amount'), getMessage('Next Period Date'), getMessage('Type'), getMessage('Note'), 'ID']}
                tableDataTypes={["date-ID", "string", "number", "number", "date", "string", "string", "string"]}
                firstOrderBy='desc'
                tableData={filteredIncomes.map((income) => {
                  const type = INCOME_TYPES[income.type] ? INCOME_TYPES[income.type] : ''

                  let typeClass = classes.warningText
                  if (type === 'balance recurring') {
                    typeClass = classes.successText
                  } else if (type === 'withdrawal') {
                    typeClass = classes.dangerText
                  } else if (type === 'recommends recurring') {
                    typeClass = classes.infoText
                  }

                  let amount = income.direct_amount
                  if (type === 'balance recurring' || type === 'recommends recurring') {
                    amount = income.recurring_amount
                  } else if (type === 'recommends reached') {
                    amount = income.refers_amount
                  }

                  return [
                    moment(income.created_at).format('MM/DD/YYYY'),
                    <div className={classes.userImg}><div><img src={imgUrl} alt="Item" /></div><span>{income.member.name} ({income.member.username})</span></div>,
                    '¥' + amount,
                    '¥' + income.new_amount,
                    type === 'balance recurring' || type === 'recommends recurring' ? moment(income.next_period_date).format('MM/DD/YYYY') : "",
                    <span className={classes.type + ' ' + typeClass}><span>{getMessage(type)}</span></span>,
                    income.note,
                    moment(income.created_at).format('YYYYMMDDHms') + sprintf(income.id, '000000'),
                  ]
                })}
                cellClassWidth={['10', '16', '10', '12', '15', '12', '25', '0']}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

IncomeList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IncomeList);
