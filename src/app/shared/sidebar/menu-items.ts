import { RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    {
        path: '/pedidos',
        title: 'Pedido',
        icon: 'mdi mdi-folder',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/usuarios',
        title: 'Usuário',
        icon: 'mdi mdi-contacts',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/clientes',
        title: 'Cliente',
        icon: 'mdi mdi-eye-outline',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/pedidos/relatorioesquadriascliente',
        title: 'Relatório do Andamento de Pedido',
        icon: 'mdi mdi-content-paste',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    },
    {
        path: '/pedidos/relatorioclientes',
        title: 'Pedidos com produção em andamento',
        icon: 'mdi mdi-gauge',
        class: '',
        label: '',
        labelClass: '',
        extralink: false,
        submenu: []
    }
];
