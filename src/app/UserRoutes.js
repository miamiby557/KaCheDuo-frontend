import Loadable from 'react-loadable';
import Loading from './Loading';

const userRoutes = [
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
    }, {
        path: '/robot',
        title: '帐号管理',
        icon: 'robot',
        component: Loadable({
            loader: () => import('../modules/robot'),
            loading: Loading
        })
    }, {
        path: '/driver',
        title: '司机管理',
        icon: 'team',
        component: Loadable({
            loader: () => import('../modules/driver'),
            loading: Loading
        })
    }, {
        path: '/chuZhi',
        title: '处置情况',
        icon: 'check-square',
        component: Loadable({
            loader: () => import('../modules/chuZhi'),
            loading: Loading
        })
    }, {
        path: '/location',
        title: '位置监控情况',
        icon: 'environment',
        component: Loadable({
            loader: () => import('../modules/location'),
            loading: Loading
        })
    }, {
        path: '/robotLog',
        title: '帐号运行情况',
        icon: 'swap',
        component: Loadable({
            loader: () => import('../modules/robotLog'),
            loading: Loading
        })
    }, {
        path: '/taskRunning',
        title: '当前任务情况',
        icon: 'redo',
        component: Loadable({
            loader: () => import('../modules/robotTaskRunning'),
            loading: Loading
        })
    }, {
        path: '/robotTask',
        title: '历史任务情况',
        icon: 'ordered-list',
        component: Loadable({
            loader: () => import('../modules/robotTask'),
            loading: Loading
        })
    }
];

export default userRoutes;
