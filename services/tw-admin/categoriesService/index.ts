import API from '../../../config'

async function getAll() {
    const res = await API.get(`dashboard/new/categories`)
    return res?.data
}

async function getOne(id: number) {
    const res = await API.get(`dashboard/new/categories/${id}`)
    return res?.data
}

async function getOneSubCategory(id: number) {
    const res = await API.get(`dashboard/new/subcategories/${id}`)
    return res?.data
}

async function createOne({
    name_ar,
    name_en,
    name_fr,
    description_ar,
    description_en,
    description_fr,
    icon
}: {
    name_ar: string,
    name_en: string,
    name_fr: string,
    description_ar: string,
    description_en: string,
    description_fr: string,
    icon: string
}) {
    const res = await API.post(`dashboard/new/categories`, {
        name_ar,
        name_en,
        name_fr,
        description_ar,
        description_en,
        description_fr,
        icon
    })
    return res?.data
}

async function updateOne({
    id,
    name_ar,
    name_en,
    name_fr,
    description_ar,
    description_en,
    description_fr,
    icon
}: {
    id: number
    name_ar: string,
    name_en: string,
    name_fr: string,
    description_ar: string,
    description_en: string,
    description_fr: string,
    icon: string
}) {
    const res = await API.patch(`dashboard/new/categories/${id}`, {
        name_ar,
        name_en,
        name_fr,
        description_ar,
        description_en,
        description_fr,
        icon
    })
    return res?.data
}

async function deleteOne(id: number) {
    const res = await API.delete(`dashboard/new/categories/${id}`)
    return res?.data
}

async function createSubCategory({
    id,
    name_ar,
    name_en,
    name_fr,
    description_ar,
    description_en,
    description_fr,
    icon

}: {
    id: number
    name_ar: string,
    name_en: string,
    name_fr: string,
    description_ar: string,
    description_en: string,
    description_fr: string,
    icon: string
}) {
    const res = await API.put(`dashboard/new/categories/${id}/subcategories`, {
        name_ar,
        name_en,
        name_fr,
        description_ar,
        description_en,
        description_fr,
        icon

    })
    return res?.data
}

async function deleteSubCategory(id:number) {
    const res = await API.delete(`dashboard/new/subcategories/${id}`)
    return res?.data
}

async function updateSubCategory({
    id,
    name_ar,
    name_en,
    name_fr,
    description_ar,
    description_en,
    description_fr,
    icon

}: {
    id: number
    name_ar: string,
    name_en: string,
    name_fr: string,
    description_ar: string,
    description_en: string,
    description_fr: string,
    icon: string
}){
    const res = await API.put(`dashboard/new/subcategories/${id}`, {
        name_ar,
        name_en,
        name_fr,
        description_ar,
        description_en,
        description_fr,
        icon

    })
    return res?.data
}

export const CategoriesService ={
    getAll,
    getOne,
    getOneSubCategory,
    createOne,
    createSubCategory,
    updateOne,
    updateSubCategory,
    deleteOne,
    deleteSubCategory
}