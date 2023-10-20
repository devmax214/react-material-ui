import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

const styles = {
  icon: {
    width: '24px',
    float: 'left',
    color: 'rgba(255, 255, 255, 0.8)',
    height: '30px',
    textAlign: 'center',
    marginRight: '15px',
    verticalAlign: 'middle',
    fontSize: '22px',
    display: 'inline-block',
    marginTop: '2px',
  }
}

const YenIcon = ({ classes }) => (
  <i className={"fa fa-yen-sign " + classes.icon}></i>
);

YenIcon.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(YenIcon);
