import { connect } from 'react-redux'
import WithdrawalDetail from './WithdrawalDetail.jsx'
import { getWithdrawal, processWithdrawal } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'withdrawals': state.withdrawals,
}), { getWithdrawal, processWithdrawal, push })(WithdrawalDetail)