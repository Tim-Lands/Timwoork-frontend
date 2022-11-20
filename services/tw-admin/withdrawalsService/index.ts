import {AdminAPI as API} from '../../../config'
export enum EWithdrawalsStatus {
    PENDING = 0,
    ACCEPTED = 1,
    CANCELED = 2
}

export enum EWithdrawalsType{
    PAYPAL = 0,
    WISE = 1,
    BANK = 2,
    BANK_TRANSFER = 3
}
async function getAll({
    page,
    status,
    type
}: {
    page: number,
    status: EWithdrawalsStatus,
    type: EWithdrawalsType
}) {
    const res = await API.get('dashboard/withdrawals', {
        params: {
            page,
            status,
            type
        }
    })
    return res?.data
}

async function getOne(id: number) {
    console.log(id)
    const res = await API.get(`dashboard/withdrawals/${id}`)
    return res?.data
}

async function accept(id: number) {
    const res = await API.post(`dashboard/withdrawals/${id}/accept`)
    return res?.data
}

async function cancel({id, cause}:{id:number, cause:string}) {
    const res = await API.post(`dashboard/withdrawals/${id}/cancel`,{cause})
    return res?.data
}

export const WithdrawalsService = {
    getAll,
    getOne,
    accept,
    cancel,
    EWithdrawalsStatus
}