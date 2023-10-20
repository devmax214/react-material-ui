import { container, title } from "assets/jss/material-kit-react.jsx";
import imgLeft from "assets/img/left.jpg";
import imgRight from "assets/img/right.jpg";

import imgTabRecommends from "assets/img/tab_recommends.jpg";
import imgTabPointSales from "assets/img/tab_point_sales.jpg";
import imgTabPoints from "assets/img/tab_points.jpg";
import imgTabWithdrawals from "assets/img/tab_withdrawals.jpg";
import imgTabIncomes from "assets/img/tab_incomes.jpg";
// Mobile Images
import mobileImgTabRecommends from "assets/img/recommendTab.jpg";
import mobileImgTabPointSales from "assets/img/pointTab.jpg";
import mobileImgTabPoints from "assets/img/pointHistoryTab.jpg";
import mobileImgTabWithdrawals from "assets/img/withdrawTab.jpg";
import mobileImgTabIncomes from "assets/img/profitHistoryTab.jpg";

const landingPageStyle = {
  container: {
    ...container,
    paddingTop: "20px",
    zIndex: "12",
    color: "#FFFFFF",
    "@media (min-width: 576px)": {
      maxWidth: "initial"
    },
    "@media (min-width: 768px)": {
      maxWidth: "initial"
    },
  },
  title: {
    ...title,
    fontSize: "2.875rem",
    display: "inline-block",
    position: "relative",
    marginTop: "30px",
    minHeight: "32px",
    color: "#FFFFFF",
    textDecoration: "none"
  },
  subtitle: {
    fontSize: "1.313rem",
    maxWidth: "500px",
    margin: "10px auto 0"
  },
  flex: {
    flex: 1,
    '& span': {
      paddingRight: '10px'
    }
  },
  icon: {
    width: "20px",
    height: "20px",
    marginRight: "4px",
    display: "inline-block",
    verticalAlign: "middle"
  },
  iconSmall: {
    width: "16px",
    height: "16px",
    marginRight: "3px",
    display: "inline-block",
    verticalAlign: "middle"
  },
  main: {
    background: "#FFFFFF",
    position: "relative",
    zIndex: "3"
  },
  mainRaised: {
    margin: "-60px 30px 0px",
    borderRadius: "6px",
    boxShadow:
      "0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
    "@media (max-width: 767px)": {
      margin: "-60px 10px 0px",
    },
    "&:before": {
      display: 'block',
      content: '""',
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      width: 300,
      backgroundImage: "url(" + imgLeft + ")",
      backgroundSize: "cover",
      backgroundPosition: "left bottom",
      zIndex: -1
    },
    "&:after": {
      position: 'absolute',
      display: 'block',
      content: '""',
      top: 0,
      right: 0,
      bottom: 0,
      width: 300,
      backgroundImage: "url(" + imgRight + ")",
      backgroundSize: "cover",
      backgroundPosition: "right bottom",
      zIndex: -1
    }
  },
  content: {
    backgroundColor: '#FFFFFF'
  },
  tabs_0: {
    backgroundImage: "url(" + imgTabIncomes + ")",
    marginLeft: 0,
    '@media (max-width: 520px)': {
      backgroundImage: "url(" + mobileImgTabIncomes + ")",
    },
  },
  tabs_1: {
    backgroundImage: "url(" + imgTabPoints + ")",
    marginLeft: 20,
    '@media (max-width: 520px)': {
      backgroundImage: "url(" + mobileImgTabPoints + ")",
      marginLeft: "10px",
    },
  },
  tabs_2: {
    backgroundImage: "url(" + imgTabRecommends + ")",
    marginLeft: 20,
    '@media (max-width: 520px)': {
      backgroundImage: "url(" + mobileImgTabRecommends + ")",
      marginLeft: "10px",
    },
  },
  tabs_3: {
    backgroundImage: "url(" + imgTabWithdrawals + ")",
    marginLeft: 20,
    '@media (max-width: 520px)': {
      backgroundImage: "url(" + mobileImgTabWithdrawals + ")",
      marginLeft: "10px",
    },
  },
  tabs_4: {
    backgroundImage: "url(" + imgTabPointSales + ")",
    marginLeft: 20,
    '@media (max-width: 520px)': {
      backgroundImage: "url(" + mobileImgTabPointSales + ")",
      marginLeft: "10px",
    },
  }
};

export default landingPageStyle;
