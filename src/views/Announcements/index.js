import { connect } from 'react-redux'
import Announcements from './Announcements.jsx'
import { getAnnouncements, getProfile, updateAnnouncementStatus } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'profile': state.profile,
    'announcements': state.announcements,
}), { push, getAnnouncements, getProfile, updateAnnouncementStatus })(Announcements)
