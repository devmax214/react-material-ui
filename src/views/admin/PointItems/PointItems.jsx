import React from "react";
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/admin/Grid/GridItem.jsx";
import CustomInput from "components/admin/CustomInput/CustomInput.jsx";
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

class PointItems extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 100,
      queryName: '',
    }
  }

  componentWillMount() {
    this.props.getPointItems()
  }

  handleEdit(id) {
    this.props.push(`/admin/items/${id}`)
  }

  handleAdd = () => {
    this.props.push(`/admin/items/create`)
  }

  handleRemove(id) {
    if (window.confirm(getMessage('Are you sure to delete this item?')))
      this.props.deletePointItem(id)
  }

  filterAsQuery(data, queryName) {
    let seachQuery = queryName.toLowerCase()
    if (seachQuery !== '') return data.filter((item) => item.item_name.toLowerCase().indexOf(seachQuery) > -1)
    return data
  }

  handleQuery = (event) => {
    this.setState({ queryName: event.target.value })
  }

  render() {
    const { classes, items } = this.props
    const filteredItems = this.filterAsQuery(items, this.state.queryName)

    return (
      <Grid container>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="primary" className={classes.cardTitle}>
              <h4 className={classes.cardTitleWhite}>{getMessage('Point Items')}</h4>
              <Button variant="fab" mini aria-label="Add" className={classes.addButton} onClick={this.handleAdd}>
                <AddIcon />
              </Button>
            </CardHeader>
            <CardBody>
              <Grid container>
                <GridItem xs={12} sm={12} md={2}>
                  <CustomInput
                    labelText={getMessage('Name')}
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
                tableHead={[getMessage('Name'), getMessage('Point'), getMessage('Note'), ""]}
                tableDataTypes={["string", "string", "string", ""]}
                firstOrderBy='desc'
                tableData={filteredItems.map((item) => {

                  let itemImage_name = item.photo_url !== '' ? (
                    <div className={classes.itemImg}><div><img src={item.photo_url} alt={item.item_name} /></div><span>{item.item_name}</span></div>
                  )
                    : (
                      <div><span>{item.item_name}</span></div>
                    )
                  return [
                    itemImage_name,
                    item.item_point,
                    item.note,
                    <div>
                      <IconButton
                        aria-label="Edit"
                        className={classes.tableActionButton}
                        onClick={() => this.handleEdit(item.id)}
                      >
                        <EditIcon
                          className={classes.tableActionButtonIcon + " " + classes.edit}
                        />
                      </IconButton>
                      <IconButton
                        aria-label="Close"
                        className={classes.tableActionButton}
                        onClick={() => this.handleRemove(item.id)}
                      >
                        <CloseIcon
                          className={classes.tableActionButtonIcon + " " + classes.close}
                        />
                      </IconButton>
                    </div>
                  ]
                })}
                cellClassWidth={['30', '30', '30', '10']}
              />
            </CardBody>
          </Card>
        </GridItem>
      </Grid>
    );
  }
}

PointItems.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PointItems);
