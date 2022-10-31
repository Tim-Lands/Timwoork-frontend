import API from '../../../config'

async function getAll(page: number) {
    const res = await API.get(`dashboard/new/badges`, { params: { page } })
    return res?.data
}

async function getOne(id: number) {
    const res = await API.get(`dashboard/new/badges/${id}`)
    return res?.data
}

async function createOne({
    name_ar,
    name_en,
    name_fr,
    precent_deducation
}: {
    name_ar: string,
    name_en: string,
    name_fr: string,
    precent_deducation: number
}) {
    const res = await API.post(`dashboard/new/badges`, {
        name_ar,
        name_en,
        name_fr,
        precent_deducation
    })
    return res?.data
}

async function updateOne({
    id,
    name_ar,
    name_en,
    name_fr,
    precent_deducation
}:{
    id:number,
    name_ar: string,
    name_en: string,
    name_fr: string,
    precent_deducation: number
}) {
    const res = await API.patch(`dashboard/new/badges/${id}`,{
        name_ar,
        name_en,
        name_fr,
        precent_deducation
    })
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