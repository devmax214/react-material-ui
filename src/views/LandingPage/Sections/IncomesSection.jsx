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

import { INCOME_TYPES } from "../../../constants"
import { getMessage, sprintf } from 'utils/helpers';

const styles = theme => ({
  ...typographyStyle,
  ...productStyle,
  type: {
    textTransform: 'uppercase',
  }
});

class IncomesSection extends React.Component {
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
    const { classes, incomes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>{getMessage('Your Incomes History')}</h2>
            <h5 className={classes.description}>
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <SortableTable
            tableHeaderColor="primary"
            tableHead={[getMessage('Date'), getMessage('Amount'), getMessage('Current Amount'), getMessage('Next Period Date'), getMessage('Type'), getMessage('Note'), 'ID']}
            tableDataTypes={["date-ID", "number", "number", "date", "object", "string", "string"]}
            mobileDisplay={[0, 1, 4]}
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
                (type === 'balance recurring' || type === 'recommends recurring') && income.next_period_date !== '0000-00-00 00:00:00' ? moment(income.next_period_date).format('MM/DD/YYYY') : "",
                <span className={classes.type + ' ' + typeClass}><span>{getMessage(type)}</span></span>,
                income.note,
                moment(income.created_at).format('YYYYMMDDHms') + sprintf(income.id, '000000'),
              ]
            })}
            rowDetail={this.rowDetailModal}
            cellClassWidth={['11', '16', '16', '16', '11', '30', '0']}
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

export default withStyles(styles)(IncomesSection);
