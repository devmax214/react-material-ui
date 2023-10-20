import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { logoutAdmin } from 'redux/actions';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import HeaderLinks from "./HeaderLinks";

import headerStyle from "assets/jss/material-dashboard-react/components/headerStyle.jsx";
import { getMessage } from 'utils/helpers';

function Header({ ...props }) {
  const { classes, color, routes, location, member } = props;

  function getTitle() {
    let title = ''
    if (/^\/admin\/members\/[0-9]+$/.test(location.pathname)
      || /^\/admin\/members\/[0-9]+\/[a-z]+$/.test(location.pathname)
      || /^\/admin\/withdrawals\/[0-9]+$/.test(location.pathname)
    ) {
      title = member ? `${member.name}(${member.username})` : ''
    } else {
      routes.forEach((route) => {
        if (route.path === location.pathname) {
          title = route.navbarName
        }
      });
    }

    return title
  }

  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });

  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          <h3 className={classes.title}>{getTitle() !== undefined ? getMessage(getTitle()) : ''}</h3>
        </div>
        <Hidden smDown implementation="css">
          <HeaderLinks logout={props.logoutAdmin} push={props.push} />
        </Hidden>
        <Hidden mdUp>
          <IconButton
            className={classes.appResponsive}
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"])
};

export default connect((state) => ({
  'member': state.members.member,
}), { logoutAdmin, push })(withStyles(headerStyle)(Header));
