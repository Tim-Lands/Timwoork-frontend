import API from '../../../config'

export enum ELevelTypes {
    BUYER = 0,
    SELLER = 1
}

async function getAll({
    page,
    type
}: {
    page: number,
    type: ELevelTypes
}) {
    const res = await API.get(`dashboard/new/levels_sellers`, { params: { page, type } })
    return res?.data
}

async function getOne(id: number) {
    const res = await API.get(`dashboard/new/levels_sellers/${id}`)
    return res?.data
}

async function createOne({
    name_ar,
    name_en,
    name_fr,
    type,
    number_developments,
    price_developments,
    number_sales,
    value_bayer
}: {
    name_ar: string,
    name_en: string,
    name_fr: string,
    type: ELevelTypes,
    number_developments: number,
    price_developments: number,
    number_sales: number,
    value_bayer: number
}) {
    const res = await API.post(`dashboard/new/levels_sellers`, {
        name_ar,
        name_en,
        name_fr,
        type,
        number_developments,
        price_developments,
        number_sales,
        value_bayer
    })
    return res?.data
}

async function updateOne({
    id,
    name_ar,
    name_en,
    name_fr,
    type,
    number_developments,
    price_developments,
    number_sales,
    value_bayer
}: {
    id: number,
    name_ar: string,
    name_en: string,
    name_fr: string,
    type: ELevelTypes,
    number_developments: number,
    price_developments: number,
    number_sales: number,
    value_bayer: number
}) {
    const res = await API.patch(`dashboard/new/levels_sellers/${id}`, {
        name_ar,
        name_en,
        name_fr,
        type,
        number_developments,
        price_developments,
        number_sales,
        value_bayer
    })
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