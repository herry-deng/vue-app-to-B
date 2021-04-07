// 权限对应路由关系
const roleToRoute = {
    coustomer: [{
        name: 'Product',
    },{
        name: 'ProductList',
    },{
        name: 'ProductAdd',
    },{
        name: 'ProductEdit',
    }],
    admin: [
        {
            name: 'Product',
        },{
            name: 'ProductList',
        },{
            name: 'ProductAdd',
        },
        {
            name: 'Category',
        },
        {
            name: 'ProductEdit'
        }
    ]
}

// 过滤没有权限的路由
export default function getMenuRoute(role,routes){
    const allowRoutesName = roleToRoute[role].map((item) => item.name);
    const resultRoutes = routes.filter((r) =>{
        const obj = r;
        if(allowRoutesName.indexOf(r.name) !== -1) {
            // const children = r.children; // 判断子路由是否有权限
            const {children} = obj; // 判断子路由是否有权限
            obj.children = children.filter((c)=> allowRoutesName.indexOf(c.name) !== -1) // 遍历子路由
            return true;
        }
        return false;
    });
    return resultRoutes;
}  // 角色路由导出