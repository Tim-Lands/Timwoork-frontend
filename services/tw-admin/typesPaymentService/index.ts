import API from '../../../config'

async function getAll() {
    const res = await API.get(`dashboard/types_payments`)
    return res?.data
}

async function getOne(id: number) {
    const res = await API.get(`dashboard/types_payments/${id}`)
    return res?.data
}

async function createOne({
    name_ar,
    name_en,
    name_fr,
    percent_of_payment,
    value_of_cent
}: {
    name_ar: string,
    name_en: string,
    name_fr: string,
    percent_of_payment: string,
    value_of_cent: string
}) {
    const res = await API.post(`dashboard/types_payments`, {
        name_ar,
        name_en,
        name_fr,
        percent_of_payment,
        value_of_cent
    })
    return res?.data
}

async function updateOne({
    id,
    name_ar,
    name_en,
    name_fr,
    percent_of_payment,
    value_of_cent
}:{
    id:number,
    name_ar: string,
    name_en: string,
    name_fr: string,
    percent_of_payment: string,
    value_of_cent: string
}) {
    const res = await API.patch(`dashboard/types_payments/${id}`,{
        name_ar,
        name_en,
        name_fr,
        percent_of_payment,
        value_of_cent
    })
    return res?.data
}

async function deleteOne(id:number) {
    const res = await API.delete(`dashboard/types_payments/${id}`)
    return res?.data
}

async function activateOne(id:number) {
    const res = await API.post(`dashboard/types_payments/${id}/active_payment`)
    return res?.data
}

async function disactiveOne(id:number) {
    const res = await API.post(`dashboard/types_payments/${id}/disactive_payment`)
    return res?.data
}

export const TypesPaymentService = {
    getAll,
    getOne,
    deleteOne,
    updateOne,
    activateOne,
    disactiveOne,
    createOne
}
