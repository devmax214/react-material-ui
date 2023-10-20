import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
// import { Person, CreditCard, Phone } from "@material-ui/icons";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import AnnouncementsSection from "./Sections/AnnouncementsSection.jsx";
import { getMessage } from 'utils/helpers';

class Announcements extends React.Component {
  componentWillMount() {
    this.props.getAnnouncements();
    this.props.getProfile();
  }

  markAsRead = ids => {
    this.props.updateAnnouncementStatus(ids)
  }

  render() {
    const { classes, profile, announcements } = this.props;

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
        <Parallax small filter image={require("assets/img/bg.jpg")}>
          <div className={classes.container}>
            <GridContainer>
              {profile.member &&
                <GridItem xs={12} sm={12} md={6}>
                  <h1 className={classes.title}>{profile.member.name}</h1>
                  <br />
                  <Button
                    color="danger"
                    href="/"
                    rel="view profile"
                  >
                    {getMessage('Back To Home')}
                  </Button>
                </GridItem>
              }
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classNames(classes.container, classes.content)}>
            <AnnouncementsSection announcements={announcements.announcements} markAsRead={this.markAsRead} />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(Announcements);
