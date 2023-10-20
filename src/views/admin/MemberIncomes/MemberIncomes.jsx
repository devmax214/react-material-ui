import React from "react";
import moment from 'moment';
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/admin/Grid/GridItem.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";

import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle.jsx";
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import { INCOME_TYPES } from "../../../constants";
import { getMessage, sprintf } from 'utils/helpers';

const styles = theme => ({
  ...tableStyle(theme),
  ...typographyStyle,
  ...cardStyle,
  type: {
    fontSize: '13px',
    textTransform: 'uppercase',
  }
});

class MemberIncomes extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id
  }

  componentWillMount() {
    this.props.getMemberIncomes(this.id)
  }

  render() {
    const { classes, incomes, member } = this.props

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>
                {member ? member.name + " " + getMessage('Incoming History') : ""}
              </h4>
            </CardHeader>
            <CardBody>
              <SortableTable
                tableHeaderColor="primary"
                tableHead={[getMessage('Date'), getMessage('Amount'), getMessage('Current Amount'), getMessage('Next Period Date'), getMessage('Type'), getMessage('Note'), 'ID']}
                tableDataTypes={["date-ID", "number", "number", "date", "object", "string", "string"]}
                firstOrderBy='desc'
                tableData={incomes.map((income) => {
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
                    '¥' + amount,
                    '¥' + income.new_amount,
                    type === 'balance recurring' || type === 'recommends recurring' ? moment(income.next_period_date).format('MM/DD/YYYY') : "",
                    <span className={classes.type + ' ' + typeClass}><span>{getMessage(type)}</span></span>,
                    income.note,
                    moment(income.created_at).format('YYYYMMDDHms') + sprintf(income.id, '000000'),
                  ]
                })}
                cellClassWidth={['15', '14', '14', '15', '12', '30', '0']}
              />
            </CardBody>
          </Card >
        </GridItem >
      </Grid >
    );
  }
}

MemberIncomes.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberIncomes);
