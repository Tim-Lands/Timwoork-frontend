import {AdminAPI as API} from '../../../config'

export enum ELevelTypes {
    BUYER = 0,
    SELLER = 1
}

export interface ILevel{
    name_ar: string,
    name_en: string,
    name_fr: string,
    type: ELevelTypes,
    number_developments: number,
    price_developments: number,
    number_sales: number,
    value_bayer: number
}

async function getAll({
    type
}: {
    type: ELevelTypes
}) {
    const res = await API.get(`dashboard/new/levels_sellers`, { params: { type } })
    return res?.data
}

async function getOne(id: number) {
    const res = await API.get(`dashboard/new/levels_sellers/${id}`)
    return res?.data
}

async function createOne(level:ILevel) {
    const res = await API.post(`dashboard/new/levels_sellers`, level)
    return res?.data
}

async function updateOne({
  id,
  level
}: {
    id: number,
    level: ILevel
}) {
    const res = await API.patch(`dashboard/new/levels_sellers/${id}`, level)
    return res?.data
}

async function deleteOne(id: number) {
    const res = await API.delete(`dashboard/new/levels_sellers/${id}`)
    return res?.data
}

export const LevelsService = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}