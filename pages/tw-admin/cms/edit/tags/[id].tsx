import API from '../../../../../config';
import { ReactElement, useEffect, useState } from "react"
import PropTypes from "prop-types";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { useRouter } from "next/router";

export default function Id(): ReactElement {
    const router = useRouter()
    const id = router.query.id

    const [isLoading, setIsLoading] = useState(false)
    const refreshData = async () => {
        setIsLoading(true)
        try {
            const res: any = await API.get(`dashboard/tags/${id}`)
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
    }, [id])

    const [person, setPerson] = useState({
        name_ar: '',
        name_en: '',
        name_fr: '',
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
    const saveData = async (e) => {
        e.preventDefault();
        console.log(person);
        setIsLoading(true)
        try {
            setIsLoading(false)
            const res = await API.post(`dashboard/tags/${id}/update`, person);
            // If Activate Network 
            // Authentication was successful.
            if (res.status == 201 || res.status == 200 || res.status == 202 || res.status == 203) {
                //alert('تمت الإضافة بنجاح')
                router.push('/tw-admin/cms/tags')
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
                    <h2 className="title"><span className="material-icons material-icons-outlined">edit</span>التعديل</h2>
                    <div className="panel-modal-left-tools">
                        <button onClick={() => router.push('/tw-admin/cms/tags')} className="close-modal">
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
                                    <label className="label-block" htmlFor="name_ar">اسم الوسم بالعربي</label>
                                    <input
                                        type="text"
                                        id="name_ar"
                                        name="name_ar"
                                        placeholder="اسم الوسم بالعربي..."
                                        className="timlands-inputs"
                                        autoComplete="off"
                                        value={person.name_ar}
                                        onChange={handlename_arChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="name_en">اسم الوسم بالانجليزي</label>
                                    <input
                                        type="text"
                                        id="name_en"
                                        name="name_en"
                                        placeholder="اسم الوسم بالانجليزي..."
                                        className="timlands-inputs"
                                        autoComplete="off"
                                        value={person.name_en}
                                        onChange={handlename_enChange}
                                    />
                                </div>
                            </div>
                            <div className="col-sm-4">
                                <div className="timlands-form">
                                    <label className="label-block" htmlFor="name_fr">اسم الوسم بالفرنسي</label>
                                    <input
                                        type="text"
                                        id="name_fr"
                                        name="name_fr"
                                        placeholder="اسم الوسم بالفرنسي..."
                                        className="timlands-inputs"
                                        autoComplete="off"
                                        value={person.name_fr}
                                        onChange={handlename_frChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-modal-footer">
                        <button onClick={() => router.push('/tw-admin/cms/tags')} type="button" className="btn butt-red butt-sm">إغلاق</button>
                        <button type="submit" className="btn butt-primary butt-sm">حفظ التغييرات</button>
                    </div>
                </form>
            </div>
        </>
    )
}
Id.propTypes = {
    setIsModalHiddenHandle: PropTypes.func,
};
Id.getLayout = function getLayout(page): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}