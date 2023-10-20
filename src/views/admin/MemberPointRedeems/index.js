import { connect } from 'react-redux'
import MemberPointRedeems from './MemberPointRedeems.jsx'
import { getMemberPointRedeems } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'redeems': state.members.redeems,
    'member': state.members.member,
}), { getMemberPointRedeems, push })(MemberPointRedeems)