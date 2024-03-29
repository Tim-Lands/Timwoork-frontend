import {AdminAPI as API} from '../../../config'

async function getAll({page, name}:{page:number, name:string}){
    const res = await API.get(`dashboard/new/tags`,{params:{page, name}})
    return res?.data
}


async function getOne(id:number){
    const res = await API.get(`dashboard/new/tags/${id}`)
    return res?.data
}

async function createOne(name:string){
    const res = await API.post(`dashboard/new/tags`,{
        name
    })
    return res?.data
}

async function updateOne({
    id,
    name
}:{
    id:number,
    name:string
}){
    const res = await API.patch(`dashboard/new/tags/${id}`,{
        name
    })
    return res?.data
}

async function deleteOne(id:number){
    const res = await API.delete(`dashboard/new/tags/${id}`)
    return res?.data
}

export const TagsService = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}