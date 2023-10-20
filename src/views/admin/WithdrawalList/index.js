import { connect } from 'react-redux'
import WithdrawalList from './WithdrawalList.jsx'
import { getWithdrawalList } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'withdrawals': state.withdrawals.withdrawals,
}), { getWithdrawalList, push })(WithdrawalList)