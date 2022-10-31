import API from '../../../config'

async function getAll(page) {
    const res = await API.get(`dashboard/new/countries`, {
        params: {
            page
        }
    })
    return res?.data
}

async function getOne(id: number) {
    const res = await API.get(`dashboard/new/countries/${id}`)
    return res?.data
}

async function createOne({
    name_ar,
    name_en,
    name_fr,
    code_phone
}: {
    name_ar: string,
    name_en: string,
    name_fr: string,
    code_phone: number
}) {
    const res = await API.post(`dashboard/new/countries`, {
        name_ar,
        name_en,
        name_fr,
        code_phone
    })
    return res?.data
}

async function updateOne({
    id,
    name_ar,
    name_en,
    name_fr,
    code_phone
}: {
    id:number
    name_ar: string,
    name_en: string,
    name_fr: string,
    code_phone: number
}){
    const res = await API.patch(`dashboard/new/countries/${id}`, {
        name_ar,
        name_en,
        name_fr,
        code_phone
    })
    return res?.data
}

async function deleteOne(id:number) {
    const res = await API.delete(`dashboard/new/countries/${id}`)
    return res?.data
}


export const CountriesService = {
    getAll,
    getOne,
    createOne,
    updateOne,
    deleteOne
}