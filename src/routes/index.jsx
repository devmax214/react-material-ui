import Admin from "views/admin/Admin.jsx";
import AdminLogin from "views/admin/Login";

import Home from "views/Home.jsx";
import Login from "views/Login";

import { getMessage } from 'utils/helpers';

if (document) {
    document.title = getMessage('Company');
}

const routes = [
    { path: "/admin/login", component: AdminLogin },
    { path: "/admin", component: Admin },
    { path: "/login", name: "Login", component: Login },
    { path: "/", name: "Home", component: Home }
];

export default routes;
