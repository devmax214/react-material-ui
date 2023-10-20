import React from "react";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Select from 'react-select';
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

const customStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: "white",
    borderTop: "0",
    borderLeft: "0",
    borderRight: "0",
    marginTop: "50px",
    borderRadius: "0",
    ':hover,:focus,:focus-within,:visited': {
      borderColor: 'hsl(0,0%,70%)',
      boxShadow: '0 0 0 0 transparent',
      borderTop: "0",
      borderLeft: "0",
      borderRight: "0",
    }
  }),
  placeholder: (base) => {
    return {
      ...base,
      color: "#a7a7a7",
    };
  },
  valueContainer: (base) => {
    return {
      ...base,
      paddingLeft: 0,
    };
  }
}

class MemberCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      username: '',
      phone_number: '',
      card_number: '',
      entry_date: moment().format('YYYY-MM-DD'),
      password: '',
      password_confirm: '',
      refer_id: '',
      enabled: false,
      error: '',
    }
  }

  componentWillMount() {
    this.props.getMembers()
  }

  componentWillReceiveProps(nextProps) {
    const { members } = nextProps;

    if (members.status !== this.props.members.status) {
      if (members.status === actionTypes.CREATE_MEMBER_SUCCESS) {
        this.props.push('/admin/members')
      } else if (members.status === actionTypes.CREATE_MEMBER_FAILURE) {
        this.setState({ error: getMessage(members.error), enabled: true })
      }
    }
  }

  validate = () => !(/^[a-zA-Z_]+$/.test(this.state.username))

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: '',
    }, () => {
      const { name, username, password, password_confirm } = this.state
      this.setState({ enabled: name && username && password && (password === password_confirm) })
    })
  }

  selectChange = (event) => {
    if (event !== null) this.setState({ refer_id: event.value })
    else this.setState({ refer_id: '' })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '' })

    if (this.state.enabled) {
      const member = {
        name: this.state.name,
        username: this.state.username,
        password: this.state.password,
        card_number: this.state.card_number,
        phone_number: this.state.phone_number,
        entry_date: this.state.entry_date,
        refer_id: this.state.refer_id,
      }

      this.setState({ enabled: false }, () => {
        this.props.createMember(member)
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
        <Alert message={this.state.error} />
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{getMessage('Create Member')}</h4>
                <p className={classes.cardCategoryWhite}>{getMessage("Enter member's detail")}</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
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
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Member ID')}
                      error={this.validate()}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        name: "username",
                        required: true,
                        value: this.state.username,
                        onChange: this.handleChange,
                      }}
                      helperText={getMessage('include only letters and underscore(_)')}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
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
                      labelText={getMessage('Bank Card Number')}
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
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Password')}
                      error={!(this.state.password && this.state.password === this.state.password_confirm)}
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
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Password Confirm')}
                      error={this.state.password !== this.state.password_confirm}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        name: "password_confirm",
                        type: "password",
                        onChange: this.handleChange,
                        value: this.state.password_confirm,
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <Select
                      isClearable
                      options={members.members.map((member) => { return { label: member.name + "(" + member.username + ")", value: member.id } })}
                      onChange={this.selectChange}
                      placeholder={getMessage('Referenced By')}
                      styles={customStyles}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>{getMessage('Create')}</Button>
                <Button color="transparent" onClick={this.handleCancel}>{getMessage('Cancel')}</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(MemberCreate);
