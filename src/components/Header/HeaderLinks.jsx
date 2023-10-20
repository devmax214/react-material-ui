/*eslint-disable*/
import React from "react";
import moment from 'moment';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import { push } from 'react-router-redux';
import { logout, checkedAnnouncement } from 'redux/actions';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import {
  Person,
  // Notifications 
} from "@material-ui/icons";

// core components
import CustomDropdown from "components/CustomDropdown/CustomDropdown.jsx";
import Button from "components/CustomButtons/Button.jsx";

// import IconButton from "@material-ui/core/IconButton";
// import Close from "@material-ui/icons/Close";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";
import { getMessage } from 'utils/helpers';

const styles = theme => ({
  ...headerLinksStyle(theme),
  messageClose: {
    width: "24px",
    height: "24px",
    "@media (max-width: 600px)": {
      width: "23px",
      height: "23px",
      border: "1px solid #c3c3c3",
    },
    '& svg': {
      width: "11px",
      height: "11px",
    }
  },
  readmessage: {
    width: "300px",
    padding: 10,
    display: "flex",
    alignItems: "center",
    '& > span': {
      width: "calc(100% - 24px)",
    }
  },
  dropdownLink: {
    ...headerLinksStyle(theme).dropdownLink,
    padding: 10,
    "@media (max-width: 600px)": {
      width: "220px !important",
      padding: "5px !important",
    },
    '&:hover': {
      padding: 10,
      display: "flex",
      color: "#FFFFFF",
      boxShadow: "0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)",
      backgroundColor: "#9c27b0"
    },
  },
  iconYen: {
    marginRight: "5px",
  },
  headerPoint: {
    marginRight: "5px",
  },
  nextPeriodDate: {
    marginRight: "5px",
  }
})

class HeaderLinks extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      email: '',
      points: '',
      incomes: '',
      nextDate: '',
      announcements: [],
    }
  }

  handleLogout = () => {
    this.props.logout();
    this.props.push('/login');
  }

  readNotification = (id) => {
    this.props.checkedAnnouncement(id)
  }

  render() {
    const {
      classes,
      member,
      // announcements
    } = this.props;

    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <Button color="transparent" className={classes.navLink} href="/">
            {getMessage('Home')}
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button color="transparent" className={classes.navLink}>
            <span className={classes.headerPoint}>{getMessage('Point')}</span> {member && member.point}
          </Button>
        </ListItem>
        <ListItem className={classes.listItem}>
          <Button color="transparent" className={classes.navLink}>
            <span className={classes.iconYen}>{getMessage('Income')}</span> {member && member.balance}
          </Button>
        </ListItem>
        {member && (member.next_period_date !== '0000-00-00 00:00:00') ? (
          <ListItem className={classes.listItem}>
            <Button color="transparent" className={classes.navLink}>
              <span className={classes.nextPeriodDate}>{getMessage('Next Period Date')}</span> {moment(member.next_period_date).format('MM/DD/YYYY')}
            </Button>
          </ListItem>) : null
        }
        {/* <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="Announcement List"
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={Notifications}
            dropdownList={[...announcements.map((announcement, key) => {
              return <div key={key}>
                <a className={classes.dropdownLink + " " + classes.readmessage}>
                  <span>{announcement.content}</span>
                  <IconButton
                    className={classes.iconButton + " " + classes.messageClose}
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    onClick={() => this.readNotification(announcement.id)}
                  >
                    <Close className={classes.close} />
                  </IconButton>
                </a>
              </div>
            }), <div>
              <Link to="/announcements" className={classes.dropdownLink + " " + classes.readmessage}>
                {getMessage('See All')}
              </Link>
            </div>]}
          />
        </ListItem> */}
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText={member && member.name}
            buttonProps={{
              className: classes.navLink,
              color: "transparent"
            }}
            buttonIcon={Person}
            dropdownList={[
              <Link to="/profile" className={classes.dropdownLink}>{getMessage('View Profile')}</Link>,
              <a className={classes.dropdownLink} onClick={this.handleLogout}>{getMessage('Logout')}</a>
            ]}
          />
        </ListItem>
      </List >
    );
  }
}

export default connect((state) => ({
  'member': state.profile.member,
  // 'announcements': state.profile.announcements,
}), { logout, checkedAnnouncement, push })(withStyles(styles)(HeaderLinks))
