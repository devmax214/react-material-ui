import { title } from "assets/jss/material-kit-react.jsx";

const workStyle = {
  section: {
    padding: "60px 0 40px",
    "@media (max-width: 600px)": {
      padding: "0"
    }
  },
  title: {
    ...title,
    fontSize: "2rem",
    marginBottom: "50px",
    marginTop: "30px",
    minHeight: "32px",
    textDecoration: "none",
    textAlign: "center",
    "@media (max-width: 600px)": {
      fontSize: "1.8rem",
      marginBottom: "0",
    }
  },
  description: {
    color: "#999",
    textAlign: "center"
  },
  textCenter: {
    textAlign: "center"
  },
  textArea: {
    marginRight: "15px",
    marginLeft: "15px"
  }
};

export default workStyle;
