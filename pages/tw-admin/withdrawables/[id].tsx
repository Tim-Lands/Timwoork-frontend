import { Alert } from "@/components/Alert/Alert";
import API from '../../../config';
import { ReactElement, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Cookies from 'js-cookie'
import useSWR from "swr";
function Id({ query }) {
    const [isAccept, setIsAccept] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const token = Cookies.get('token_dash')
    const { data: getData }: any = useSWR(`dashboard/withdrawals/${query.id}`)


    const AcceptAmount = async (id: any) => {
        setIsAccept(false)
        try {
            const res: any = await API.post(`dashboard/withdrawals/${id}/accept`, null, {
                headers: { Authorization: `Bearer ${token}` }
            })
            if (res.status === 200) {
                setIsAccept(true)
            }
        } catch (error) {
            setIsAccept(false)
        }
    }
    return (
        <>
            <div className="timlands-panel">
                <div className="timlands-panel-header">
                    <h2 className="title"><span className="material-icons material-icons-outlined">collections_bookmark</span> عرض طرب السحب الواحد</h2>
                </div>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur est repudiandae a similique nulla, eius amet fugiat ex, tempora velit enim eveniet quaerat quisquam fuga. Fugiat consequuntur necessitatibus dolores reiciendis?
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

export default Id;
export async function getServerSideProps({ query }) {
    return { props: {query } }
}