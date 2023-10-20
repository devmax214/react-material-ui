import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Error from "@material-ui/icons/Error";
// core components
import Snackbar from "components/admin/Snackbar/Snackbar.jsx";

const styles = {
    icon: {
        fontSize: 20,
        marginRight: 10,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
};

class Alert extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            show: false,
        }
    }

    componentWillReceiveProps(nextProps) {
        const { message } = nextProps

        if (message !== this.props.message) {
            this.setState({ show: true })
        }
    }

    render() {
        const { classes, message, color } = this.props;

        return (
            <Snackbar
                place="bl"
                color={color ? color : "danger"}
                autoHideDuration={5000}
                close
                open={message !== '' && this.state.show}
                closeNotification={() => this.setState({ show: false })}
                message={
                    <span className={classes.message}>
                        <Error className={classes.icon} />
                        {message}
                    </span>
                }
            />
        );
    }
}

export default withStyles(styles)(Alert);
