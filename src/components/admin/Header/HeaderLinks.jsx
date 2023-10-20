import React from "react";
import { withRouter } from 'react-router-dom';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import ExitToApp from "@material-ui/icons/ExitToApp";
// core components
import Button from "components/admin/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle";
import { getMessage } from 'utils/helpers';

class HeaderLinks extends React.Component {
  handleSignout = () => {
    this.props.logout();
    this.props.push('/admin/login');
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Button
          color={window.innerWidth > 959 ? "transparent" : "white"}
          justIcon={window.innerWidth > 959}
          simple={!(window.innerWidth > 959)}
          aria-label="Signout"
          className={classes.buttonLink}
          onClick={this.handleSignout}
        >
          <ExitToApp className={classes.icons} />
          <Hidden mdUp>
            <p className={classes.linkText}>{getMessage('Signout')}</p>
          </Hidden>
        </Button>
      </div>
    );
  }
}

export default withStyles(headerLinksStyle)(withRouter(HeaderLinks));
