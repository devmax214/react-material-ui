import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import TextField from '@material-ui/core/TextField';
// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Alert from "components/Alert/Alert.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";

import cardStyle from "assets/jss/material-kit-react/components/cardStyle.jsx";
import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";
import { createPointSale, getPointItems } from 'redux/actions'
import * as actionTypes from 'redux/actionTypes'
import { getMessage } from 'utils/helpers';

const styles = {
  ...cardStyle,
  note: {
    '& > div': {
      margin: "auto 0",
    }
  },
  title: {
    ...workStyle.title,
    fontSize: '1.5rem'
  },
  userImg: {
    display: "inline-flex",
    alignItems: "center",
    '& div': {
      width: "30px",
      display: "inline-block",
    },
    '& img': {
      width: "100%",
    },
    '& span': {
      display: "inline-block",
      width: "calc(100% - 40px)",
      marginLeft: 10,
    }
  },
  name_list: {
    backgroundColor: "#f2f2f2",
    borderRadius: "3px",
    overflowY: "overlay",
    maxHeight: "615px",
    '& ul': {
      listStyle: "none",
      margin: 0,
      padding: 0,
    }
  },
  point_item_list: {
    cursor: "not-allowed",
    color: "#b7b7b7",
    padding: "5px 0",
    margin: "0 15px",
    borderBottom: "1px solid #cdcdcd",
  },
  item_clickable: {
    cursor: "pointer",
    color: "#0e0e0e",
  },
  imgWrapper: {
    '& img': {
      width: "100%",
    }
  },
  itemTitle: {
    fontWeight: 600,
  },
  btnAction: {
    paddingLeft: "15px"
  },
  textBuy: {
    color: "rgba(0, 0, 0, 0.54)"
  },
  textField: {
    '& > label, &:hover > label': {
      color: "#495057 !important",
    },
    '& > div:after, &:hover > div:after, &:hover > div:before': {
      borderBottomColor: "#9c27b0 !important",
    }
  }
};

