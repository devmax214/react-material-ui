import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
// core components
import GridItem from "components/admin/Grid/GridItem.jsx";
import CustomInput from "components/admin/CustomInput/CustomInput.jsx";
import Button from "components/admin/CustomButtons/Button.jsx";
import Card from "components/admin/Card/Card.jsx";
import CardHeader from "components/admin/Card/CardHeader.jsx";
import CardBody from "components/admin/Card/CardBody.jsx";
import CardFooter from "components/admin/Card/CardFooter.jsx";
import Alert from "components/Alert/Alert.jsx";

import checkboxAndRadioStyle from "assets/jss/material-dashboard-react/checkboxAndRadioStyle.jsx";
import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle.jsx";

import * as actionTypes from 'redux/actionTypes'
import { getMessage } from 'utils/helpers';

const styles = {
  ...checkboxAndRadioStyle,
  ...cardStyle,
};

class AnnouncementDetail extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id;

    this.state = {
      content: '',
      enabled: false,
      error: '',
    }
  }

  componentWillMount() {
    this.props.getAnnouncement(this.id)
  }

  componentWillReceiveProps(nextProps) {
    const { announcements } = nextProps

    if (announcements.status !== this.props.announcements.status) {
      if (announcements.status === actionTypes.GET_ANNOUNCEMENT_SUCCESS) {
        this.fill(announcements.announcement)
      } else if (announcements.status === actionTypes.GET_ANNOUNCEMENT_FAILURE) {
        this.setState({ error: getMessage(announcements.error), enabled: true })
        setTimeout(() => {
          this.props.push('/admin/announcements')
        }, 3000)
      } else if (announcements.status === actionTypes.UPDATE_ANNOUNCEMENT_SUCCESS) {
        this.props.push('/admin/announcements')
      } else if (announcements.status === actionTypes.UPDATE_ANNOUNCEMENT_FAILURE) {
        this.setState({ error: getMessage(announcements.error), enabled: true })
      }
    }
  }

  fill(announcement) {
    this.setState({
      content: announcement.content,
      enabled: true,
      error: '',
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: '',
    }, () => {
      const { content } = this.state
      this.setState({ enabled: content !== '' })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '' })

    if (this.state.enabled) {
      const announcement = {
        id: this.id,
        content: this.state.content,
      }

      this.setState({ enabled: false }, () => {
        this.props.updateAnnouncement(announcement)
      })
    }

    return false
  }

  handleCancel = () => {
    this.props.push('/admin/announcements')
  }

  render() {
    const { classes } = this.props

    return (
      <div>
        <Alert message={this.state.error} />
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{getMessage('Announcement Details')}</h4>
                <p className={classes.cardCategoryWhite}>{getMessage("Edit announcement's info")}</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText={getMessage('Content')}
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        multiline: true,
                        row: 3,
                        onChange: this.handleChange,
                        value: this.state.content,
                        name: "content",
                      }}
                    />
                  </GridItem>
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>{getMessage('Save')}</Button>
                <Button color="transparent" onClick={this.handleCancel}>{getMessage('Cancel')}</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(AnnouncementDetail);
