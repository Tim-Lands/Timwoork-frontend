//import Link from "next/link";
import { logout } from "../../../../store/auth/authActions";
import { connect } from "react-redux";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import { Alert } from "@/components/Alert/Alert";
import AddNewSubCategory from "../Modal/AddNewSubCategory";
import axios from "axios";
import { motion } from "framer-motion";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { useRouter } from "next/router";

function Category(): ReactElement {
    const router = useRouter()
    const [GetData, setGetData]: any = useState({})
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const refreshData = async () => {
        setIsLoading(true)
        try {
            const res: any = await axios.get('https://api.wazzfny.com/dashboard/categories/' + router.query.id)
            if (res) {
                setIsLoading(false)
                console.log(res.data.data)

                setGetData(res.data.data)
                setIsError(false)
            }
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
        }
    }
    const deleteHandle = (id) => {
        const MySwal = withReactContent(Swal)

        const swalWithBootstrapButtons = MySwal.mixin({
            customClass: {
                confirmButton: 'btn butt-red butt-sm me-1',
                cancelButton: 'btn butt-green butt-sm'
            },
            buttonsStyling: false
        })

        swalWithBootstrapButtons.fire({
            title: 'هل أنت متأكد؟',
            text: "هل انت متأكد أنك تريد حذف هذا العنصر",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'نعم, أريد الحذف',
            cancelButtonText: 'لا',
            reverseButtons: true
        }).then((result) => {
            if (result.isConfirmed) {
                try {
                    const res: any = axios.post(`https://api.wazzfny.com/dashboard/subcategories/${id}/delete`)
                    //const json = res.data
                    if (res) {
                        refreshData()
                    }
                } catch (error) {
                    setIsError(true)
                    setIsLoading(false)
                }
                swalWithBootstrapButtons.fire(
                    'تم الحذف!',
                    'لقد تم حذف هذا العنصر بنجاح',
                    'success'
                )
                refreshData()
            } else if (
                /* Read more about handling dismissals below */
                result.dismiss === Swal.DismissReason.cancel
            ) {
                swalWithBootstrapButtons.fire(
                    'ملغى',
                    'تم الإلغاء',
                    'error'
                )
            }
        })

    }
    useEffect(() => {
        refreshData()
    }, [])
    const [isModalShowen, setIsModalShowen] = useState(false)
    const setIsModalShowenHandle = () => {
        setIsModalShowen(true);
    }
    const setIsModalHiddenHandle = () => {
        setIsModalShowen(false);
        refreshData()
    }
    const catVariants = {
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.072,
            },
        }),
        hidden: { opacity: 0, y: 9 },
    }
    // Return statement.
    return (
        <>
            {isModalShowen && <AddNewSubCategory CatId={router.query.id} setIsModalHiddenHandle={setIsModalHiddenHandle} />}
            <div className="timlands-panel">
                <div className="timlands-panel-header d-flex align-items-center">
                    <h2 className="title"><span className="material-icons material-icons-outlined">{GetData.icon}</span>{GetData.name_ar}</h2>
                    <div className="header-butt">
                        <button onClick={setIsModalShowenHandle} className="btn butt-sm butt-green d-flex align-items-center"><span className="material-icons material-icons-outlined">add_box</span> إضافة جديد</button>
                    </div>
                </div>
                <div className="timlands-table-filter">
                    <div className="row">
                        <div className="col-sm-4 filter-form">
                            <div className="form-container">
                                <input className="timlands-inputs" placeholder="البحث في الجدول...." name="filterStatus" />
                            </div>
                        </div>
                        <div className="col-sm-2 filter-form">
                            <div className="form-container">
                                <button className="btn butt-md butt-filter butt-primary">فلترة</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="timlands-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th> اسم الصنف</th>
                                <th>الأدوات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {GetData.subcategories ? (GetData.subcategories.map((e, i) => (
                                <motion.tr initial="hidden" variants={catVariants} animate="visible" custom={i} key={e.id}>
                                    <td><p className="with-icon">{e.name_ar}</p></td>
                                    <td className="tools-col">
                                        <button className="table-del success">
                                            <span className="material-icons material-icons-outlined">edit</span>
                                        </button>
                                        <button onClick={() => deleteHandle(e.id)} className="table-del error">
                                            <span className="material-icons material-icons-outlined">delete</span>
                                        </button>
                                    </td>
                                </motion.tr>
                            ))) :
                                <Alert type="error">
                                    <p className="text"><span className="material-icons">warning_amber</span> لاتوجد تصنيفات لعرضها</p>
                                </Alert>
                            }
                        </tbody>
                    </table>
                    {isError &&
                        <Alert type="error">
                            <p className="text"><span className="material-icons">warning_amber</span> حدث خطأ غير متوقع</p>
                        </Alert>}
                    {isLoading &&
                        <motion.div initial={{ opacity: 0, y: 29 }} animate={{ opacity: 1, y: 0 }} className="d-flex py-5 justify-content-center">
                            <div className="spinner-border" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </motion.div>
                    }
                </div>
            </div>
        </>
    );
}

Category.getLayout = function getLayout(page): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
const mapStateToProps = (state: any) => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.registerLoading,
});
export default connect(mapStateToProps, { logout })(Category);
