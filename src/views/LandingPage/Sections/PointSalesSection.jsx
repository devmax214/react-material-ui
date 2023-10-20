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

import { POINTSALE_STATUS } from '../../../constants';
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...typographyStyle,
  ...productStyle,
  status: {
    textTransform: 'uppercase',
  },
  itemImg: {
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

class PointSalesSection extends React.Component {
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
    const { classes, pointSales } = this.props

    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>{getMessage('Your Point Sales')}</h2>
            <h5 className={classes.description}>
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <SortableTable
            tableHeaderColor="primary"
            tableHead={[getMessage('Requested Date'), getMessage('Item Name'), getMessage('Qty'), getMessage('Point'), getMessage('Status'), getMessage('Accepted Date'), getMessage('Rejected Date'), getMessage('Reject Reason'), getMessage('Note')]}
            tableDataTypes={["date", "string", "number", "number", "", "date", "date", "string", "string"]}
            mobileDisplay={[0, 1, 4]}
            firstOrderBy='desc'
            tableData={pointSales.map((pointSale) => {
              const status = POINTSALE_STATUS[pointSale.status] ? POINTSALE_STATUS[pointSale.status] : ''
              let statusClass = ''
              if (status === 'accepted') {
                statusClass = classes.successText
              } else if (status === 'rejected') {
                statusClass = classes.dangerText
              }

              let itemImage_name = pointSale.item.photo_url !== '' ? (
                <div className={classes.itemImg}><div><img src={pointSale.item.photo_url} alt={pointSale.item.item_name} /></div><span>{pointSale.item.item_name}</span></div>
              )
                : (
                  <div><span>{pointSale.item.item_name}</span></div>
                )

              return [
                moment(pointSale.created_at).format('MM/DD/YYYY'),
                itemImage_name,
                pointSale.quantity,
                pointSale.point,
                <span className={classes.status + ' ' + statusClass}><span>{getMessage(status)}</span></span>,
                status === 'accepted' ? moment(pointSale.accepted_date).format('MM/DD/YYYY') : '',
                status === 'rejected' ? moment(pointSale.rejected_date).format('MM/DD/YYYY') : '',
                pointSale.reject_reason,
                pointSale.note,
              ]
            })}
            rowDetail={this.rowDetailModal}
            cellClassWidth={['10', '20', '8', '8', '8', '10', '10', '13', '13']}
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

export default withStyles(styles)(PointSalesSection);
