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

import { ROLES } from "../../../constants";
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...tableStyle(theme),
  ...typographyStyle,
  ...cardStyle,
  addButton: {
    ...buttonStyle.transparent
  },
  role: {
    fontSize: '13px',
    textTransform: 'uppercase',
  }
});


class UserList extends React.Component {
  componentWillMount() {
    this.props.getUsers()
  }

  handleEdit(id) {
    this.props.push(`/admin/users/${id}`)
  }

  handleAdd = () => {
    this.props.push(`/admin/users/create`)
  }

  handleRemove(id) {
    if (window.confirm(getMessage('Are you sure to delete this user?')))
      this.props.deleteUser(id)
  }

  render() {
    const { classes, users } = this.props

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>{getMessage('User List')}</h4>
              <Button variant="fab" mini aria-label="Add" className={classes.addButton} onClick={this.handleAdd}>
                <AddIcon />
              </Button>
            </CardHeader>
            <CardBody>
              <SortableTable
                tableHeaderColor="primary"
                tableHead={[getMessage('Name'), getMessage('Email'), getMessage('Created At'), getMessage('Updated At'), getMessage('Role'), ""]}
                tableDataTypes={["string", "string", "date", "date", "string", ""]}
                firstOrderBy='desc'
                tableData={users.map((user) => {
                  const role = ROLES[user.role] ? ROLES[user.role] : ''
                  let roleClass = classes.mutedText
                  if (role === 'read & write') {
                    roleClass = classes.infoText
                  } else if (role === 'system admin') {
                    roleClass = classes.dangerText
                  }
                  return [
                    user.name,
                    user.email,
                    moment(user.created_at).format('MM/DD/YYYY'),
                    moment(user.updated_at).format('MM/DD/YYYY'),
                    <span className={classes.role + ' ' + roleClass}><span>{getMessage(role)}</span></span>,
                    <div>
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={() => this.handleEdit(user.id)}
                      >
                        <EditIcon
                          className={classes.tableActionButtonIcon + " " + classes.edit}
                        />
                      </IconButton>
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={() => this.handleRemove(user.id)}
                      >
                        <CloseIcon
                          className={classes.tableActionButtonIcon + " " + classes.close}
                        />
                      </IconButton>
                    </div>
                  ]
                })}
                cellClassWidth={['15', '25', '12', '12', '15', '11']}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

UserList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserList);
