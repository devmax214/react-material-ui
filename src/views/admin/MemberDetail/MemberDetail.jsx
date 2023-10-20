import React from "react";
import moment from "moment";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
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
  links: {
    marginBottom: "60px"
  },
  link: {
    padding: '0 20px'
  }
};

class MemberDetail extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id;

    this.state = {
      name: '',
      username: '',
      phone_number: '',
      card_number: '',
      entry_date: moment().format('YYYY-MM-DD'),
      password: '',
      password_confirm: '',
      point: '',
      balance: '',
      next_period_date: '',
      referName: '',
      enabled: false,
      error: '',
    }
  }

  componentWillMount() {
    this.props.getMember(this.id)
  }

  componentWillReceiveProps(nextProps) {
    const { members } = nextProps;
    if (members.status !== this.props.members.status) {
      if (members.status === actionTypes.GET_MEMBER_SUCCESS) {
        this.fill(members.member)
      } else if (members.status === actionTypes.GET_MEMBER_FAILURE) {
        this.setState({ error: getMessage(members.error), enabled: true })
        setTimeout(() => {
          this.props.push('/admin/members')
        }, 3000)
      } else if (members.status === actionTypes.UPDATE_MEMBER_SUCCESS) {
        this.props.push('/admin/members')
      } else if (members.status === actionTypes.UPDATE_MEMBER_FAILURE) {
        this.setState({ error: getMessage(members.error), enabled: true })
      }
    }
  }

  fill(member) {
    this.setState({
      name: member.name,
      username: member.username,
      phone_number: member.phone_number,
      card_number: member.card_number,
      entry_date: moment(member.entry_date).format('YYYY-MM-DD'),
      password: '',
      password_confirm: '',
      point: member.point,
      balance: member.balance,
      next_period_date: member.next_period_date !== "0000-00-00 00:00:00" ? moment(member.next_period_date).format('YYYY-MM-DD') : "",
      referName: member.refer ? `${member.refer.referer.name}(${member.refer.referer.username})` : '',
      enabled: true,
      error: '',
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.getAttribute('id')]: event.target.value,
      error: '',
    }, () => {
      const { password, password_confirm } = this.state
      this.setState({ enabled: password === password_confirm })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '' })

    if (this.state.enabled) {
      const member = {
        id: this.id,
        card_number: this.state.card_number,
        phone_number: this.state.phone_number,
      }

      if (this.state.password) {
        member.password = this.state.password
      }

      this.setState({ enabled: false }, () => {
        this.props.updateMember(member)
      })
    }

    return false
  }

  handleCancel = () => {
    this.props.push('/admin/members')
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
                <h4 className={classes.cardTitleWhite}>{getMessage('Member Details')}</h4>
                <p className={classes.cardCategoryWhite}>{getMessage("Edit member's info")}</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Name')}
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
                      labelText={getMessage("Member ID")}
                      id="username"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.username
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage('Points')}
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
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage('Balance')}
                      id="balance"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.balance
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage('Next Period Date')}
                      id="next_period_date"
                      formControlProps={{
                        fullWidth: true
                      }}
                      labelProps={{
                        shrink: true
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.next_period_date
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Referenced By')}
                      id="referName"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.referName
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage("Phone Number")}
                      id="phone_number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.phone_number
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage("Bank Card Number")}
                      id="card_number"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.card_number
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage("Entry Date")}
                      id="entry_date"
                      formControlProps={{
                        fullWidth: true
                      }}
                      labelProps={{
                        shrink: true
                      }}
                      inputProps={{
                        type: "date",
                        disabled: true,
                        value: this.state.entry_date
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Password')}
                      id="password"
                      error={this.state.password !== this.state.password_confirm}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        type: "password",
                        onChange: this.handleChange,
                        value: this.state.password
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Password Confirm')}
                      id="password_confirm"
                      error={this.state.password !== this.state.password_confirm}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        type: "password",
                        onChange: this.handleChange,
                        value: this.state.password_confirm
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>{getMessage('Save')}</Button>
                <Button color="transparent" onClick={this.handleCancel}>{getMessage('Cancel')}</Button>
              </CardFooter>
            </Card>
            <div className={classes.links}>
              <Link className={classes.link} to={`/admin/members/${this.id}/incomes`}>{getMessage('Incoming History')}</Link>
              <Link className={classes.link} to={`/admin/members/${this.id}/withdrawals`}>{getMessage('Withdrawals')}</Link>
              <Link className={classes.link} to={`/admin/members/${this.id}/points`}>{getMessage('Points History')}</Link>
              <Link className={classes.link} to={`/admin/members/${this.id}/refers`}>{getMessage('Recommend Members')}</Link>
              <Link className={classes.link} to={`/admin/members/${this.id}/sales`}>{getMessage('Sales')}</Link>
              <Link className={classes.link} to={`/admin/members/${this.id}/pointSales`}>{getMessage('Point Sales')}</Link>
            </div>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MemberDetail);
