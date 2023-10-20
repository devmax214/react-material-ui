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

class WithdrawalDetail extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id;

    this.state = {
      name: '',
      balance: '',
      requested_date: '',
      amount: '',
      note: '',
      reject_reason: '',
      accepted: true,
      enabled: false,
      error: '',
    }
  }

  componentWillMount() {
    this.props.getWithdrawal(this.id)
  }

  componentWillReceiveProps(nextProps) {
    const { withdrawals } = nextProps;

    if (withdrawals.status !== this.props.withdrawals.status) {
      if (withdrawals.status === actionTypes.GET_WITHDRAWAL_SUCCESS) {
        this.fill(withdrawals.withdrawal)
      } else if (withdrawals.status === actionTypes.GET_WITHDRAWAL_FAILURE) {
        this.setState({ error: getMessage(withdrawals.error), enabled: true })
        setTimeout(() => {
          this.props.push('/admin/withdrawals')
        }, 3000)
      } else if (withdrawals.status === actionTypes.PROCESS_WITHDRAWAL_SUCCESS) {
        this.props.push('/admin/withdrawals')
      } else if (withdrawals.status === actionTypes.PROCESS_WITHDRAWAL_FAILURE) {
        this.setState({ error: getMessage(withdrawals.error), enabled: true })
      }
    }
  }

  fill(withdrawal) {
    this.setState({
      name: withdrawal.member.name,
      balance: withdrawal.member.balance,
      requested_date: moment(withdrawal.created_at).format('YYYY-MM-DD'),
      amount: withdrawal.amount,
      note: withdrawal.note,
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
          this.props.processWithdrawal(this.id, accepted, {})
          : this.props.processWithdrawal(this.id, accepted, { reject_reason })
      })
    }

    return false
  }

  handleCancel = () => {
    this.props.push('/admin/withdrawals')
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
                <h4 className={classes.cardTitleWhite}>{getMessage('Process Withdrawal Request')}</h4>
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
                      labelText={getMessage('Current Balance')}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.balance,
                        name: "balance"
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Request Amount')}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.amount,
                        name: "amount"
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

export default withStyles(styles)(WithdrawalDetail);
