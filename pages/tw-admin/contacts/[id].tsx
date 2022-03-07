import { Alert } from "@/components/Alert/Alert";
import API from '../../../config';
import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Cookies from 'js-cookie'
import PropTypes from "prop-types";

function Id({ query }): ReactElement {
    const [postsList, setPostsList] = useState([])
    const [isError, setIsError] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    
    const token = Cookies.get('token_dash')

    const refreshData = async () => {
        setIsLoading(true)
        try {
            const res: any = await API.get(`dashboard/contacts/${query.id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res) {
                setIsLoading(false)
                setPostsList(res.data.data)

                setIsError(false)
            }
        } catch (error) {
            setIsError(true)
            setIsLoading(false)
        }
    }
    useEffect(() => {
        refreshData()
        console.log(postsList);
        
    }, [])
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
            <div className="timlands-panel">
                <div className="timlands-panel-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">collections_bookmark</span>إدارة الخدمات</h2>
                </div>
                <div className="timlands-table">

                    {isError &&
                        <Alert type="error">
                            <p className="text"><span className="material-icons">warning_amber</span> حدث خطأ غير متوقع</p>
                        </Alert>}
                    {isLoading &&
                        <motion.div initial={{ opacity: 0, y: 29 }} animate={{ opacity: 1, y: 0 }} className="d-flex py-5 spinner-loader justify-content-center">
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
Id.getLayout = function getLayout(page: any): ReactElement {
    return (
        <DashboardLayout>
            {page}
        </DashboardLayout>
    )
}
Id.propTypes = {
    query: PropTypes.any,
};
export default Id;
