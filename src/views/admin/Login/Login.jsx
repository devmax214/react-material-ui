import React from "react";
import PropTypes from "prop-types";
import qs from "qs";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import { TrendingFlat } from "@material-ui/icons";
// core components
import GridItem from "components/admin/Grid/GridItem.jsx";
import CustomInput from "components/admin/CustomInput/CustomInput.jsx";
import Button from "components/admin/CustomButtons/Button.jsx";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";
import CardFooter from "components/admin/Card/CardFooter.jsx";
import Footer from "components/admin/Footer/Footer.jsx";
import Alert from "components/Alert/Alert.jsx";

import loginStyle from "assets/jss/material-dashboard-react/layouts/loginStyle.jsx";
import * as actionTypes from 'redux/actionTypes';
import { getMessage } from 'utils/helpers';

const styles = {
  ...loginStyle,
  cardTitle: {
    color: "#FFFFFF",
    marginTop: "0px",
    padding: "5px 0",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    textAlign: "center"
  },
  cardFooter: {
    display: "block",
    textAlign: "center"
  },
  divider: {
    marginTop: '10px',
    textAlign: "right"
  },
  loginContainer: {
    maxWidth: '350px',
    margin: '80px auto 0',
  },
  icon: {
    display: "inline-block",
    verticalAlign: "middle",
    width: "16px",
    height: "16px"
  }
};

class Login extends React.Component {
  static propTypes = {
    loginAdmin: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
  }

  constructor(props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      enabled: false,
      error: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = nextProps;

    if (auth.status !== this.props.auth.status) {
      if (auth.status === actionTypes.ADMIN_LOGIN_SUCCESS) {
        let redirectTo = 'admin/';
        if (this.props.location.search) {
          const query = qs.parse(this.props.location.search.slice(1));
          redirectTo = query.next || redirectTo;
        }
        this.props.push(redirectTo)
      } else if (auth.status === actionTypes.ADMIN_LOGIN_FAILURE) {
        this.setState({ error: getMessage(auth.error), enabled: true })
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.getAttribute('id')]: event.target.value,
      error: '',
    }, () => {
      this.setState({ enabled: this.state.email && this.state.password })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '', })

    if (this.state.enabled) {
      const { email, password } = this.state

      this.setState({ enabled: false }, () => {
        this.props.loginAdmin(email, password)
      })
    }
    return false
  }

  render() {
    const { classes } = this.props;
    const { email, password, enabled, error } = this.state;

    return (
      <div className={classes.wrapper}>
        <div className={classes.mainPanel}>
          <div className={classes.content}>
            <div className={classes.container}>
              <Alert message={error} />
              <Grid container>
                <GridItem xs={12} sm={12} md={4}></GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <Card className={classes.loginContainer}>
                    <CardHeader color="primary">
                      <h4 className={classes.cardTitle}>{getMessage('Welcome to Membership Admin!')}</h4>
                    </CardHeader>
                    <CardBody>
                      <Grid container>
                        <GridItem xs={12}>
                          <CustomInput
                            labelText={getMessage('Email address')}
                            id="email"
                            formControlProps={{
                              fullWidth: true,
                              required: true,
                            }}
                            inputProps={{
                              type: "email",
                              value: email,
                              onChange: this.handleChange,
                            }}
                          />
                        </GridItem>
                        <GridItem xs={12}>
                          <CustomInput
                            labelText={getMessage('Password')}
                            id="password"
                            value={password}
                            formControlProps={{
                              fullWidth: true,
                              required: true,
                            }}
                            inputProps={{
                              value: password,
                              type: "password",
                              onChange: this.handleChange,
                            }}
                          />
                        </GridItem>
                      </Grid>
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button
                        color="primary"
                        className={classes.cardFooterAction}
                        disabled={!enabled}
                        onClick={this.handleSubmit}
                      >{getMessage('Login')}</Button>
                      <p className={classes.divider}>
                        <Link to="/login">{getMessage('Log in to Front')}<TrendingFlat className={classes.icon} /></Link>
                      </p>
                    </CardFooter>
                  </Card>
                </GridItem>
              </Grid>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
