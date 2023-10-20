import { connect } from 'react-redux'
import PointRedeemList from './PointRedeemList'
import { getPointRedeemList } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'redeems': state.redeems.redeems,
}), { getPointRedeemList, push })(PointRedeemList)