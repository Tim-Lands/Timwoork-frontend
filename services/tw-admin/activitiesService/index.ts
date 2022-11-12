import { AdminAPI as API } from '../../../config'

async function getAllNotifications({ page, search }: { page: number, search: string }) {
    console.log(search)
    const res = await API.get('dashboard/new/activities/notifications', { params: { page, search } })
    return res?.data
}

async function getAllConversations({ page, email }: { page: number, email: string }) {
    const res = await API.get('dashboard/new/activities/conversations', { params: { page, email } })
    return res?.data
}

async function getAllTransactions({page, search}:{page: number, search:string}) {
    const res = await API.get('dashboard/new/activities/transactions', { params: { page, search } })
    return res?.data
}

async function getOneConversation(id: number) {
    const res = await API.get(`dashboard/new/activities/conversations/${id}`)
    return res?.data
}

async function deleteOneConversation(id: number) {
    const res = await API.delete(`dashboard/new/activities/conversations/${id}`)
    return res?.data
}

async function deleteOneMessage(id: number) {
    const res = await API.delete(`dashboard/new/activities/messages/${id}`)
    return res?.data
}

async function updateOneMessage({
    id,
    cause,
    message
}: {
    id: number,
    cause: string,
    message: string
}) {
    const res = await API.patch(`dashboard/new/activities/messages/${id}`, {
        cause,
        message
    })
    return res?.data
}

export const ActivitiesService = {
    getAllNotifications,
    getAllConversations,
    getAllTransactions,
    getOneConversation,
    deleteOneConversation,
    deleteOneMessage,
    updateOneMessage
}