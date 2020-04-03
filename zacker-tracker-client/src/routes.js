/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Person from "@material-ui/icons/Person";
import Work from "@material-ui/icons/Work";
import More from "@material-ui/icons/More";
// core components/views for home layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import MyProjectsPage from "views/MyProjects/MyProjects.js";
import MyTicketsPage from "views/MyTickets/MyTickets.js";
import CreateProject from "views/CreateProject/CreateProject.js"
// core components/views for RTL layout

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/home"
  },
  {
    path: "/user",
    name: "User Profile",
    icon: Person,
    component: UserProfile,
    layout: "/home"
  },
  {
    path: "/projects",
    name: "My Projects",
    icon: Work,
    component: MyProjectsPage,
    layout: "/home"
  },
  {
    path: "/tickets",
    name: "My Tickets",
    icon: More,
    component: MyTicketsPage,
    layout: "/home"
  }
];

export default dashboardRoutes;
