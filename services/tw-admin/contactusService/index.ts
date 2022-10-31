import API from '../../../config'

async function getAll(page:number){
    const res = await API.get(`dashboard/contactus`,{params:{page}})
    return res?.data
}

async function getOne(id:number){
    const res = await API.get(`dashboard/contactus/${id}`)
    return res?.data
}

async function getComplaints(){
    const res = await API.get(`dashboard/contactus/complaints`)
    return res?.data
}

async function getEnquies(){
    const res = await API.get(`dashboard/contactus/enquiries`)
    return res?.data
}

async function sendMessageToClient({
    id,
    message
}:{
    id:number,
    message:string
}){
    const res = await API.post(`dashboard/contactus/sent_to_client_by_email/${id}`,{
        message
    })
    return res?.data
}

export const ContactusService = {
    getAll,
    getOne,
    getComplaints,
    getEnquies,
    sendMessageToClient
}