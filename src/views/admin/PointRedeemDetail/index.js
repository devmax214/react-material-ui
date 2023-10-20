import { connect } from 'react-redux'
import PointRedeemDetail from './PointRedeemDetail.jsx'
import { getPointRedeem, processPointRedeem } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'redeem': state.redeems,
}), { getPointRedeem, processPointRedeem, push })(PointRedeemDetail)