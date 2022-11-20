import {AdminAPI as API} from '../../../config'

export interface ICategory{
    name_ar: string,
    name_en: string,
    name_fr: string,
    description_ar: string,
    description_en: string,
    description_fr: string,
    icon: string
}

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

async function createOne(category:ICategory) {
    const res = await API.post(`dashboard/new/categories`, category)
    return res?.data
}

async function updateOne({
    id,
    category
}: {
    id: number
    category:ICategory
}) {
    const res = await API.patch(`dashboard/new/categories/${id}`, category)
    return res?.data
}

async function deleteOne(id: number) {
    const res = await API.delete(`dashboard/new/categories/${id}`)
    return res?.data
}

async function createSubCategory({
    id,
    category

}: {
    id: number
    category:ICategory
}) {
    const res = await API.put(`dashboard/new/categories/${id}/subcategories`, category)
    return res?.data
}

async function deleteSubCategory(id:number) {
    const res = await API.delete(`dashboard/new/subcategories/${id}`)
    return res?.data
}

async function updateSubCategory({
    id,
    category

}: {
    id: number
    category:ICategory
}){
    const res = await API.put(`dashboard/new/subcategories/${id}`, category)
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