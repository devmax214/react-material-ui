import React from "react";
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import Dialog from '@material-ui/core/Dialog';
import Card from "components/admin/Card/Card.jsx";
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  card: {
    minWidth: 280,
    margin: 0,
    padding: "10px 0 0",
  },
  head: {
    color: "#4c4c4c",
    textTransform: "uppercase",
    fontWeight: "600",
    paddingBottom: 2,
  },
  pos: {
    marginBottom: 10,
    borderBottom: "1px solid #ececec",
    color: "#505050",
    paddingBottom: 2,
  },
  status: {
    fontSize: '12px',
    textTransform: 'uppercase',
  },
  type: {
    fontSize: '12px',
    textTransform: 'uppercase',
  }
});

class RowModal extends React.Component {

  handleClose = () => {
    this.props.onClose()
  };

  render() {
    const { classes, rowData, headData, open } = this.props

    return (
      <Dialog
        onClose={this.handleClose}
        open={open}
      >
        <div>
          <Card className={classes.card}>
            <CardContent>
              {rowData.map((data, key) => {
                let cellData = data !== "" ? data : ""
                return (
                  <div key={key}>
                    <Typography className={classes.head}>
                      {headData[key]} :
                    </Typography>
                    <Typography component="p" className={classes.pos}>
                      {cellData}
                    </Typography>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </Dialog>
    );
  }
}

RowModal.propTypes = {
  classes: PropTypes.object.isRequired,
  rowData: PropTypes.arrayOf(PropTypes.any),
  headData: PropTypes.arrayOf(PropTypes.string),
  onClose: PropTypes.func,
};

export default withStyles(styles)(RowModal);
