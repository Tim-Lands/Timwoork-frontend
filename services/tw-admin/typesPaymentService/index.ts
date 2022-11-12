import {AdminAPI as API} from '../../../config'

export interface ITypePayment{
    name_ar: string,
    name_en: string,
    name_fr: string,
    precent_of_payment: string,
    value_of_cent: string
}

async function getAll() {
    const res = await API.get(`dashboard/types_payments`)
    return res?.data
}

async function getOne(id: number) {
    const res = await API.get(`dashboard/types_payments/${id}`)
    return res?.data
}

async function createOne(typePayment:ITypePayment) {
    const res = await API.post(`dashboard/types_payments`, typePayment)
    return res?.data
}

async function updateOne({
    id,
    typePayment
}:{
    id:number,
    typePayment:ITypePayment
}) {
    const res = await API.patch(`dashboard/types_payments/${id}`,typePayment)
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
