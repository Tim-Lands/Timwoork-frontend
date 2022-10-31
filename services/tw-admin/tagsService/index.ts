import API from '../../../config'

async function getAll(page:number){
    const res = await API.get(`dashboard/new/tags`,{params:{page}})
    return res?.data
}

async function filter({
    page,
    filter
}:{
    page:number,
    filter:string
}){
    const res = await API.get(`dashboard/new/tags`,{
        params:{
            page,
            filter
        }
    })
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
    filter,
    getOne,
    createOne,
    updateOne,
    deleteOne
}