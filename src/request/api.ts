import service from ".";
interface loginData{
    name:string,
    password:string
}
// 管理员登录接口
export function login(data:loginData){
    return service({
        url:"/admin/login",
        method:"post",
        data
    })
}
// 帖子列表分页接口
export function getPostPage(params:{
    current:number,
    size:number
}){
    return service({
        url:"/post/list",
        method:"get",
        params
    })
}
// 帖子查询分页接口
export function searchPostPage(params:{
    keyword:any,
    current:number,
    size:number
    }){
    return service({
        url:"/post/search",
        method:"get",
        params
    })
}
// 帖子新增接口
export function addPost(data:any){
    return service({
        url:"/post",
        method:"post",
        data
    })
}
// 帖子更新接口
export function updatePost(data:any){
    return service({
        url:"/post",
        method:"put",
        data
    })
}
// 帖子删除接口
export function deletePost(params:{
    id:number
}){
    return service({
        url:"/post",
        method:"delete",
        params
    })
}

export function searchUserPage(params:{
    keyword:any,
    current:number,
    size:number
    }){
    return service({
        url:"/user/search",
        method:"get",
        params
    })
}

export function getUserPage(params:{
    current:number,
    size:number
}){
    return service({
        url:"/user/list",
        method:"get",
        params
    })
}

export function updateUser(data:any){
    return service({
        url:"/user",
        method:"put",
        data
    })
}

export function addUser(data:any){
    return service({
        url:"/user",
        method:"post",
        data
    })
}

export function deleteUser(params:{
    id:number
}){
    return service({
        url:"/user",
        method:"delete",
        params
    })
}

// 用户列表接口
export function getUserList(){
    return service({
        url:"/user/list",
        method:"get"
    })
}
// 角色列表接口
export function getRoleList(){
    return service({
        url:"/getRoleList",
        method:"get"
    })
}
// 权限列表接口
export function getAuthorityList(){
    return service({
        url:"/getAuthorityList",
        method:"get"
    })
}