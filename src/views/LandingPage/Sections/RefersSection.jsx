import React from "react";
import moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";

import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";
import RowModal from "components/Alert/RowModal.jsx"
import { getMessage } from 'utils/helpers';

class RefersSection extends React.Component {
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
    const { classes, referers } = this.props;

    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>{getMessage('Who are recommended by You')}</h2>
            <h5 className={classes.description}>
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <SortableTable
            tableHeaderColor="primary"
            tableHead={[getMessage('Name'), getMessage('Member ID'), getMessage('Phone Number'), getMessage('Card Number'), getMessage('Entry Date'), getMessage('Point'), getMessage('Balance'), getMessage('Next Period Date')]}
            tableDataTypes={["string", "string", "string", "string", "date", "string", "number", "date"]}
            mobileDisplay={[0, 1]}
            firstOrderBy='desc'
            tableData={referers.map((referer) => {
              return [
                referer.member.name,
                referer.member.username,
                referer.member.phone_number,
                referer.member.card_number,
                moment(referer.member.entry_date).format('MM/DD/YYYY'),
                referer.member.point,
                '¥' + referer.member.balance,
                referer.member.next_period_date !== "0000-00-00 00:00:00" ? moment(referer.member.next_period_date).format('MM/DD/YYYY') : "",
              ]
            })}
            rowDetail={this.rowDetailModal}
            cellClassWidth={['15', '15', '10', '15', '10', '10', '10', '15']}
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

export default withStyles(productStyle)(RefersSection);
