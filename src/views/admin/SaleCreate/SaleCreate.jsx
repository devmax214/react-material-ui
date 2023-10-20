import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
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
  formControl: {
    minWidth: 120,
    width: "100%",
    margin: "27px 0 0",
    position: "relative",
    paddingBottom: "10px",
  },
  inputLabel: {
    color: "#aaa !important",
    fontSize: "14px !important",
    transformOrigin: "top left !important",
    transform: "translate(0, 1.5px) scale(0.75) !important"
  },
  saleSelect: {
    '&:after': {
      borderBottom: "2px solid #f44336",
    },
    '&:before, &:hover:before': {
      borderBottom: "1px solid rgba(0, 0, 0, 0.2) !important",
    }
  }
};

class SaleCreate extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      member_id: '',
      // product_name: '',
      product_price: '',
      enabled: false,
      open: false,
      error: '',
    }
  }

  componentWillMount() {
    this.props.getMembers()
  }

  componentWillReceiveProps(nextProps) {
    const { sales } = nextProps;

    if (sales.status !== this.props.sales.status) {
      if (sales.status === actionTypes.CREATE_SALE_SUCCESS) {
        this.props.push('/admin/sales')
      } else if (sales.status === actionTypes.CREATE_SALE_FAILURE) {
        this.setState({ error: getMessage(sales.error), enabled: true })
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: '',
    }, () => {
      const { member_id, product_price } = this.state
      this.setState({ enabled: member_id && product_price })
    })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '' })

    if (this.state.enabled) {
      const sale = {
        member_id: this.state.member_id,
        // product_name: this.state.product_name,
        product_price: parseFloat(this.state.product_price),
      }

      this.setState({ enabled: false }, () => {
        this.props.createSale(sale)
      })
    }

    return false
  }

  handleCancel = () => {
    this.props.push('/admin/sales')
  }

  handleClose = () => {
    this.setState({ open: false });
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  render() {
    const { classes, members } = this.props

    return (
      <div>
        <Alert message={this.state.error} />
        <Grid container>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>{getMessage('Create Sale')}</h4>
                <p className={classes.cardCategoryWhite}>{getMessage("Enter sale's detail")}</p>
              </CardHeader>
              <CardBody>
                <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <FormControl className={classes.formControl}>
                      <InputLabel className={classes.inputLabel}>{getMessage('Member Name')}</InputLabel>
                      <Select
                        className={classes.saleSelect}
                        inputProps={{
                          name: "member_id",
                          open: this.state.open,
                          onClose: this.handleClose,
                          onOpen: this.handleOpen,
                          onChange: this.handleChange,
                          value: this.state.member_id
                        }}
                      >
                        {members.map((member, key) => {
                          return <MenuItem value={member.id} key={key}>{member.name}</MenuItem>
                        })}
                      </Select>
                    </FormControl>
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Product Price')}
                      error={!this.state.product_price}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.product_price,
                        name: "product_price"
                      }}
                    />
                  </GridItem>
                </Grid>
                {/* <Grid container>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Product Name')}
                      error={!this.state.product_name}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.product_name,
                        name: "product_name"
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText={getMessage('Product Price')}
                      error={!this.state.product_price}
                      formControlProps={{
                        fullWidth: true,
                        required: true,
                      }}
                      inputProps={{
                        onChange: this.handleChange,
                        value: this.state.product_price,
                        name: "product_price"
                      }}
                    />
                  </GridItem>
                </Grid> */}
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>{getMessage('Create')}</Button>
                <Button color="transparent" onClick={this.handleCancel}>{getMessage('Cancel')}</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </Grid>
      </div>
    );
  }
}

export default withStyles(styles)(SaleCreate);
