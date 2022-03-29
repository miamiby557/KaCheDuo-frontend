import Loadable from 'react-loadable';
import Loading from './Loading';

const adminRoutes = [
    {
        path: '/',
        component: Loadable({
            loader: () => import('../modules/home'),
            loading: Loading
        }),
        exact: true,
        title: '首页',
        icon: 'home',
        hideBreadcrumb: true
    }, {
        title: '个人中心',
        path: '/profile',
        component: Loadable({
            loader: () => import('../modules/profile'),
            loading: Loading
        }),
        hideOnMenu: true
    },{
        path: '/system',
        title: '系统管理',
        icon: 'setting',
        children:[
            {
                path: '/user',
                title: '系统用户',
                icon: 'unordered-list',
                component: Loadable({
                    loader: () => import('../modules/user'),
                    loading: Loading
                })
            }
        ]
    }
];

export default adminRoutes;
