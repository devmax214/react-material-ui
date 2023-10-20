import { connect } from 'react-redux'
import MemberRegister from './MemberRegister.jsx'
import { registerMember, getMembers } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'members': state.members,
}), { registerMember, getMembers, push })(MemberRegister)