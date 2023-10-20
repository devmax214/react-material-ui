import React from "react";
// @material-ui/core components
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

import * as actionTypes from 'redux/actionTypes';
import { getMessage } from 'utils/helpers';

class SettingCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      setting_field: '',
      value: '',
      error: '',
      enabled: false,
    }
  }

  componentWillReceiveProps(nextProps) {
    const { settings } = nextProps;

    if (settings.status !== this.props.settings.status) {
      if (settings.status === actionTypes.CREATE_SETTING_SUCCESS) {
        this.erase()
      } else if (settings.status === actionTypes.CREATE_SETTING_FAILURE) {
        this.setState({ error: getMessage(settings.error), enabled: true })
      }
    }
  }

  erase() {
    this.setState({
      name: '',
      setting_field: '',
      value: '',
      enabled: false,
      error: '',
    });
  }

  validate = () => !(/^[a-zA-Z_]+$/.test(this.state.setting_field))

  handleChange = (event) => {
    this.setState({
      [event.target.getAttribute('id')]: event.target.value,
      error: '',
    }, () => {
      this.setState({ enabled: this.state.name && this.state.setting_field })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '' })

    if (this.state.enabled) {
      this.setState({ enabled: false }, () => {
        this.props.createSetting({
          name: this.state.name,
          setting_field: this.state.setting_field,
          value: this.state.value,
        })
      })
    }

    return false
  }

  render() {
    const { classes } = this.props

    return (
      <GridItem xs={12} sm={12} md={6}>
        <Alert message={this.state.error} />
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>{getMessage('Add New Setting')}</h4>
            <p className={classes.cardCategoryWhite}>{getMessage('Input setting info')}</p>
          </CardHeader>
          <CardBody>
            <Grid container>
              <GridItem xs={12}>
                <CustomInput
                  labelText={getMessage('Setting Name')}
                  id="name"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    value: this.state.name,
                    onChange: this.handleChange,
                  }}
                />
              </GridItem>
              <GridItem xs={12}>
                <CustomInput
                  labelText={getMessage('Key')}
                  id="setting_field"
                  error={this.validate()}
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    required: true,
                    value: this.state.setting_field,
                    onChange: this.handleChange,
                  }}
                  helperText={getMessage('include only letters and underscore(_)')}
                />
              </GridItem>
              <GridItem xs={12}>
                <CustomInput
                  labelText={getMessage('Value')}
                  id="value"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    value: this.state.value,
                    onChange: this.handleChange,
                  }}
                />
              </GridItem>
            </Grid>
          </CardBody>
          <CardFooter>
            <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>{getMessage('Create')}</Button>
          </CardFooter>
        </Card>
      </GridItem>
    );
  }
}

export default SettingCreate