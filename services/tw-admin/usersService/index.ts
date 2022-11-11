import {AdminAPI as API} from "../../../config";

async function getAll({
    page = 1,
    search = "",
    is_banned,
    is_banned_temporrary,
    is_banned_permanent
}:{
    page: number,
    search: string,
    is_banned?: boolean,
    is_banned_temporrary?:boolean,
    is_banned_permanent?:boolean

}){
    let prefix = ""
    if (is_banned && is_banned_temporrary)
        prefix = '?ban_tamporary'

    else if (is_banned && is_banned_permanent)
        prefix = '?ban_permanent'

    const res = await API.get(`dashboard/new/users${prefix}`,{
        params:{
            page,
            like:[`username,${search}`,`email,${search}`],
            is_banned: is_banned ? Number(is_banned) : undefined
        }
    })
    return res?.data
}

async function getOne(id:number){
    const res = await API.get(`dashboard/new/users/${id}`)
    return res?.data
}

async function  sendNotification({
        cause,
         id
}:{
        cause:string,
        id:number
}){
    const res = await API.put(`dashboard/new/users/${id}/notifications`,{cause})
    return res?.data
}

async function ban({
    id,
    comment,
    expired_at
}:{
    id:number,
    comment:string,
    expired_at:string
}){
    const res = await API.post(`dashboard/new/users/${id}/ban`,{
        comment,
        expired_at
    })
    return res?.data
}

async function unban(id:number){
    const res = await API.post(`dashboard/new/users/${id}/unban`)
    return res?.data
}

export const UsersService = {
    getAll,
    getOne,
    sendNotification,
    ban,
    unban
}
