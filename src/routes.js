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
import Dashboard from '@material-ui/icons/Dashboard'
import Person from '@material-ui/icons/Person'
import Dehaze from '@material-ui/icons/Dehaze'
import CardMembership from '@material-ui/icons/CardMembership'
import BubbleChart from '@material-ui/icons/BubbleChart'
import LocationOn from '@material-ui/icons/LocationOn'
import Notifications from '@material-ui/icons/Notifications'
import Unarchive from '@material-ui/icons/Unarchive'
import Language from '@material-ui/icons/Language'
// core components/views for Admin layout
import DashboardPage from './pages/Dashboard/Dashboard'
import ServiceType from './pages/ServiceType/ServiceType'
import UserList from './pages/UserList'
import Membership from './pages/Membership'

const dashboardRoutes = [
  // {
  //   path: '/dashboard',
  //   name: 'Dashboard',
  //   icon: Dashboard,
  //   component: DashboardPage,
  //   layout: '/admin',
  // },
  {
    path: '/serviceType',
    name: 'Tipos de Servicio',
    icon: Dehaze,
    component: ServiceType,
    layout: '/admin',
  },
  {
    path: '/users',
    name: 'Usuarios',
    icon: Person,
    component: UserList,
    layout: '/admin',
  },
  {
    path: '/membership',
    name: 'Membresías',
    icon: CardMembership,
    component: Membership,
    layout: '/admin',
  },
  // {
  //   path: '/user',
  //   name: 'User Profile',
  //   icon: Person,
  //   component: UserProfile,
  //   layout: '/admin',
  // },
  // {
  //   path: "/table",
  //   name: "Table List",
  //   rtlName: "قائمة الجدول",
  //   icon: "content_paste",
  //   component: TableList,
  //   layout: "/admin"
  // }
]

export default dashboardRoutes
