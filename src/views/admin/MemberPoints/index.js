import { connect } from 'react-redux'
import MemberPoints from './MemberPoints.jsx'
import { getMemberPoints } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'points': state.members.points,
    'member': state.members.member,
}), { getMemberPoints, push })(MemberPoints)