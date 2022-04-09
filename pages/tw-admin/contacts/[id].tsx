import { Alert } from "@/components/Alert/Alert";
import { motion } from "framer-motion";
import { ReactElement, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Cookies from 'js-cookie'
import PropTypes from "prop-types";
import useSWR from "swr";
import Loading from "@/components/Loading";

function Id({ query }): ReactElement {
    //const [postsList, setPostsList] = useState([])
    const { data: postsList }: any = useSWR(`dashboard/contacts/${query.id}`)
    // Return statement.
    return (
        <>
            <div className="timlands-panel">
                <div className="timlands-panel-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">collections_bookmark</span>إدارة الخدمات</h2>
                </div>
                <div className="timlands-table">

                    {!postsList && <Loading />}
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
export async function getServerSideProps({ query }) {
    return { props: { query } }
}
Id.propTypes = {
    query: PropTypes.any,
};
export default Id;
