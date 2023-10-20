import { connect } from 'react-redux'
import MemberRefers from './MemberRefers.jsx'
import { getMemberRefers } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'refers': state.members.refers,
    'member': state.members.member,
}), { getMemberRefers, push })(MemberRefers)