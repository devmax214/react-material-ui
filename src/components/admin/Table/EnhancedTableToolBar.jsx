import React from "react";
import classNames from 'classnames';
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import { getMessage } from 'utils/helpers';

const toolbarStyles = theme => ({
  root: {
    width: "288px",
    float: "right",
    padding: "0",
  },
  highlight:
    theme.palette.type === 'light'
      ? {
        color: "#000",
        fontSize: "17px",
        textTransform: "uppercase",
      }
      : {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.secondary.dark,
      },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
    '& button': {
      color: "#9c27b0",
    },
    '& svg': {
      fontSize: "36px",
    }
  },
  title: {
    flex: '0 0 auto',
    textTransform: "capitalize",
    '& h2': {
      color: "#fff",
      fontSize: "17px",
    }
  },
  markAs: {
    padding: "0 10px 0 30px"
  }
});

class EnhancedTableToolBar extends React.Component {

  render() {
    const { classes, checkedIds } = this.props;

    return (
      <Toolbar
        className={classNames(classes.root, {
          [classes.highlight]: checkedIds.length > 0,
        })}
      >
        <div className={classes.title}>
          <Typography color="inherit" variant="subheading">
            {getMessage('{} selected', checkedIds.length)} <span className={classes.markAs}>{getMessage('Mark as read')}</span>
          </Typography>
        </div>
        <div className={classes.actions}>
          <IconButton aria-label="Mark as read">
            <PlaylistAddCheckIcon onClick={this.props.markAsRead} />
          </IconButton>
        </div>
      </Toolbar>
    );
  }
}

EnhancedTableToolBar.propTypes = {
  classes: PropTypes.object.isRequired,
  checkedIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  markAsRead: PropTypes.func,
};

export default withStyles(toolbarStyles)(EnhancedTableToolBar);
