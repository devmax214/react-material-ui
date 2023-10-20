import React from "react";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import InputLabel from '@material-ui/core/InputLabel';
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
  formControl: {
    minWidth: 120,
    width: "100%",
    margin: "27px 0 0",
    position: "relative",
    paddingBottom: "10px",
  },
  inputLabel: {
    color: "#aaa !important",
    fontSize: "18px !important",
    transformOrigin: "top left !important",
    transform: "translate(0, 1.5px) scale(0.75) !important"
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

class MemberRegister extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      username: '',
      password: '',
      phone_number: '',
      card_number: '',
      entry_date: moment().format('YYYY-MM-DD'),
      point: '',
      balance: '',
      periods: '',
      next_period_date: '',
      recommends_reached: '',
      refer_id: '',
      enabled: false,
      error: '',
      success: '',
    }
  }

  componentWillMount() {
    this.props.getMembers()
  }

  componentWillReceiveProps(nextProps) {
    const { members } = nextProps;

    if (members.status !== this.props.members.status) {
      if (members.status === actionTypes.REGISTER_MEMBER_SUCCESS) {
        this.setState({
          name: '',
          username: '',
          password: '',
          phone_number: '',
          card_number: '',
          entry_date: moment().format('YYYY-MM-DD'),
          point: '',
          balance: '',
          periods: '',
          next_period_date: '',
          recommends_reached: '',
          refer_id: '',
          error: '',
          success: getMessage('New member registered successfully!'),
          enabled: true
        })
      } else if (members.status === actionTypes.REGISTER_MEMBER_FAILURE) {
        this.setState({ error: getMessage(members.error), success: '', enabled: true })
      }
    }
  }

  validate = () => !(/^[a-zA-Z_]+$/.test(this.state.username))

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: '',
      success: ''
    }, () => {
      const { name, username, password, entry_date } = this.state
      this.setState({ enabled: name && username && password && entry_date })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '', success: '' })

    if (this.state.enabled) {
      const member = {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
        card_number: this.state.card_number,
        phone_number: this.state.phone_number,
        entry_date: this.state.entry_date,
        point: this.state.point,
        balance: this.state.balance,
        periods: this.state.periods,
        next_period_date: this.state.next_period_date,
        recommends_reached: this.state.recommends_reached,
        refer_id: this.state.refer_id,
      }

      this.setState({ enabled: false }, () => {
        this.props.registerMember(member)
      })
    }

    return false
  }

  handleCancel = () => {
    this.props.push('/admin/members')
  }

  render() {
    const { classes, members } = this.props

    return (
      <div>
        <Alert color="success" message={this.state.success} />
        <Alert message={this.state.error} />
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{getMessage('Register Member')}</h4>
                <p className={classes.cardCategoryWhite}>{getMessage("Enter member's detail")}</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage('Name')}
                      error={!this.state.name}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        name: "name",
                        onChange: this.handleChange,
                        value: this.state.name
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage('Username')}
                      error={!this.state.username}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        name: "username",
                        onChange: this.handleChange,
                        value: this.state.username
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage('Password')}
                      error={!this.state.password}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        name: "password",
                        type: "password",
                        onChange: this.handleChange,
                        value: this.state.password
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage('Entry Date')}
                      formControlProps={{
                        fullWidth: true
                      }}
                      labelProps={{
                        shrink: true
                      }}
                      inputProps={{
                        name: "entry_date",
                        type: "date",
                        onChange: this.handleChange,
                        value: this.state.entry_date
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage('Phone Number')}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "phone_number",
                        onChange: this.handleChange,
                        value: this.state.phone_number
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage('Card Number')}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "card_number",
                        onChange: this.handleChange,
                        value: this.state.card_number
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage('Balance')}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "balance",
                        onChange: this.handleChange,
                        value: this.state.balance
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage('Periods')}
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        name: "periods",
                        onChange: this.handleChange,
                        value: this.state.periods
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage('Next Period Date')}
                      formControlProps={{
                        fullWidth: true
                      }}
                      labelProps={{
                        shrink: true
                      }}
                      inputProps={{
                        name: "next_period_date",
                        type: "date",
                        onChange: this.handleChange,
                        value: this.state.next_period_date
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage('Point')}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "point",
                        onChange: this.handleChange,
                        value: this.state.point
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText={getMessage('Recommends Reached')}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        name: "recommends_reached",
                        onChange: this.handleChange,
                        value: this.state.recommends_reached
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <FormControl className={classes.formControl}>
                      <InputLabel className={classes.inputLabel}>{getMessage('Refer ID')}</InputLabel>
                      <Select
                        className={classes.saleSelect}
                        inputProps={{
                          name: "refer_id",
                          open: this.state.open,
                          onClose: this.handleClose,
                          onOpen: this.handleOpen,
                          onChange: this.handleChange,
                          value: this.state.refer_id,
                        }}
                      >
                        {members.members.map((member, key) => {
                          return <MenuItem value={member.id} key={key} className={classes.optionSelect}>{member.name}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>{getMessage('Register')}</Button>
                <Button color="transparent" onClick={this.handleCancel}>{getMessage('Cancel')}</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MemberRegister);
