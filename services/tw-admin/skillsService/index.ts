import {AdminAPI as API} from '../../../config'

export interface ISkill{
    name_ar:string,
    name_en:string,
    name_fr:string
}

async function getAll(page:number){
    const res = await API.get(`dashboard/new/skills`, {params:{page}})
    return res?.data
}

async function getOne(id:number){
    const res = await API.get(`dashboard/new/skills/${id}`)
    return res?.data
}

async function createOne(skill: ISkill){
    const res = await API.post(`dashboard/new/skills`, skill)
    return res?.data
}

async function updateOne({
    id,
    skill
}:{
    id:number,
    skill: ISkill
}){
    const res = await API.patch(`dashboard/new/skills/${id}`, skill)
    return res?.data
}

async function deleteOne(id:number){
    const res = await API.delete(`dashboard/new/skills/${id}`)
    return res?.data
}

export const SkillsService = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}