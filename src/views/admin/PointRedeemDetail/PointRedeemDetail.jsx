import React from "react";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
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
import * as actionTypes from 'redux/actionTypes'
import { getMessage } from 'utils/helpers';

const styles = {
  ...checkboxAndRadioStyle,
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
    paddingBottom: "10px",
    margin: "27px 0 0 0",
    position: "relative"
  }
};

class PointRedeemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id;

    this.state = {
      name: '',
      currentPoint: '',
      requested_date: '',
      point: '',
      note: '',
      reject_reason: '',
      accepted: true,
      enabled: false,
      error: '',
    }
  }

  componentWillMount() {
    this.props.getPointRedeem(this.id)
  }

  componentWillReceiveProps(nextProps) {
    const { redeem } = nextProps;
    if (redeem.status !== this.props.redeem.status) {
      if (redeem.status === actionTypes.GET_POINTREDEEM_SUCCESS) {
        this.fill(redeem.redeem)
      } else if (redeem.status === actionTypes.GET_POINTREDEEM_FAILURE) {
        this.setState({ error: getMessage(redeem.error), enabled: true })
        setTimeout(() => {
          this.props.push('/admin/redeems')
        }, 3000)
      } else if (redeem.status === actionTypes.PROCESS_POINTREDEEM_SUCCESS) {
        this.props.push('/admin/redeems')
      } else if (redeem.status === actionTypes.PROCESS_POINTREDEEM_FAILURE) {
        this.setState({ error: getMessage(redeem.error), enabled: true })
      }
    }
  }

  fill(redeem) {
    this.setState({
      name: redeem.member.name,
      currentPoint: redeem.member.point,
      requested_date: moment(redeem.created_at).format('YYYY-MM-DD'),
      point: redeem.point,
      note: redeem.note,
      reject_reason: '',
      accepted: true,
      enabled: true,
      error: '',
    })
  }

  handleChange = (event) => {
    this.setState({
      reject_reason: event.target.value,
      error: '',
    }, () => {
      const { accepted, reject_reason } = this.state
      this.setState({ enabled: accepted || (!accepted && reject_reason) })
    })
  }

  handleAccept = (event) => {
    this.setState({
      accepted: event.target.value,
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
          this.props.processPointRedeem(this.id, accepted, {})
          : this.props.processPointRedeem(this.id, accepted, { reject_reason })
      })
    }

    return false
  }

  handleCancel = () => {
    this.props.push('/admin/redeems')
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
                <h4 className={classes.cardTitleWhite}>{getMessage('Process Point Redeem Request')}</h4>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Requester Name')}
                      id="name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.name
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Current Point')}
                      id="currentPoint"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.currentPoint
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Request Point')}
                      id="point"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.point
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Requested Date')}
                      id="requested_date"
                      formControlProps={{
                        fullWidth: true
                      }}
                      labelProps={{
                        shrink: true
                      }}
                      inputProps={{
                        type: "date",
                        disabled: true,
                        value: this.state.requested_date
                      }}
                    />
                  </GridItem>
                </Grid>
                {this.state.note &&
                  <Grid container>
                    <GridItem xs={12}>
                      <CustomInput
                        labelText={getMessage('Note')}
                        id="note"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 2,
                          value: this.state.note,
                          disabled: true
                        }}
                      />
                    </GridItem>
                  </Grid>
                }
                <Grid container>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                      <Select
                        inputProps={{
                          id: 'accepted',
                          open: this.state.open,
                          onClose: this.handleClose,
                          onOpen: this.handleOpen,
                          onChange: this.handleAccept,
                          value: this.state.accepted
                        }}
                      >
                        <MenuItem value={true}>{getMessage('Accept')}</MenuItem>
                        <MenuItem value={false}>{getMessage('Reject')}</MenuItem>
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={8}>
                    {!this.state.accepted &&
                      <CustomInput
                        labelText={getMessage('Reject Reason')}
                        id="reject_reason"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          multiline: true,
                          rows: 3,
                          value: this.state.reject_reason,
                          onChange: this.handleChange
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

export default withStyles(styles)(PointRedeemDetail);
