import { connect } from 'react-redux'
import MemberPointSales from './MemberPointSales.jsx'
import { getMemberPointSales } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'member': state.members.member,
    'pointSales': state.members.pointSales,
}), { getMemberPointSales, push })(MemberPointSales)