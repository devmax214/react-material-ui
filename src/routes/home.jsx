import LandingPage from "views/LandingPage";
import Profile from "views/Profile";
import Announcements from "views/Announcements";

const routes = [
  { path: "/profile", name: "Profile", component: Profile },
  { path: "/announcements", name: "Announcements", component: Announcements },
  { path: "/", name: "LandingPage", component: LandingPage },
];

export default routes;
