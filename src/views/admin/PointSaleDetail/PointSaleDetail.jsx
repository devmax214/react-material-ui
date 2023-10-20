import React from "react";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
// core components
import GridItem from "components/admin/Grid/GridItem.jsx";
import CustomInput from "components/admin/CustomInput/CustomInput.jsx";
import Button from "components/admin/CustomButtons/Button.jsx";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";
import CardFooter from "components/admin/Card/CardFooter.jsx";
import Alert from "components/Alert/Alert.jsx";

import checkboxAndRadioStyle from "assets/jss/material-dashboard-react/checkboxAndRadioStyle.jsx";
import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle.jsx";
import * as actionTypes from 'redux/actionTypes'
import { getMessage } from 'utils/helpers';

const styles = {
  ...checkboxAndRadioStyle,
  ...cardStyle,
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
  formControl: {
    minWidth: 120,
    width: "100%",
    margin: "27px 0 0",
    position: "relative",
    paddingBottom: "10px",
  },
  saleSelect: {
    '&:after': {
      borderBottom: "2px solid #f44336",
    },
    '&:before, &:hover:before': {
      borderBottom: "1px solid rgba(0, 0, 0, 0.2) !important",
    }
  }
};

class PointSaleDetail extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id;

    this.state = {
      name: '',
      itemName: '',
      quantity: 0,
      point: '',
      requested_date: '',
      note: '',
      reject_reason: '',
      accepted: true,
      enabled: false,
      error: '',
    }
  }

  componentWillMount() {
    this.props.getPointSale(this.id)
  }

  componentWillReceiveProps(nextProps) {
    const { pointSale } = nextProps;
    if (pointSale.status !== this.props.pointSale.status) {
      if (pointSale.status === actionTypes.GET_POINTSALE_SUCCESS) {
        this.fill(pointSale.pointSale)
      } else if (pointSale.status === actionTypes.GET_POINTSALE_FAILURE) {
        this.setState({ error: getMessage(pointSale.error), enabled: true })
        setTimeout(() => {
          this.props.push('/admin/pointSales')
        }, 3000)
      } else if (pointSale.status === actionTypes.PROCESS_POINTSALE_SUCCESS) {
        this.props.push('/admin/pointSales')
      } else if (pointSale.status === actionTypes.PROCESS_POINTSALE_FAILURE) {
        this.setState({ error: getMessage(pointSale.error), enabled: true })
      }
    }
  }

  fill(pointSale) {
    this.setState({
      name: pointSale.member.name,
      itemName: pointSale.item.item_name,
      quantity: pointSale.quantity,
      point: pointSale.point,
      requested_date: moment(pointSale.created_at).format('YYYY-MM-DD'),
      note: pointSale.note,
      reject_reason: '',
      accepted: true,
      enabled: true,
      error: '',
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: '',
    }, () => {
      const { accepted, reject_reason } = this.state
      this.setState({ enabled: accepted || (!accepted && reject_reason) })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '' })

    if (this.state.enabled) {
      const { accepted, reject_reason } = this.state

      this.setState({ enabled: false }, () => {
        accepted ?
          this.props.processpointSale(this.id, accepted, {})
          : this.props.processpointSale(this.id, accepted, { reject_reason })
      })
    }

    return false
  }

  handleCancel = () => {
    this.props.push('/admin/pointSales')
  }

  render() {
    const { classes } = this.props
    return (
      <div>
        <Alert message={this.state.error} />
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{getMessage('Process Point Sale Request')}</h4>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Requester Name')}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.name,
                        name: "name"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Requested Date')}
                      formControlProps={{
                        fullWidth: true
                      }}
                      labelProps={{
                        shrink: true
                      }}
                      inputProps={{
                        type: "date",
                        disabled: true,
                        value: this.state.requested_date,
                        name: "requested_date"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Item Name')}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.itemName,
                        name: "item_name"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText={getMessage('Quantity')}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.quantity,
                        name: "quantity"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText={getMessage('Point')}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.point,
                        name: "point"
                      }}
                    />
                  </GridItem>
                </Grid>
                {this.state.note &&
                  <Grid container>
                    <GridItem xs={12}>
                      <CustomInput
                        labelText={getMessage('Note')}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 2,
                          value: this.state.note,
                          disabled: true,
                          name: "note",
                        }}
                      />
                    </GridItem>
                  </Grid>
                }
                <Grid container>
                  <GridItem xs={12} sm={6} md={2}>
                    <FormControl className={classes.formControl}>
                      <Select
                        className={classes.saleSelect}
                        inputProps={{
                          name: 'accepted',
                          value: this.state.accepted,
                          open: this.state.open,
                          onClose: this.handleClose,
                          onOpen: this.handleOpen,
                          onChange: this.handleChange,
                        }}
                      >
                        <MenuItem value={true} className={classes.optionSelect}>{getMessage('Accept')}</MenuItem>
                        <MenuItem value={false} className={classes.optionSelect}>{getMessage('Reject')}</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={10}>
                    {!this.state.accepted &&
                      <CustomInput
                        labelText={getMessage('Reject Reason')}
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 3,
                          value: this.state.reject_reason,
                          onChange: this.handleChange,
                          name: "reject_reason"
                        }}
                      />
                    }
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>{getMessage('Save')}</Button>
                <Button color="transparent" onClick={this.handleCancel}>{getMessage('Cancel')}</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(PointSaleDetail);
