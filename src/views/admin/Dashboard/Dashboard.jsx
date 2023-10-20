import React from "react";
import moment from "moment";
import PropTypes from "prop-types";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// @material-ui/icons
import { LocalOffer, DateRange, Group, Payment } from "@material-ui/icons";

// core components
import GridItem from "components/admin/Grid/GridItem.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardIcon from "components/admin/Card/CardIcon.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";
import CardFooter from "components/admin/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";
import { getMessage } from 'utils/helpers';
import { INCOME_TYPES } from "../../../constants";

const styles = theme => ({
  ...dashboardStyle,
  ...typographyStyle,
  type: {
    fontSize: '13px',
    textTransform: 'uppercase',
  }
});

class Dashboard extends React.Component {
  componentWillMount() {
    this.props.getDashboardData();
  }

  handleRedirect(url) {
    this.props.push(url)
  }

  render() {
    const { classes, dashboard } = this.props;
    return dashboard && (
      <div>
        <Grid container>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="warning" stats icon>
                <CardIcon color="warning">
                  <Group />
                </CardIcon>
                <p className={classes.cardCategory}>{getMessage('Total Members')}</p>
                <h3 className={classes.cardTitle}>{dashboard.totalMembers}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Group />
                  <a onClick={() => this.handleRedirect('/admin/members')}>
                    {getMessage('view all members')}
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="success" stats icon>
                <CardIcon color="success">
                  <DateRange />
                </CardIcon>
                <p className={classes.cardCategory}>{getMessage('Total Profits')}</p>
                <h3 className={classes.cardTitle}>¥{dashboard.totalIncomes.toFixed(2)}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <DateRange />
                  <a onClick={() => this.handleRedirect('/admin/incomes')}>
                    {getMessage('view incomes history')}
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="info" stats icon>
                <CardIcon color="info">
                  <LocalOffer />
                </CardIcon>
                <p className={classes.cardCategory}>{getMessage('Total Sales')}</p>
                <h3 className={classes.cardTitle}>{dashboard.totalSales}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <LocalOffer />
                  <a onClick={() => this.handleRedirect('/admin/sales')}>
                    {getMessage('view all sales')}
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={6} md={3}>
            <Card>
              <CardHeader color="danger" stats icon>
                <CardIcon color="danger">
                  <Payment />
                </CardIcon>
                <p className={classes.cardCategory}>{getMessage('Withdrawal Requests')}</p>
                <h3 className={classes.cardTitle}>{dashboard.requestedWithdrawals.length}</h3>
              </CardHeader>
              <CardFooter stats>
                <div className={classes.stats}>
                  <Payment />
                  <a onClick={() => this.handleRedirect('/admin/withdrawals')}>
                    {getMessage('view all withdrawals')}
                  </a>
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
        <Grid container>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{getMessage('Incomes')}</h4>
                <p className={classes.cardCategoryWhite}>
                  {getMessage('Last {0} Incomes', dashboard.lastIncomes.length)}
                </p>
              </CardHeader>
              <CardBody>
                <SortableTable
                  tableHeaderColor="primary"
                  tableHead={[getMessage('Date'), getMessage('Member'), getMessage('Amount'), getMessage('Type')]}
                  tableDataTypes={["date", "string", "number", "string"]}
                  tableData={dashboard.lastIncomes.map((income) => {
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
                      `${income.member.name}(${income.member.username})`,
                      '¥' + amount,
                      <span className={classes.type + ' ' + typeClass}><span>{getMessage(type)}</span></span>,
                    ]
                  })}
                  cellClassWidth={['25', '30', '20', '25']}
                />
              </CardBody>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="warning">
                <h4 className={classes.cardTitleWhite}>{getMessage('Withdrawal Requests')}</h4>
                <p className={classes.cardCategoryWhite}>
                  {getMessage('{0} requests are in waiting', dashboard.requestedWithdrawals.length)}
                </p>
              </CardHeader>
              <CardBody>
                <SortableTable
                  tableHeaderColor="warning"
                  tableHead={[getMessage('Date'), getMessage('Member'), getMessage('Amount')]}
                  tableDataTypes={["date", "string", "number"]}
                  tableData={dashboard.requestedWithdrawals.map((withdrawal) => ([
                    moment(withdrawal.created_at).format('MM/DD/YYYY'),
                    `${withdrawal.member.name}(${withdrawal.member.username})`,
                    '¥' + withdrawal.amount
                  ]))}
                  cellClassWidth={['30', '40', '30']}
                />
              </CardBody>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);
