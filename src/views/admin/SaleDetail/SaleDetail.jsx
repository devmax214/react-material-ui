import React from "react";
import moment from "moment";
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

class SaleDetail extends React.Component {
  constructor(props) {
    super(props)

    this.id = props.match.params.id;

    this.state = {
      date: moment().format('YYYY-MM-DD'),
      member: '',
      // product_name: '',
      product_price: '',
      enabled: false,
      error: '',
    }
  }

  componentWillMount() {
    this.props.getSale(this.id)
  }

  componentWillReceiveProps(nextProps) {
    const { sales } = nextProps;

    if (sales.status !== this.props.sales.status) {
      if (sales.status === actionTypes.GET_SALE_SUCCESS) {
        this.fill(sales.sale)
      } else if (sales.status === actionTypes.GET_SALE_FAILURE) {
        this.setState({ error: getMessage(sales.error), enabled: true })
        setTimeout(() => {
          this.props.push('/admin/sales')
        }, 3000)
      } else if (sales.status === actionTypes.UPDATE_SALE_SUCCESS) {
        this.props.push('/admin/sales')
      } else if (sales.status === actionTypes.UPDATE_SALE_FAILURE) {
        this.setState({ error: getMessage(sales.error), enabled: true })
      }
    }
  }

  fill(sale) {
    this.setState({
      date: moment(sale.date).format('YYYY-MM-DD'),
      member: sale.member.name,
      // product_name: sale.product_name,
      product_price: sale.product_price,
      enabled: true,
      error: '',
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.getAttribute('id')]: event.target.value,
      error: '',
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '' })

    if (this.state.enabled) {
      const sale = {
        id: this.id,
        // product_name: this.state.product_name,
        product_price: this.state.product_price,
      }

      this.setState({ enabled: false }, () => {
        this.props.updateSale(sale)
      })
    }

    return false
  }

  handleCancel = () => {
    this.props.push('/admin/sales')
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
                <h4 className={classes.cardTitleWhite}>{getMessage('Sale Details')}</h4>
                <p className={classes.cardCategoryWhite}>{getMessage("Edit sale's info")}</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Date')}
                      id="date"
                      formControlProps={{
                        fullWidth: true
                      }}
                      labelProps={{
                        shrink: true
                      }}
                      inputProps={{
                        type: "date",
                        disabled: true,
                        value: this.state.date
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Member')}
                      id="member"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        disabled: true,
                        value: this.state.member
                      }}
                    />
                  </GridItem>
                </Grid>
                <Grid container>
                  {/* <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Product Name')}
                      id="product_name"
                      formControlProps={{
                        fullWidth: true,
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.product_name
                      }}
                    />
                  </GridItem> */}
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Product Price')}
                      id="product_price"
                      formControlProps={{
                        fullWidth: true
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.product_price
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

export default withStyles(styles)(SaleDetail);
