import {AdminAPI as API} from '../../../config'
export enum EProductStatus {
    PENDING = 2,
    ACTIVE = 1,
    REJECTED = 0
}
async function getAll({
    page = 1,
    status,
    search = "",

}: {
    page: number,
    search?: string,
    status?: EProductStatus
}) {
    const res = await API.get('dashboard/new/products', {
        params: {
            page,
            like: `title,${search}`,
            status
        }
    })
    return res?.data
}

async function getArchieved({ page, search = "" }: { page: number, search?: string }) {
    const res = await API.get('dashboard/new/products/archieved', {
        params: {
            page,
            like: `title,${search}`
        }
    })
    return res?.data
}

async function getOne(id: number|string) {
    const res = await API.get(`dashboard/new/products/${id}`)
    return res?.data
}

async function activateProduct(id: number) {
    const res = await API.post(`dashboard/new/products/${id}/activeProduct`)
    return res?.data
}

async function rejectProduct({
    id,
    cause
}: {
    id: number,
    cause: string
}) {
    const res = await API.post(`dashboard/new/products/${id}/rejectProduct`, {
        cause
    })
    return res?.data
}

async function disactiveProduct({
    id,
    cause
}: {
    id: number,
    cause: string
}) {
    const res = await API.post(`dashboard/new/products/${id}/disactiveProduct`, {
        cause
    })
    return res?.data
}

async function archieveProduct(id: number) {
    const res = await API.put(`dashboard/new/products/${id}/is_archieved`, {
        is_archieved: 1
    })
    return res?.data
}

async function unarchieveProduct(id: number) {
    const res = await API.put(`dashboard/new/products/${id}/is_archieved`, {
        is_archieved: 0
    })
    return res?.data
}

async function deleteProduct(id: number) {
    const res = await API.delete(`dashboard/new/products/${id}`)
    return res?.data
}

async function editProductStepOne({
    id,
    title,
    subcategory,
    title_ar,
    title_en,
    title_fr
}: {
    id: number,
    title: string,
    subcategory: number,
    title_ar?: string,
    title_en?: string,
    title_fr?: string
}) {
    const res = await API.post(`dashboard/new/products/${id}/step_one`, {
        title,
        subcategory,
        title_ar,
        title_en,
        title_fr
    })
    return res?.data
}

async function editProductStepTwo({
    id,
    price,
    duration
}: {
    id: number,
    price: number,
    duration: number
}) {
    const res = await API.post(`dashboard/new/products/${id}/step_two`, {
        price,
        duration
    })
    return res?.data
}

async function editProductStepThree({
    id,
    buyer_instruct,
    content
}: {
    id: number,
    buyer_instruct: string,
    content: string
}) {
    const res = await API.post(`dashboard/new/products/${id}/step_three`, {
        buyer_instruct,
        content
    })
    return res?.data
}

async function editProductStepFour({
    id,
    url_video
}: {
    id: number,
    url_video: number
}) {
    const res = await API.post(`dashboard/new/products/${id}/step_four`, {
        url_video
    })
    return res?.data
}

async function editThumbnail({
    id,
    form_data
}: {
    id: number,
    form_data: FormData
}) {
    const res = await API.post(`dashboard/new/products/${id}/upload_thumbnail`, form_data)
    return res?.data
}

async function editGallary({
    id,
    form_data
}: {
    id: number,
    form_data: FormData
}) {
    const res = await API.post(`dashboard/new/products/${id}/upload/gallary`, form_data)
    return res?.data
}

async function deleteGallary({
    id,
    gallary_id
}: {
    id: number,
    gallary_id: number
}) {
    const res = await API.delete(`dashboard/new/products/${id}/galaries`, {
        data: {
            id: gallary_id
        }
    })
    return res?.data
}

export const ProductsService = {
    getAll,
    getArchieved,
    getOne,
    activateProduct,
    rejectProduct,
    disactiveProduct,
    editProductStepOne,
    editProductStepTwo,
    editProductStepThree,
    editProductStepFour,
    editGallary,
    editThumbnail,
    deleteGallary,
    deleteProduct,
    archieveProduct,
    unarchieveProduct
}


