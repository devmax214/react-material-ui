/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Switch, Route, Redirect } from "react-router-dom";
import { authenticateAdmin } from 'redux/actions';
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Header from "components/admin/Header/Header.jsx";
import Footer from "components/admin/Footer/Footer.jsx";
import Sidebar from "components/admin/Sidebar/Sidebar.jsx";

import adminRoutes from "routes/admin.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";

import image from "assets/img/sidebar.jpg";
import logo from "assets/img/reactlogo.png";

const switchRoutes = (
  <Switch>
    {adminRoutes.map((prop, key) => {
      if (prop.redirect)
        return <Redirect from={prop.path} to={prop.to} key={key} />;
      return <Route exact path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class Admin extends React.Component {
  state = {
    mobileOpen: false,
    loggedIn: false,
  };

  handleDrawerToggle = () => {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  };

  componentWillMount() {
    this.checkAuth(this.props.auth.adminAuthenticated);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps.auth.adminAuthenticated);
  }

  componentDidMount() {
    if (this.state.loggedIn) {
      this.initializeScrollbar();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.loggedIn && this.props.auth.adminAuthenticated) {
      if (prevProps.history.location.pathname !== prevProps.location.pathname) {
        this.refs.mainPanel.scrollTop = 0;
        if (this.state.mobileOpen) {
          this.setState({ mobileOpen: false });
        }
      }

      if (prevState.loggedIn !== this.state.loggedIn) {
        this.initializeScrollbar();
      }
    }
  }

  checkAuth(adminAuthenticated) {
    if (!adminAuthenticated) {
      const token = localStorage.getItem('admin-token');

      if (!token) {
        let redirectAfterLogin = this.props.location.pathname;
        this.props.push(`/admin/login?next=${redirectAfterLogin}`);
      }
      else {
        this.props.authenticateAdmin(token, true);
      }
    } else {
      if (!this.state.loggedIn) {
        this.setState({ loggedIn: true });
      }
    }
  }

  initializeScrollbar() {
    if ((navigator.platform.indexOf("Win") > -1) && (window.innerWidth > 600)) {
      const ps = new PerfectScrollbar(this.refs.mainPanel);
    }
  }

  render() {
    const { classes, auth, ...rest } = this.props;

    return auth.adminAuthenticated && (
      <div className={classes.wrapper}>
        <Sidebar
          routes={adminRoutes}
          logoText={"Membership"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="blue"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            routes={adminRoutes}
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />
          <div className={classes.content}>
            <div className={classes.container}>{switchRoutes}</div>
          </div>
          <Footer />
        </div>
      </div>
    );
  }
}

Admin.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  authenticateAdmin: PropTypes.func.isRequired,
};

export default connect((state) => ({
  'auth': state.auth,
}), { authenticateAdmin, push })(withStyles(dashboardStyle)(Admin))
