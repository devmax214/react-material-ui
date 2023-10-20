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
import { POINT_TYPES } from "../../../constants";
import RowModal from "components/Alert/RowModal.jsx"
import { getMessage, sprintf } from 'utils/helpers';

const styles = theme => ({
  ...productStyle,
  ...typographyStyle,
  type: {
    textTransform: 'uppercase',
  }
});

class PointsSection extends React.Component {
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
    const { classes, points } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>{getMessage('Your Points History')}</h2>
            <h5 className={classes.description}>
            </h5>
          </GridItem>
        </GridContainer>
        <div>
          <SortableTable
            tableHeaderColor="primary"
            tableHead={[getMessage('Date'), getMessage('New Point'), getMessage('Type'), getMessage('Note'), 'ID']}
            tableDataTypes={["date-ID", "number", "string", "string", "string"]}
            mobileDisplay={[0, 1, 2]}
            firstOrderBy='desc'
            tableData={points.map((point) => {
              const type = POINT_TYPES[point.type] ? POINT_TYPES[point.type] : ''
              let typeClass = classes.infoText
              if (type === 'by income') {
                typeClass = classes.successText
              } else if (type === 'buy item') {
                typeClass = classes.warningText
              }
              return [
                moment(point.created_at).format('MM/DD/YYYY'),
                point.new_point,
                <span className={classes.type + ' ' + typeClass}><span>{getMessage(type)}</span></span>,
                point.note,
                moment(point.created_at).format('YYYYMMDDHms') + sprintf(point.id, '000000'),
              ]
            })}
            rowDetail={this.rowDetailModal}
            cellClassWidth={['25', '25', '20', '30', '0']}
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

export default withStyles(styles)(PointsSection);
