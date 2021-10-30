import axios from "axios"
import { ReactElement, useEffect, useState } from "react"
import PropTypes from "prop-types";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useRouter } from "next/router";

export default function EditCategory(): ReactElement {
    const router = useRouter()
    const id = router.query.id

    const [isLoading, setIsLoading] = useState(false)
    const refreshData = async () => {
        setIsLoading(true)
        try {
            const res: any = await axios.get(`https://api.wazzfny.com/dashboard/categories/${id}`)
            if (res.data) {
                setIsLoading(false)
                setPerson(res.data.data)
            }
        } catch (error) {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        refreshData()
    }, [])

    const [person, setPerson] = useState({
        name_ar: '',
        name_en: '',
        name_fr: '',
        description_ar: '',
        description_en: '',
        description_fr: '',
    });

    function handlename_arChange(e) {
        setPerson({
            ...person,
            name_ar: e.target.value
        });
    }

    function handlename_enChange(e) {
        setPerson({
            ...person,
            name_en: e.target.value
        });
    }

    function handlename_frChange(e) {
        setPerson({
            ...person,
            name_fr: e.target.value
        });
    }

    function handledescription_arChange(e) {
        setPerson({
            ...person,
            description_ar: e.target.value
        });
    }
    function handledescription_enChange(e) {
        setPerson({
            ...person,
            description_en: e.target.value
        });
    }
    function handledescription_frChange(e) {
        setPerson({
            ...person,
            description_fr: e.target.value
        });
    }
    const saveData = async (e) => {
        e.preventDefault();
        console.log(person);
        try {
            const res = await axios.post(`https://api.wazzfny.com/dashboard/categories/${id}/update`, person);
            // If Activate Network 
            // Authentication was successful.
            if (res.status == 201 || res.status == 200 || res.status == 202 || res.status == 203) {
                //alert('تمت الإضافة بنجاح')
                router.push('/dashboard/cms/categories')
            } else {
                alert('Error')
            }
        } catch (error) {
            alert('Error Network')
        }
    }
    return (
        <>
            <div className="panel-modal-overlay"></div>
            <div className="panel-modal lg modal-add-new">
                <div className="panel-modal-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">add_box</span>إضافة جديد</h2>
                    <div className="panel-modal-left-tools">
                        <button onClick={() => router.push('/dashboard/cms/categories')} className="close-modal">
                            <span className="material-icons material-icons-outlined">close</span>
                        </button>
                    </div>
                </div>
                <form onSubmit={saveData}>
                    {isLoading && 'يرجى الإنتظار...'}
                    <div className={"panel-modal-body auto-height"}>
                        <div className="row">
                            <div className="col-sm-4">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="name_ar">اسم الصنف بالعربي</label>
                                    <input
                                        type="text"
                                        id="name_ar"
                                        name="name_ar"
                                        placeholder="اسم الصنف بالعربي..."
                                        className="timlands-inputs"
                                        autoComplete="off"
                                        value={person.name_ar}
                                        onChange={handlename_arChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="name_en">اسم الصنف بالانجليزي</label>
                                    <input
                                        type="text"
                                        id="name_en"
                                        name="name_en"
                                        placeholder="اسم الصنف بالانجليزي..."
                                        className="timlands-inputs"
                                        autoComplete="off"
                                        value={person.name_en}
                                        onChange={handlename_enChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="name_fr">اسم الصنف بالفرنسي</label>
                                    <input
                                        type="text"
                                        id="name_fr"
                                        name="name_fr"
                                        placeholder="اسم الصنف بالفرنسي..."
                                        className="timlands-inputs"
                                        autoComplete="off"
                                        value={person.name_fr}
                                        onChange={handlename_frChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="description_ar">الوصف بالعربي</label>
                                    <textarea
                                        id="description_ar"
                                        name="description_ar"
                                        placeholder="الوصف بالعربي..."
                                        className="timlands-inputs"
                                        value={person.description_ar}
                                        onChange={handledescription_arChange}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="description_en">الوصف بالإنجليزي</label>
                                    <textarea
                                        id="description_en"
                                        name="description_en"
                                        placeholder="الوصف بالإنجليزي..."
                                        className="timlands-inputs"
                                        value={person.description_en}
                                        onChange={handledescription_enChange}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="description_fr">الوصف بالفرنسي</label>
                                    <textarea
                                        id="description_fr"
                                        name="description_fr"
                                        placeholder="الوصف بالفرنسي..."
                                        className="timlands-inputs"
                                        value={person.description_fr}
                                        onChange={handledescription_frChange}
                                    ></textarea>
                                </div>
                            </div>
                            <div className="col-sm-12">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="icon">أيقونة الصنف</label>
                                    <select
                                        id="icon"
                                        name="icon"
                                        className="timlands-inputs"
                                    >
                                        <option value="bookmark_border">bookmark_border</option>
                                        <option value="description">description</option>
                                        <option value="account_circle">account_circle</option>
                                        <option value="favorite_border">favorite_border</option>
                                        <option value="dashboard">dashboard</option>
                                        <option value="fact_check">fact_check</option>
                                        <option value="question_answer">question_answer</option>
                                        <option value="verified_user">verified_user</option>
                                        <option value="code">code</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-modal-footer">
                        <button onClick={() => router.push('/dashboard/cms/categories')} type="button" className="btn butt-red butt-sm">إغلاق</button>
                        <button type="submit" className="btn butt-primary butt-sm">حفظ التغييرات</button>
                    </div>
                </form>
            </div>
        </>
    )
}
EditCategory.propTypes = {
    setIsModalHiddenHandle: PropTypes.func,
};
EditCategory.getLayout = function getLayout(page): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}