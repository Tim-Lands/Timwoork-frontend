import {AdminAPI as API} from '../../../config'

export interface ICountry{
    name_ar: string,
    name_en: string,
    name_fr: string,
    code_phone: number
}

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

async function createOne(country: ICountry) {
    const res = await API.post(`dashboard/new/countries`, country)
    return res?.data
}

async function updateOne({
    id,
    country
}: {
    id:number
    country: ICountry
}){
    const res = await API.patch(`dashboard/new/countries/${id}`, country)
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