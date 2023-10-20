import { connect } from 'react-redux'
import AnnouncementDetail from './AnnouncementDetail.jsx'
import { getAnnouncement, updateAnnouncement } from 'redux/actions'
import { push } from 'react-router-redux'

export default connect((state) => ({
    'announcements': state.announcements,
}), { getAnnouncement, updateAnnouncement, push })(AnnouncementDetail)