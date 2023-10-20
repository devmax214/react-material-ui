import { connect } from 'react-redux'
import SystemSettings from './SystemSettings.jsx'
import { getSettings, updateSettings, deleteSetting, createSetting } from 'redux/actions'

export default connect((state) => ({
    'settings': state.settings,
}), { getSettings, updateSettings, deleteSetting, createSetting })(SystemSettings)