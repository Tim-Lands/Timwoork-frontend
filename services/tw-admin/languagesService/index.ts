import {AdminAPI as API} from '../../../config'

export interface ILanguage {
    name_ar:string,
    name_en:string,
    name_fr:string
}

async function getAll(){
    const res = await API.get(`dashboard/new/languages`)
    return res?.data
}

async function getOne(id:number){
    const res = await API.get(`dashboard/new/languages/${id}`)
    return res?.data
}

async function createOne(language: ILanguage){
    const res = await API.post(`dashboard/new/languages`, language)
    return res?.data
}

async function updateOne({
    id,
    language
}:{
    id:number,
    language: ILanguage
}){
    const res = await API.patch(`dashboard/new/languages/${id}`,language)
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