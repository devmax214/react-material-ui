// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import { Group, Person, Payment, Settings, Star, Announcement, LocalOffer, LocalMall } from "@material-ui/icons";
import YenIcon from "components/admin/Sidebar/YenIcon";
// core components/views
import DashboardPage from "views/admin/Dashboard";
import MemberList from "views/admin/MemberList";
import MemberCreate from "views/admin/MemberCreate";
import MemberDetail from "views/admin/MemberDetail";
import SaleList from "views/admin/SaleList";
import SaleCreate from "views/admin/SaleCreate";
import SaleDetail from "views/admin/SaleDetail";
import MemberIncomes from "views/admin/MemberIncomes";
import MemberWithdrawals from "views/admin/MemberWithdrawals";
import MemberPoints from "views/admin/MemberPoints";
// import MemberPointRedeems from "views/admin/MemberPointRedeems";
import MemberSales from "views/admin/MemberSales";
import MemberPointSales from "views/admin/MemberPointSales";
import MemberRefers from "views/admin/MemberRefers";
import WithdrawalList from "views/admin/WithdrawalList";
import WithdrawalDetail from "views/admin/WithdrawalDetail";
import UserList from "views/admin/UserList";
import UserCreate from "views/admin/UserCreate";
import UserDetail from "views/admin/UserDetail";
import IncomeList from "views/admin/IncomeList";
import PointList from "views/admin/PointList";
// import PointRedeemList from "views/admin/PointRedeemList";
// import PointRedeemDetail from "views/admin/PointRedeemDetail";
import PointSales from "views/admin/PointSales";
import PointSaleDetail from "views/admin/PointSaleDetail";
import AnnouncementList from "views/admin/AnnouncementList";
import AnnouncementDetail from "views/admin/AnnouncementDetail";
import AnnouncementCreate from "views/admin/AnnouncementCreate";
import PointItems from "views/admin/PointItems";
import PointItemCreate from "views/admin/PointItemCreate";
import PointItemDetail from "views/admin/PointItemDetail";
import SystemSettings from "views/admin/SystemSettings";

const routes = [
  {
    path: "/admin/dashboard",
    sidebarName: "Dashboard",
    navbarName: "Dashboard",
    icon: Dashboard,
    component: DashboardPage
  },
  {
    path: "/admin/members",
    sidebarName: "Member List",
    navbarName: "Member List",
    icon: Group,
    component: MemberList
  },
  {
    path: "/admin/withdrawals",
    sidebarName: "Withdrawal List",
    navbarName: "Withdrawal List",
    icon: Payment,
    component: WithdrawalList
  },
  {
    path: "/admin/withdrawals/:id",
    component: WithdrawalDetail
  },
  {
    path: "/admin/members/create",
    navbarName: "Create New Member",
    component: MemberCreate
  },
  {
    path: "/admin/members/:id",
    component: MemberDetail
  },
  {
    path: "/admin/members/:id/incomes",
    component: MemberIncomes
  },
  {
    path: "/admin/members/:id/withdrawals",
    component: MemberWithdrawals
  },
  {
    path: "/admin/members/:id/points",
    component: MemberPoints
  },
  {
    path: "/admin/members/:id/refers",
    component: MemberRefers
  },
  {
    path: "/admin/members/:id/pointSales",
    component: MemberPointSales
  },
  // {
  //   path: "/admin/members/:id/redeems",
  //   component: MemberPointRedeems
  // },
  {
    path: "/admin/members/:id/sales",
    component: MemberSales
  },
  {
    path: "/admin/sales",
    sidebarName: "Sale List",
    navbarName: "Sale List",
    icon: LocalOffer,
    component: SaleList
  },
  {
    path: "/admin/sales/create",
    navbarName: "Create New Sale",
    component: SaleCreate
  },
  {
    path: "/admin/sales/:id",
    component: SaleDetail
  },
  {
    path: "/admin/incomes",
    sidebarName: "Income List",
    navbarName: "Income List",
    icon: YenIcon,
    component: IncomeList
  },
  {
    path: "/admin/points",
    sidebarName: "Point List",
    navbarName: "Point List",
    icon: Star,
    component: PointList
  },
  // {
  //   path: "/admin/redeems",
  //   sidebarName: "Point Redeem List",
  //   navbarName: "Point Redeem List",
  //   icon: Star,
  //   component: PointRedeemList
  // },
  // {
  //   path: "/admin/redeems/:id",
  //   component: PointRedeemDetail
  // },
  {
    path: "/admin/pointSales",
    sidebarName: "Point Sales",
    navbarName: "Point Sales",
    icon: LocalMall,
    component: PointSales
  },
  {
    path: "/admin/pointSales/:id",
    component: PointSaleDetail
  },
  {
    path: "/admin/items",
    sidebarName: "Point Items",
    navbarName: "Point Items",
    icon: LocalOffer,
    component: PointItems
  },
  {
    path: "/admin/items/create",
    navbarName: "Create New Point Item",
    component: PointItemCreate
  },
  {
    path: "/admin/items/:id",
    component: PointItemDetail
  },
  {
    path: "/admin/users",
    sidebarName: "User List",
    navbarName: "User List",
    icon: Person,
    component: UserList
  },
  {
    path: "/admin/users/create",
    navbarName: "Create New User",
    component: UserCreate
  },
  {
    path: "/admin/users/:id",
    component: UserDetail
  },
  {
    path: "/admin/announcements",
    sidebarName: "Announcement List",
    navbarName: "Announcement List",
    icon: Announcement,
    component: AnnouncementList
  },
  {
    path: "/admin/announcements/create",
    navbarName: "Create New Announcement",
    component: AnnouncementCreate
  },
  {
    path: "/admin/announcements/:id",
    component: AnnouncementDetail
  },
  {
    path: "/admin/settings",
    sidebarName: "System Settings",
    navbarName: "System Settings",
    icon: Settings,
    component: SystemSettings
  },
  { redirect: true, path: "/admin", to: "/admin/dashboard", navbarName: "Redirect" },
];

export default routes;