class PointSaleRequestSection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      point: '',
      item_id: '',
      note: '',
      error: '',
      success: '',
      items: [],
      photo_url: '',
      item_name: '',
      item_note: '',
      quantity: 1,
      total_point: '',
    }

    this.props.getPointItems()
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.items,
      total_point: nextProps.member.point,
      // item_name: nextProps.items[0].item_name,
      // point: nextProps.items[0].item_point,
      // item_note: nextProps.items[0].note,
    })
    // this.detailProfile(nextProps.items[0])
    if (nextProps[this.props.section].status !== this.props[this.props.section].status) {
      if (nextProps[this.props.section].status === actionTypes.CREATE_POINTSALE_SUCCESS) {
        this.setState({ error: '', success: getMessage('Your request has been sent successfully!') })
        this.setState({
          note: '',
        })
      } else if (nextProps[this.props.section].status === actionTypes.CREATE_POINTSALE_FAILURE) {
        this.setState({ error: getMessage(nextProps[this.props.section].error), success: '' })
      }
    }
  }

  handleChange = (event) => {
    if (event.target.name === 'quantity') {
      // let quantity = ''
      // if (parseFloat(this.state.total_point) > parseFloat(this.state.point) * event.target.value) {
      //   quantity = event.target.value > 0 ? event.target.value : 1
      // } else {
      //   quantity = parseInt(parseFloat(this.state.total_point) / parseFloat(this.state.point), 10)
      // }
      this.setState({
        [event.target.name]: parseInt(event.target.value, 10) > 0 ? parseInt(event.target.value, 10) : '',
        error: '', success: '',
      })
    } else {
      this.setState({
        [event.target.name]: event.target.value,
        error: '', success: '',
      })
    }
  }

  selectChange = (event) => {
    if (event !== null) this.setState({ item_id: event.value })
    else this.setState({ item_id: '' })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '', success: '' })

    if (parseInt(this.state.quantity, 10) > 0) {
      if (parseFloat(this.state.point * this.state.quantity, 10) < parseFloat(this.state.total_point, 10)) {
        this.props.createPointSale({
          member_id: this.props.member.id,
          item_id: this.state.item_id,
          point: parseFloat(this.state.point),
          quantity: this.state.quantity,
          note: this.state.note
        })
      } else {
        this.setState({ error: getMessage('Failded to submit, your point is not enough to get this item.'), success: '' })
      }
    } else {
      this.setState({ error: getMessage('Please input items quantity.'), success: '' })
    }

    return false
  }

  detailProfile = (item) => {
    this.setState({
      photo_url: item.photo_url,
      item_id: item.id,
      item_name: item.item_name,
      point: item.item_point,
      item_note: item.note,
      quantity: 1,
    })
  }

  render() {
    const { classes } = this.props

    return (
      <div className={classes.section}>
        <GridContainer>
          <GridItem cs={12} sm={12} md={12}>
            <Card>
              <CardBody>
                <h4 className={classes.title}>{this.props.title !== '' ? getMessage(this.props.title) : ''}</h4>
                <Alert color="success" message={this.state.success} />
                <Alert message={this.state.error} />
                <form>
                  <GridContainer>
                    <GridItem xs={12} sm={12} md={5}>
                      <p className={classes.textBuy}>{getMessage('Item') + ':'}</p>
                      <div className={classes.name_list}>
                        <ul>
                          {this.state.items.map((item, key) => {
                            let item_list_class = parseFloat(this.state.total_point) > parseFloat(item.item_point) ? classes.item_clickable : ''
                            let image = item.photo_url !== '' ? item_list_class !== '' ? (
                              <li key={key} onClick={() => this.detailProfile(item)} className={classes.point_item_list + ' ' + item_list_class}>
                                <div className={classes.userImg}>
                                  <div><img src={item.photo_url} alt="request" /></div>
                                  <span>{item.item_name}</span>
                                </div>
                              </li>
                            ) : (
                                <li key={key} className={classes.point_item_list}>
                                  <div className={classes.userImg}>
                                    <div><img src={item.photo_url} alt="request" /></div>
                                    <span>{item.item_name}</span>
                                  </div>
                                </li>
                              ) : item_list_class !== '' ? (
                                <li key={key} onClick={() => this.detailProfile(item)} className={classes.point_item_list + ' ' + item_list_class}><span>{item.item_name}</span></li>
                              ) : (
                                  <li key={key} className={classes.point_item_list}><span>{item.item_name}</span></li>
                                )
                            return image
                          })}
                        </ul>
                      </div>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={7}>
                      {this.state.item_id ?
                        <div>
                          <div className={classes.imgWrapper}>
                            {this.state.photo_url !== '' ? <img src={this.state.photo_url} alt="profile" /> : null}
                          </div>
                          <h4 className={classes.itemTitle}>{this.state.item_name}</h4>
                          <p>{this.state.item_note}</p>
                          <p><strong>{getMessage('item price')}: </strong>{this.state.point}</p>
                          <TextField
                            name="quantity"
                            label={getMessage('Quantity')}
                            value={this.state.quantity}
                            onChange={this.handleChange}
                            type="number"
                            className={classes.textField}
                            InputLabelProps={{
                              shrink: true,
                            }}
                            margin="normal"
                          />
                          <CustomInput
                            labelText={getMessage('Note')}
                            formControlProps={{
                              fullWidth: true,
                              className: classes.textArea
                            }}
                            inputProps={{
                              multiline: true,
                              rows: 4,
                              value: this.state.note,
                              onChange: this.handleChange,
                              name: "note",
                            }}
                          />
                          <div className={classes.btnAction}><Button color="primary" onClick={this.handleSubmit}>{getMessage('Buy')}</Button></div>
                        </div>
                        :
                        <p className={classes.textBuy}>{getMessage('Please select a point item to buy.')}</p>
                      }
                    </GridItem>
                  </GridContainer>
                </form>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

PointSaleRequestSection.propTypes = {
  section: PropTypes.string.isRequired,
};

export default connect((state) => ({
  'member': state.profile.member,
  'newpointsale': state.points,
  'items': state.items.items
}), { createPointSale, getPointItems })(withStyles(styles)(PointSaleRequestSection));
