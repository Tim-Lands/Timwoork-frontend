import API from '../../../config'
enum EWithdrawalsStatus {
    PENDING = 0,
    ACCEPTED = 1
}
async function getAll({
    page,
    type
}: {
    page: number,
    type: EWithdrawalsStatus
}) {
    const res = await API.get('dashboard/withdrawals', {
        params: {
            page,
            type
        }
    })
    return res?.data
}

async function getOne(id: number) {
    const res = await API.get(`dashboard/withdrawals/${id}`)
    return res?.data
}

async function accept(id: number) {
    const res = await API.post(`dashboard/withdrawals/${id}/accept`)
    return res?.data
}

async function cancel(id: number) {
    const res = await API.post(`dashboard/withdrawals/${id}/cancel`)
    return res?.data
}

export const WithdrawalsService = {
    getAll,
    getOne,
    accept,
    cancel,
    EWithdrawalsStatus
}