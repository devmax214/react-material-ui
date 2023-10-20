import React from "react";
import PropTypes from 'prop-types';
import moment from 'moment';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import CustomInput from "components/admin/CustomInput/CustomInput.jsx";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
// @material-ui/icons
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import AddIcon from "@material-ui/icons/Add";
// core components
import GridItem from "components/admin/Grid/GridItem.jsx";
import SortableTable from "components/admin/Table/SortableTable.jsx";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";

import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle.jsx";
import tableStyle from "assets/jss/material-dashboard-react/components/tableStyle.jsx";
import buttonStyle from "assets/jss/material-dashboard-react/components/buttonStyle.jsx";
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...tableStyle(theme),
  ...cardStyle,
  addButton: {
    ...buttonStyle.transparent
  }
});

class MemberList extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      queryName: '',
    }
  }

  componentWillMount() {
    this.props.getMembers()
  }

  handleEdit(id) {
    this.props.push(`/admin/members/${id}`)
  }

  handleAdd = () => {
    this.props.push(`/admin/members/create`)
  }

  handleRemove(id) {
    if (window.confirm(getMessage('Are you sure to delete this member?')))
      this.props.deleteMember(id)
  }

  filterAsQuery(data, queryName) {
    let seachQuery = queryName.toLowerCase()
    if (seachQuery !== '') return data.filter((item) => item.name.toLowerCase().indexOf(seachQuery) > -1 || item.username.toLowerCase().indexOf(seachQuery) > -1)
    return data
  }

  handleQuery = (event) => {
    this.setState({ queryName: event.target.value })
  }

  render() {
    const { classes, members } = this.props
    const filteredMembers = this.filterAsQuery(members, this.state.queryName)

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>{getMessage('Member List')}</h4>
              <Button variant="fab" mini aria-label="Add" className={classes.addButton} onClick={this.handleAdd}>
                <AddIcon />
              </Button>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText={getMessage('Member Name or Member ID')}
                    formControlProps={{
                      fullWidth: true,
                    }}
                    inputProps={{
                      name: "name",
                      onChange: this.handleQuery,
                      value: this.state.queryName
                    }}
                  />
                </GridItem>
              </Grid>
              <SortableTable
                tableHeaderColor="primary"
                tableHead={[getMessage("Name"), getMessage("Member ID"), getMessage("Phone Number"), getMessage("Refer"), getMessage("Entry Date"), getMessage("Point"), getMessage("Balance"), ""]}
                tableDataTypes={["string", "string", "string", "string", "date", "number", "number", ""]}
                tableData={filteredMembers.map((member) => {
                  return [
                    member.name,
                    member.username,
                    member.phone_number,
                    member.refer && member.refer.referer ? `${member.refer.referer.name}(${member.refer.referer.username})` : '',
                    moment(member.entry_date).format('MM/DD/YYYY'),
                    member.point,
                    '¥' + member.balance,
                    <div>
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={() => this.handleEdit(member.id)}
                      >
                        <EditIcon
                          className={classes.tableActionButtonIcon + " " + classes.edit}
                        />
                      </IconButton>
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={() => this.handleRemove(member.id)}
                      >
                        <CloseIcon
                          className={classes.tableActionButtonIcon + " " + classes.close}
                        />
                      </IconButton>
                    </div>
                  ]
                })}
                cellClassWidth={['14', '14', '14', '14', '13', '11', '11', '9']}
              />
            </CardBody >
          </Card >
        </GridItem >
      </Grid >
    );
  }
}

MemberList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemberList);
