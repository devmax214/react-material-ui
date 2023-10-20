import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import Select from 'react-select';
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Alert from "components/Alert/Alert.jsx";
import Card from "components/Card/Card.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import cardStyle from "assets/jss/material-kit-react/components/cardStyle.jsx";
import workStyle from "assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx";
import { createWithdrawal, createPointRedeem, createPointSale, getPointItems } from 'redux/actions'
import * as actionTypes from 'redux/actionTypes'
import { getMessage } from 'utils/helpers';

const styles = {
  ...cardStyle,
  ...workStyle,
  note: {
    '& > div': {
      margin: "auto 0",
    }
  },
  formControl: {
    minWidth: 120,
    width: "100%",
    margin: "10px 0 0",
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
    textTransform: "capitalize",
    '&:after': {
      borderBottom: "2px solid #8e24aa",
    },
    '&:before, &:hover:before': {
      borderBottom: "1px solid rgba(0, 0, 0, 0.2) !important",
    }
  },
  optionSelect: {
    textTransform: "capitalize",
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
  }
};

const customStyles = {
  control: styles => ({
    ...styles,
    backgroundColor: "white",
    borderTop: "0",
    borderLeft: "0",
    borderRight: "0",
    marginTop: "22px",
    borderRadius: "0",
    ':hover,:focus,:focus-within,:visited': {
      borderColor: 'hsl(0,0%,70%)',
      boxShadow: '0 0 0 0 transparent',
      borderTop: "0",
      borderLeft: "0",
      borderRight: "0",
    }
  }),
  placeholder: (base) => {
    return {
      ...base,
      color: "#a7a7a7",
    };
  },
  valueContainer: (base) => {
    return {
      ...base,
      paddingLeft: 0,
    };
  }
}

class RequestSection extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      amount: '',
      point: '',
      item_point: '',
      item_id: '',
      note: '',
      enabled: false,
      error: '',
      success: '',
    }

    this.props.getPointItems()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps[this.props.section].status !== this.props[this.props.section].status) {
      if (nextProps[this.props.section].status === actionTypes.CREATE_WITHDRAWAL_SUCCESS || nextProps[this.props.section].status === actionTypes.CREATE_POINTREDEEM_SUCCESS || nextProps[this.props.section].status === actionTypes.CREATE_POINTSALE_SUCCESS) {
        this.setState({ error: '', success: getMessage('Your request has been sent successfully!'), enabled: true })
        this.setState({
          amount: '',
          point: '',
          item_point: '',
          item_id: '',
          note: '',
        })
      } else if (nextProps[this.props.section].status === actionTypes.CREATE_WITHDRAWAL_FAILURE || nextProps[this.props.section].status === actionTypes.CREATE_POINTREDEEM_FAILURE || nextProps[this.props.section].status === actionTypes.CREATE_POINTSALE_FAILURE) {
        this.setState({ error: getMessage(nextProps[this.props.section].error), success: '', enabled: true })
      }
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
      error: '', success: '',
    }, () => {
      const amount = parseFloat(this.state.amount)
      const point = parseFloat(this.state.point)
      const item_point = parseFloat(this.state.item_point)
      const { item_id } = this.state
      this.setState({ enabled: amount > 0 || point > 0 || (item_point > 0 && item_id) })
    })
  }

  selectChange = (event) => {
    if (event !== null) this.setState({ item_id: event.value })
    else this.setState({ item_id: '' })
  }

  handleSubmit = async (event) => {
    event.preventDefault()
    event.stopPropagation()

    await this.setState({ error: '', success: '' })

    if (this.state.enabled) {
      this.setState({ enabled: false }, () => {
        if (this.props.section === 'withdrawals') {
          if (parseFloat(this.state.amount) > 10000) {
            this.setState({ error: getMessage('You can only withdraw not more than ¥10,000 each time.'), success: '', enabled: true })
          } else {
            this.props.createWithdrawal({
              member_id: this.props.member.id,
              amount: parseFloat(this.state.amount),
              note: this.state.note
            })
          }
        } else if (this.props.section === 'newpointsale') {
          this.props.createPointSale({
            member_id: this.props.member.id,
            item_id: this.state.item_id,
            point: parseFloat(this.state.item_point),
            note: this.state.note
          })
        } else {
          this.props.createPointRedeem({
            member_id: this.props.member.id,
            point: parseFloat(this.state.point),
            note: this.state.note
          })
        }
      })
    }

    return false
  }

  renderElement = () => {
    if (this.props.section === 'withdrawals') {
      return (
        <GridItem xs={12} sm={12} md={6}>
          <CustomInput
            labelText={getMessage('Withdrawal Amount')}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: this.state.amount,
              onChange: this.handleChange,
              name: "amount",
            }}
          />
        </GridItem>
      )
    } else if (this.props.section === 'newpointsale') {
      return (
        <GridItem xs={12} sm={12} md={6}>
          <CustomInput
            labelText={getMessage('Point')}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: this.state.item_point,
              onChange: this.handleChange,
              name: "item_point",
            }}
          />
        </GridItem>
      )
    } else {
      return (
        <GridItem xs={12} sm={12} md={6}>
          <CustomInput
            labelText={getMessage('Point')}
            formControlProps={{
              fullWidth: true,
            }}
            inputProps={{
              value: this.state.point,
              onChange: this.handleChange,
              name: "point",
            }}
          />
        </GridItem>
      )
    }
  }

  render() {
    const { classes, items } = this.props
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <Card>
              <CardBody>
                <h4 className={classes.title}>{this.props.title !== '' ? getMessage(this.props.title) : ''}</h4>
                <Alert color="success" message={this.state.success} />
                <Alert message={this.state.error} />
                <form>
                  <GridContainer>
                    {this.props.section === 'newpointsale' ? (
                      <GridItem xs={12} sm={12} md={6}>
                        <Select
                          isClearable
                          options={items.map((item) => {
                            let image = item.photo_url !== '' ? (
                              <div className={classes.userImg}><div><img src={item.photo_url} alt="Item" /></div><span>{item.item_name}</span></div>
                            ) : (
                                <div><span>{item.item_name}</span></div>
                              )

                            return { label: image, value: item.id }
                          })
                          }
                          // options={items.map((item) => { return { label: item.item_name, value: item.id } })}
                          onChange={this.selectChange}
                          placeholder={getMessage('Item Name')}
                          styles={customStyles}
                        />
                      </GridItem>
                    ) : null}
                    {this.renderElement()}
                    <GridItem xs={12} sm={12} md={12} className={classes.note}>
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
                    </GridItem>
                  </GridContainer>
                </form>
              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={this.handleSubmit} disabled={!this.state.enabled}>{getMessage('Send Request')}</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

RequestSection.propTypes = {
  section: PropTypes.string.isRequired,
};

export default connect((state) => ({
  'member': state.profile.member,
  'withdrawals': state.withdrawals,
  'redeems': state.redeems,
  'newpointsale': state.points,
  'items': state.items.items
}), { createWithdrawal, createPointRedeem, createPointSale, getPointItems })(withStyles(styles)(RequestSection));
