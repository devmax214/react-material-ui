import React from "react";
import PropTypes from 'prop-types';
import moment from 'moment';
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
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...tableStyle(theme),
  ...cardStyle,
});

class MemberRefers extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id
  }

  componentWillMount() {
    this.props.getMemberRefers(this.id)
  }

  render() {
    const { classes, refers, member } = this.props

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>
                {member ? member.name + " " + getMessage('Recommend Members') : ''}
              </h4>
            </CardHeader>
            <CardBody>
              <SortableTable
                tableHeaderColor="primary"
                tableHead={[getMessage('Name'), getMessage('Member ID'), getMessage('Phone Number'), getMessage('Card Number'), getMessage('Entry Date'), getMessage('Point'), getMessage('Balance'), getMessage('Next Period Date')]}
                tableDataTypes={["string", "string", "string", "string", "date", "string", "number", "date"]}
                firstOrderBy='desc'
                tableData={refers.map((refer) => {
                  return [
                    refer.member.name,
                    refer.member.username,
                    refer.member.phone_number,
                    refer.member.card_number,
                    refer.member.entry_date !== undefined ? moment(refer.member.entry_date).format('MM/DD/YYYY') : '',
                    refer.member.point,
                    '¥' + refer.member.balance,
                    refer.member.next_period_date.indexOf('0000') === -1 ? moment(refer.member.next_period_date).format('MM/DD/YYYY') : '',
                  ]
                })}
                cellClassWidth={['15', '14', '14', '15', '12', '7', '10', '13']}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

MemberRefers.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberRefers);

