import {AdminAPI as  API} from '../../../config'

export interface IBadge{
    name_ar: string,
    name_en: string,
    name_fr: string,
    precent_deducation: number
}
async function getAll() {
    const res = await API.get(`dashboard/new/badges`)
    return res?.data
}

async function getOne(id: number) {
    const res = await API.get(`dashboard/new/badges/${id}`)
    return res?.data
}

async function createOne(badge: IBadge) {
    const res = await API.post(`dashboard/new/badges`, badge)
    return res?.data
}

async function updateOne({
    id,
    badge
}:{
    id:number,
    badge:IBadge
}) {
    const res = await API.patch(`dashboard/new/badges/${id}`,badge)
    return res?.data
}

async function deleteOne(id:number) {
    const res = await API.delete(`dashboard/new/badges/${id}`)
    return res?.data
}

export const BadgesService = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}