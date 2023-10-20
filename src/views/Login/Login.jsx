import React from "react";
import qs from "qs";
import { Link } from "react-router-dom";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
// @material-ui/icons
import { Email, LockOutline, TrendingFlat } from "@material-ui/icons";
// core components
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Alert from "components/Alert/Alert.jsx";

import loginPageStyle from "assets/jss/material-kit-react/views/loginPage.jsx";

import * as actionTypes from 'redux/actionTypes'
import { getMessage } from 'utils/helpers';
import image from "assets/img/bg_login.jpg";
import mobileImage from "assets/img/loginBg.jpg";


const styles = theme => ({
  ...loginPageStyle,
  loginHeader: {
    backgroundImage: "url(" + image + ")",
    backgroundSize: "cover",
    backgroundPosition: "top center",
    "@media (max-width: 414px)": {
      backgroundImage: "url(" + mobileImage + ")",
    },
  }
});

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardAnimaton: "cardHidden",
      username: '',
      password: '',
      enabled: false,
      error: '',
    };
  }

  componentDidMount() {
    setTimeout(
      function () {
        this.setState({ cardAnimaton: "" });
      }.bind(this),
      700
    );
  }

  componentWillReceiveProps(nextProps) {
    const { auth } = nextProps;

    if (auth.status !== this.props.auth.status) {
      if (auth.status === actionTypes.AUTH_LOGIN_SUCCESS) {
        let redirectTo = '/';
        if (this.props.location.search) {
          const query = qs.parse(this.props.location.search.slice(1));
          redirectTo = query.next || redirectTo;
        }
        this.props.push(redirectTo)
      } else if (auth.status === actionTypes.AUTH_LOGIN_FAILURE) {
        this.setState({ error: getMessage(auth.error), enabled: true })
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.getAttribute('id')]: event.target.value,
      error: '',
    }, () => {
      this.setState({ enabled: this.state.username && this.state.password })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '', })

    if (this.state.enabled) {
      const { username, password } = this.state

      this.setState({ enabled: false }, () => {
        this.props.login(username, password)
      })
    }
    return false
  }

  render() {
    const { classes } = this.props;
    const { username, password, enabled, error } = this.state;

    return (
      <div>
        <Alert message={error} />
        <div className={classes.pageHeader + " " + classes.loginHeader} >
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={4}>
                <Card className={classes[this.state.cardAnimaton]}>
                  <form className={classes.form}>
                    <CardHeader color="primary" className={classes.cardHeader}>
                      <h4>{getMessage('Welcome to Membership!')}</h4>
                    </CardHeader>
                    <CardBody>
                      <CustomInput
                        labelText={getMessage('Member ID...')}
                        id="username"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value: username,
                          onChange: this.handleChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <Email className={classes.inputIconsColor} />
                            </InputAdornment>
                          )
                        }}
                      />
                      <CustomInput
                        labelText={getMessage('Password')}
                        id="password"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          type: "password",
                          value: password,
                          onChange: this.handleChange,
                          endAdornment: (
                            <InputAdornment position="end">
                              <LockOutline
                                className={classes.inputIconsColor}
                              />
                            </InputAdornment>
                          )
                        }}
                      />
                    </CardBody>
                    <CardFooter className={classes.cardFooter}>
                      <Button color="primary" disabled={!enabled} onClick={this.handleSubmit}>
                        {getMessage('Login')}
                      </Button>
                      <p className={classes.divider}>
                        <Link to="/admin/login">{getMessage('Log in to Admin')}<TrendingFlat className={classes.icon} /></Link>
                      </p>
                    </CardFooter>
                  </form>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
          <Footer whiteFont />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Login);
