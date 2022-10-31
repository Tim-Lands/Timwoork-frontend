import API from '../../../config'

async function getAll(page:number){
    const res = await API.get(`dashboard/new/orders`,{params:{page}})
    return res?.data
}

async function getOne(id:number){
    const res = await API.get(`dashboard/new/orders/${id}`)
    return res?.data
}

async function getItem(id:number){
    const res = await API.get(`dashboard/new/orders/item/${id}`)
    return res?.data
}

export const OrdersService = {
    getAll,
    getOne,
    getItem
}