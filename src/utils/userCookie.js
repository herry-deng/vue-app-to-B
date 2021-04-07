// 刷新的时候显示的用户名会没有，因为刷新是回归的初始化。需要使用cookie,来存储用户
// 使用cookie的插件来设置使用cookie
import Cookies from "js-cookie";
/**
 * 
 * @param {Object} info 
 */
export function setCookie(info){  // 设置cookie
    const arr = Object.entries(info);  // 二元数组
    for (let i = 0; i < arr.length; i+= 1){
        Cookies.set(arr[i][0], arr[i][1])
    }
    return true;
}
export function getUserCookie(){  // 获取cookie
    return {
        username: Cookies.get('username'),
        appkey: Cookies.get('appkey'),
        role: Cookies.get('role'),
        email: Cookies.get('email')
    }
}

export function removeUserCookie(){
    Cookies.remove('username'),
    Cookies.remove('appkey');
    Cookies.remove('role');
    Cookies.remove('email');
    return true;
}