import API from '../../../config'

async function getAll(){
    const res = await API.get(`dashboard/new/languages`)
    return res?.data
}

async function getOne(id:number){
    const res = await API.get(`dashboard/new/languages/${id}`)
    return res?.data
}

async function createOne({
    name_ar,
    name_en,
    name_fr
}:{
    name_ar:string,
    name_en:string,
    name_fr:string
}){
    const res = await API.post(`dashboard/new/languages`,{
        name_ar,
        name_en,
        name_fr
    })
    return res?.data
}

async function updateOne({
    id,
    name_ar,
    name_en,
    name_fr
}:{
    id:number,
    name_ar:string,
    name_en:string,
    name_fr:string
}){
    const res = await API.patch(`dashboard/new/languages/${id}`,{
        name_ar,
        name_en,
        name_fr
    })
    return res?.data
}

async function deleteOne(id:number){
    const res = await API.delete(`dashboard/new/languages/${id}`)
    return res?.data
}

export const LanguagesService = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}