import Person from '@material-ui/icons/Person';
import Dehaze from '@material-ui/icons/Dehaze';
import RecentActors from '@material-ui/icons/RecentActors';
import CardMembership from '@material-ui/icons/CardMembership';
import ServiceType from './pages/ServiceType';
import UserList from './pages/UserList';
import Membership from './pages/Membership';
import IdentityVerification from './pages/IdentityVerification';

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
    // {
    //   path: '/membership',
    //   name: 'Membresías',
    //   icon: CardMembership,
    //   component: Membership,
    //   layout: '/admin',
    // },
    {
        path: '/pendingVerifications',
        name: 'Verificaciones pendientes',
        icon: RecentActors,
        component: IdentityVerification,
        layout: '/admin',
    },
];

export default dashboardRoutes;
