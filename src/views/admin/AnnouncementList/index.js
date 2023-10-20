import { connect } from 'react-redux'
import AnnouncementList from './AnnouncementList.jsx'
import { getAnnouncements, deleteAnnouncement } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'announcements': state.announcements.announcements,
}), { getAnnouncements, deleteAnnouncement, push })(AnnouncementList)