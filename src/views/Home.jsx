/* eslint-disable */
import React from "react";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Switch, Route } from "react-router-dom";

import { authenticate } from 'redux/actions';
import homeRoutes from "routes/home.jsx";

const switchRoutes = (
  <Switch>
    {homeRoutes.map((prop, key) => {
      return <Route exact path={prop.path} component={prop.component} key={key} />;
    })}
  </Switch>
);

class Home extends React.Component {
  state = {
    mobileOpen: false
  };

  componentWillMount() {
    this.checkAuth(this.props.auth.authenticated);
  }

  componentWillReceiveProps(nextProps) {
    this.checkAuth(nextProps.auth.authenticated);
  }

  checkAuth(authenticated) {
    if (!authenticated) {
      const token = localStorage.getItem('token');

      if (!token) {
        let redirectAfterLogin = this.props.location.pathname;
        this.props.push(`/login?next=${redirectAfterLogin}`);
      }
      else {
        this.props.authenticate(token);
      }
    } else {
      if (!this.state.loggedIn) {
        this.setState({ loggedIn: true });
      }
    }
  }

  render() {
    const { auth } = this.props;

    return auth.authenticated && (
      <div>{switchRoutes}</div>
    );
  }
}

Home.propTypes = {
  auth: PropTypes.object.isRequired,
  authenticate: PropTypes.func.isRequired,
};

export default connect((state) => ({
  'auth': state.auth,
}), { authenticate, push })(Home)
