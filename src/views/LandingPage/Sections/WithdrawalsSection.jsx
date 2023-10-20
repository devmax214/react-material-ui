import React from "react";
import moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";
import RowModal from "components/Alert/RowModal.jsx"

import { WITHDRAWAL_STATUS } from '../../../constants';
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...typographyStyle,
  ...productStyle,
  status: {
    textTransform: 'uppercase',
  }
});

class WithdrawalsSection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      headData: [],
      data: [],
      open: false,
    }
  }

  rowDetailModal = (rowData, tableHead) => {
    this.setState({ data: rowData, headData: tableHead })
    this.setState({ open: true });
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  render() {
    const { classes, withdrawals } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>{getMessage('Your Withdrawals')}</h2>
            <h5 className={classes.description}>
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <SortableTable
            tableHeaderColor="primary"
            tableHead={[getMessage('Requested Date'), getMessage('Amount'), getMessage('Status'), getMessage('Accepted Date'), getMessage('Rejected Date'), getMessage('Reject Reason'), getMessage('Note')]}
            tableDataTypes={["date", "number", "", "date", "date", "string", "string"]}
            firstOrderBy='desc'
            mobileDisplay={[0, 1, 2]}
            tableData={withdrawals.map((withdrawal) => {
              const status = WITHDRAWAL_STATUS[withdrawal.status] ? WITHDRAWAL_STATUS[withdrawal.status] : ''
              let statusClass = ''
              if (status === 'accepted') {
                statusClass = classes.successText
              } else if (status === 'rejected') {
                statusClass = classes.dangerText
              }
              return [
                moment(withdrawal.created_at).format('MM/DD/YYYY'),
                '¥' + withdrawal.amount,
                <span className={classes.status + ' ' + statusClass}><span>{getMessage(status)}</span></span>,
                status === 'accepted' ? moment(withdrawal.accepted_date).format('MM/DD/YYYY') : '',
                status === 'rejected' ? moment(withdrawal.rejected_date).format('MM/DD/YYYY') : '',
                withdrawal.reject_reason,
                withdrawal.note,
              ]
            })}
            rowDetail={this.rowDetailModal}
            cellClassWidth={['10', '10', '10', '10', '10', '25', '25']}
          />
          <RowModal
            rowData={this.state.data}
            headData={this.state.headData}
            open={this.state.open}
            onClose={this.handleClose}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(WithdrawalsSection);
