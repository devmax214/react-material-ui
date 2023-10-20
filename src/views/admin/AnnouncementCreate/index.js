import { connect } from 'react-redux'
import AnnouncementCreate from './AnnouncementCreate.jsx'
import { createAnnouncement } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'announcements': state.announcements,
}), { createAnnouncement, push })(AnnouncementCreate)