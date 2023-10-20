import React from "react";
import { Link } from "react-router-dom";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import { Person, CreditCard, Phone } from "@material-ui/icons";
import Snack from '@material-ui/core/SnackbarContent';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";
import snackbarContentStyle from "assets/jss/material-dashboard-react/components/snackbarContentStyle.jsx";
// Sections for this page
import IncomesSection from "./Sections/IncomesSection.jsx";
import PointsSection from "./Sections/PointsSection.jsx";
// import SalesSection from "./Sections/SalesSection.jsx";
import RefersSection from "./Sections/RefersSection.jsx";
import WithdrawalsSection from "./Sections/WithdrawalsSection.jsx";
import RequestSection from "./Sections/RequestSection.jsx";
import PointSaleRequestSection from "./Sections/PointSaleRequestSection.jsx";
// import PointRedeemsSection from "./Sections/PointRedeemsSection.jsx";
import PointSalesSection from "./Sections/PointSalesSection.jsx";
import { getMessage } from 'utils/helpers';
import imgBg from "assets/img/bg.jpg";
import imgBgRecommends from "assets/img/bg_recommends.jpg";
import imgBgPointSales from "assets/img/bg_point_sales.jpg";
import imgBgPoints from "assets/img/bg_points.jpg";
import imgBgWithdrawals from "assets/img/bg_withdrawals.jpg";
// mobile
import mobileImgBg from "assets/img/mainBg.jpg";
import mobileImgBgRecommends from "assets/img/mainBg.jpg";
import mobileImgBgPointSales from "assets/img/mainBg.jpg";
import mobileImgBgPoints from "assets/img/mainBg.jpg";
import mobileImgBgWithdrawals from "assets/img/mainBg.jpg";

const styles = {
  ...landingPageStyle,
  ...snackbarContentStyle,
  ladingContainer: {
    '& > div:first-child > div': {
      '@media (max-width: 1019px)': {
        display: "flex",
      },
    }
  },
  tabs: {
    textAlign: 'center',
    '& > div': {
      display: 'inline-flex',
    },
    '& [role="tablist"] > span': {
      backgroundColor: '#9c27b0',
      height: 3,
    }
  },
  tabBtn: {
    textAlign: 'right',
    '& button': {
      backgroundColor: "#fff",
      color: "#aaa",
      '&:focus, &:hover': {
        color: "#aaa",
      }
    },
  },
  tab: {
    padding: 100,
    backgroundSize: '100%',
    boxShadow: '0 2px 2px 0 rgba(244, 67, 54, 0.14), 0 3px 1px -2px rgba(244, 67, 54, 0.2), 0 1px 5px 0 rgba(244, 67, 54, 0.12)',
    borderRadius: 10,
    '@media (max-width: 1199px)': {
      padding: 85,
    },
    '@media (max-width: 1019px)': {
      padding: "8.95% 0",
      width: "calc(20% - 16px)",
    },
    '@media (max-width: 850px)': {
      padding: "8.8% 0",
    },
    '@media (max-width: 700px)': {
      padding: "8.6% 0",
    },
    '@media (max-width: 620px)': {
      padding: "8.4% 0",
    },
    '@media (max-width: 520px)': {
      minWidth: "initial",
      width: "calc(20% - 8px)",
      padding: "9% 0",
    },
  },
  caret: {
    width: 0,
    height: 0,
    display: "inline-block",
    transition: "all 150ms ease-in",
    borderTop: "5px solid",
    marginLeft: "4px",
    borderLeft: "4px solid transparent",
    borderRight: "4px solid transparent",
    verticalAlign: "middle",
  },
  announcementWapper: {
    maxWidth: "100%",
    margin: "15px 15px 0",
    '@media (max-width: 1199px)': {
      margin: '15px 0 0',
    },
  },
  messageLinnk: {
    paddingRight: "6px",
    color: 'white',
    '&:hover': {
      color: 'white',
    }
  },
  memberName: {
    paddingLeft: "35px",
    position: "relative",
    '& svg': {
      left: 0
    }
  },
}

class LandingPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      anchorEl: null,
      tabIndex: 0,
    }

    this.backgrounds = [imgBg, imgBgPoints, imgBgRecommends, imgBgWithdrawals, imgBgPointSales]
    this.mobileBackgrounds = [mobileImgBg, mobileImgBgPoints, mobileImgBgRecommends, mobileImgBgWithdrawals, mobileImgBgPointSales]
    this.tabItems = [
      getMessage('Incomes History'),
      getMessage('Points History'),
      getMessage('Recommends'),
      getMessage('Withdrawals'),
      getMessage('Point Sales')
    ]
  }

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
    })
  }

  handleClose = () => {
    this.setState({
      anchorEl: null,
    })
  }

  componentWillMount() {
    this.props.getProfile();
  }

  handleChange = (event, value) => {
    this.setState({ tabIndex: value })
  }

  handleItem = (value) => {
    this.setState({ tabIndex: value })
    this.handleClose()
  }

  announcementElement = (announcements, classes) => {
    let link =
      <Link to="/announcements" className={classes.dropdownLink + " " + classes.readmessage + " " + classes.messageLinnk}>
        {getMessage('See All')}
      </Link>

    if (announcements.length > 0) {
      return (
        <Snack
          message={
            <div>
              <span>{getMessage('announcement')}: {announcements[0].content}</span>
            </div>
          }
          classes={{
            root: classes.root + " " + classes.warning + " " + classes.announcementWapper,
            message: classes.message
          }}
          action={link}
        />
      );
    } else {
      return null;
    }
  }

  render() {
    const { classes, profile } = this.props
    const { tabIndex } = this.state
    // const tabText = this.tabItems[tabIndex];
    let bg = this.backgrounds[tabIndex];
    if (window.innerWidth < 600) {
      bg = this.mobileBackgrounds[tabIndex];
    }

    const tabs = (
      <Tabs
        className={classes.tabs}
        value={tabIndex}
        onChange={this.handleChange}
        indicatorColor="primary"
        textColor="primary"
      >
        {this.tabItems.map((text, i) => (
          <Tab key={i} value={i} className={classes.tab + " " + classes[`tabs_${i}`]} />
        ))}
      </Tabs>
    );

    return (
      <div>
        <Header
          color="transparent"
          brand={getMessage('Home')}
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: "white"
          }}
        />
        <Parallax small filter image={bg}>
          <div className={classes.container}>
            <GridContainer>
              {profile.member &&
                <GridItem xs={12} sm={12} md={6}>
                  <h1 className={classes.title}>{profile.member.name}</h1>
                  <h4 className={classes.memberName}><Person className={classes.icon} />{profile.member.username}</h4>
                  {profile.member.phone_number !== '' || profile.member.card_number !== '' ? (
                    <div className={classes.flex}>
                      {profile.member.phone_number !== '' ? <span><Phone className={classes.iconSmall} />{profile.member.phone_number}</span> : null}
                      {profile.member.card_number !== '' ? <span><CreditCard className={classes.iconSmall} />{profile.member.card_number}</span> : null}
                    </div>) : null}
                  <br />
                  <Button
                    color="danger"
                    href="/profile"
                    rel="view profile"
                  >
                    {getMessage('Update Profile')}
                  </Button>
                </GridItem>
              }
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classNames(classes.container, classes.content) + " " + classes.ladingContainer}>
            {tabs}
            {this.announcementElement(profile.announcements, classes)}
            {/* <Hidden mdUp> */}
            {/* <div className={classes.tabBtn}>
              <Button
                aria-owns={anchorEl ? 'simple-menu' : null}
                aria-haspopup="true"
                onClick={this.handleClick}
                simple
              >
                {tabText}
                <b className={classes.caret} />
              </Button>
            </div> */}

            {/* {this.announcementElement(profile.announcements, classes)} */}
            {/* </Hidden> */}
            {/* <Hidden mdUp implementation="css">
              <div className={classes.dropdownTabItem}>
                <Menu
                  id="simple-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                >
                  {this.tabItems.map((text, i) => (
                    <MenuItem key={i} onClick={() => this.handleItem(i)}>{text}</MenuItem>
                  ))}
                </Menu>
              </div>
            </Hidden> */}
            {tabIndex === 0 && <IncomesSection incomes={profile.incomes} />}
            {tabIndex === 1 && <PointsSection points={profile.points} />}
            {tabIndex === 2 && <RefersSection referers={profile.referers} />}
            {tabIndex === 3 &&
              <div>
                <WithdrawalsSection withdrawals={profile.withdrawals} />
                <RequestSection section="withdrawals" title="Request New Withdrawal" />
              </div>
            }
            {tabIndex === 4 &&
              <div>
                <PointSaleRequestSection section="newpointsale" title="Create Point Sale Request" />
                <PointSalesSection pointSales={profile.pointSales} />
              </div>
            }
          </div>
        </div>
        <Footer />
      </div >
    );
  }
}

export default withStyles(styles)(LandingPage);
