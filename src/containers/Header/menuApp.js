export const adminMenu = [
    { //Quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            // {
            //     name: 'menu.admin.crud',
            //     link: '/system/user-manage'
            // },
            {
                name: 'menu.admin.crud-redux',
                link: '/system/user-redux'
            },
            {
                name: 'menu.admin.manage-doctor',
                link: '/system/manage-doctor'
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },

            { //Quản lý kế hoạch khám bệnh của bác sĩ(link là /doctor vì cả doctor và admin đều có thể đăng nhập được)
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule'
            },

            // { //Quản lý lịch hẹn khám
            //     name: 'menu.doctor.manage-appointment',
            //     link: '/system/manage-appointment'
            // },
        ]
    },
    { //Quản lý phòng khám
        name: 'menu.admin.clinic',
        menus: [
            {
                name: 'menu.admin.manage-clinic',
                link: '/system/manage-clinic'
            }
        ]
    },
    { //Quản lý chuyên khoa
        name: 'menu.admin.specialist',
        menus: [
            {
                name: 'menu.admin.manage-specialist',
                link: '/system/manage-specialist'
            }
        ]
    },
    { //Quản lý cẩm nang
        name: 'menu.admin.handbook',
        menus: [
            {
                name: 'menu.admin.manage-handbook',
                link: '/system/manage-handbook'
            }
        ]
    },
];

export const doctorMenu = [
    {    //Bác sĩ quản lý kế hoạch khám bệnh
        name: 'menu.doctor.manage-schedule',
        menus: [
            {
                name: 'menu.doctor.manage-schedule',
                link: '/doctor/manage-schedule'
            },
            { //Bác sĩ quản lý lịch hẹn khám
                name: 'menu.doctor.manage-appointment',
                link: '/system/manage-appointment'
            },
        ]
    }
];