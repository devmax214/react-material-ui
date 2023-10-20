import React from "react";
import PropTypes from 'prop-types';
import moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/admin/Grid/GridItem.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";
// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";

import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle.jsx";
import typographyStyle from "assets/jss/material-dashboard-react/components/typographyStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import buttonStyle from "assets/jss/material-dashboard-react/components/buttonStyle.jsx";
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...tableStyle(theme),
  ...typographyStyle,
  ...cardStyle,
  addButton: {
    ...buttonStyle.transparent
  },
  role: {
    fontSize: '0.8em',
    textTransform: 'uppercase',
  }
});


class AnnouncementList extends React.Component {
  componentWillMount() {
    this.props.getAnnouncements()
  }

  handleEdit(id) {
    this.props.push(`/admin/announcements/${id}`)
  }

  handleAdd = () => {
    this.props.push(`/admin/announcements/create`)
  }

  handleRemove(id) {
    if (window.confirm(getMessage('Are you sure to delete this announcement?')))
      this.props.deleteAnnouncement(id)
  }

  render() {
    const { classes, announcements } = this.props

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>{getMessage('Announcement List')}</h4>
              <Button variant="fab" mini aria-label="Add" className={classes.addButton} onClick={this.handleAdd}>
                <AddIcon />
              </Button>
            </CardHeader>
            <CardBody>
              <SortableTable
                tableHeaderColor="primary"
                tableHead={[getMessage('Date'), getMessage('Content'), ""]}
                tableDataTypes={["date", "string", ""]}
                firstOrderBy='desc'
                tableData={announcements.map((announcement) => {
                  return [
                    moment(announcement.created_at).format('MM/DD/YYYY'),
                    announcement.content,
                    <div>
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={() => this.handleEdit(announcement.id)}
                      >
                        <EditIcon
                          className={classes.tableActionButtonIcon + " " + classes.edit}
                        />
                      </IconButton>
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={() => this.handleRemove(announcement.id)}
                      >
                        <CloseIcon
                          className={classes.tableActionButtonIcon + " " + classes.close}
                        />
                      </IconButton>
                    </div>
                  ]
                })}
                cellClassWidth={['15', '75', '10']}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

AnnouncementList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AnnouncementList);
