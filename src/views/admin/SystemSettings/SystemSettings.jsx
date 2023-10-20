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

import cardStyle from "assets/jss/material-dashboard-react/components/cardStyle.jsx";

import * as actionTypes from 'redux/actionTypes';
import SettingCreate from './SettingCreate';
import { getMessage } from 'utils/helpers';

const styles = {
  ...cardStyle,
  btnRemove: {
    position: "absolute",
    right: 0,
    bottom: "30px",
    display: "inlineBlock",
    lineHeight: "30px",
    padding: "0 5px",
    backgroundColor: "#fff",
  },
  CustomInput: {
    position: "absolute"
  }
}

class SystemSettings extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      success: '',
      error: '',
      enabled: true,
    }
  }

  componentWillMount() {
    this.props.getSettings()
  }

  componentWillReceiveProps(nextProps) {
    const { settings } = nextProps;

    if (settings.status !== this.props.settings.status) {
      if (settings.status === actionTypes.GET_SETTINGS_SUCCESS || settings.status === actionTypes.CREATE_SETTING_SUCCESS) {
        this.fill(settings.settings)
      } else if (settings.status === actionTypes.UPDATE_SETTINGS_SUCCESS) {
        this.setState({ error: '', success: getMessage('All settings updated successfully!'), enabled: true })
      } else if (
        settings.status === actionTypes.GET_SETTINGS_FAILURE ||
        settings.status === actionTypes.UPDATE_SETTINGS_FAILURE ||
        settings.status === actionTypes.DELETE_SETTING_FAILURE
      ) {
        this.setState({ error: getMessage(settings.error), success: '', enabled: true })
      }
    }
  }

  fill(settings) {
    const state = {};

    settings.forEach((setting) => {
      state[setting.setting_field] = setting.value;
    });

    this.setState({
      ...state,
      enabled: true,
      success: '',
      error: '',
    });
  }

  handleChange = (event) => {
    this.setState({
      [event.target.getAttribute('id')]: event.target.value,
      success: '',
      error: '',
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '', success: '' })

    const { enabled, error, success, ...settings } = this.state

    if (enabled) {
      this.setState({ enabled: false }, () => {
        this.props.updateSettings(settings)
      })
    }

    return false
  }

  handleDelete = async (id) => {
    if (window.confirm(getMessage('Are you sure to delete this setting?'))) {
      await this.setState({ error: '', success: '' })

      this.props.deleteSetting(id)
    }
  }
  renderElement = () => {

  }
  render() {
    const { classes, settings } = this.props

    return (
      <div>
        <Alert color="success" message={this.state.success} />
        <Alert message={this.state.error} />
        <Grid container>
          <GridItem xs={12} sm={12} md={6}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{getMessage('System Settings')}</h4>
                <p className={classes.cardCategoryWhite}>{getMessage('Edit settings')}</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  {settings.settings && settings.settings.map((setting, i) => (
                    <GridItem key={i} xs={12}>
                      <CustomInput
                        labelText={getMessage(setting.name)}
                        id={setting.setting_field}
                        formControlProps={{
                          fullWidth: true,
                        }}
                        inputProps={{
                          value: this.state[setting.setting_field],
                          onChange: this.handleChange,
                        }}
                        helperText={
                          <span className={classes.btnRemove}>
                            {/* {`${getMessage('Key')}: "${getMessage(setting.setting_field)}" `} */}
                            <a onClick={() => this.handleDelete(setting.id)}>{getMessage('remove')}</a>
                          </span>
                        }
                      />
                    </GridItem>
                  ))}
                </Grid>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>{getMessage('Save')}</Button>
              </CardFooter>
            </Card>
          </GridItem>
          <SettingCreate {...this.props} />
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SystemSettings);
