import { ReactElement, useState, useEffect, useRef } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import Image from "next/image";
import Link from "next/link";
import API from '../../../config'
import Cookies from "js-cookie";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";


const Amount = ({ transfer }: any) => {

    switch (transfer.status) {
        case 0:
            return <span style={{ fontSize: 13 }} className="badge bg-danger">-{transfer.payload.price_with_tax}</span>
        case 1:
            return <span style={{ fontSize: 13 }} className="badge bg-success">+{transfer.amount}</span>
        case 2:
            return <span style={{ fontSize: 13 }} className="badge bg-danger">-{transfer.payload.price_with_tax}</span>
        case 3:
            return <span style={{ fontSize: 13 }} className="badge bg-success">+{transfer.amount}</span>
        default:
            return <span style={{ fontSize: 13 }} className="badge bg-success">+{transfer.amount}</span>
    }

}
Amount.propTypes = {
    transfer: PropTypes.object
};
function index() {
    const [pageNumber, setPageNumber]: any = useState(1)
    const [transfers, setTransfers]: any = useState({ data: [], last_page: 1, per_page: 12 })
    const [sentinel, setSentinel] = useState({ mount: true })
    const search = useRef(null)
    const token = useRef(Cookies.get('token_dash'))
    useEffect(() => {
        fetchData()
    }, [pageNumber, sentinel])
    const fetchData = async () => {
        console.log('fetching')
        try {
            const params = {
                page: pageNumber,
                search: search.current
            }
            const data = await API.get(`dashboard/activities/all_financial_transactions`, {
                params,
                headers: {
                    Authorization: `Bearer ${token.current} `
                }
            })
            console.log(data)
            setTransfers({
                ...transfers,
                last_page: data?.data?.data?.last_page,
                per_page: data?.data?.data?.per_page,
                data: data?.data?.data?.data
            })


        }
        catch (err) {
            console.log(err)
        }
    }



    console.log(transfers)
    return (
        <>
            <div className="timlands-panel">
                <div className="timlands-panel-header">
                    <h2 className="title">
                        <span className="material-icons material-icons-outlined">
                            event_repeat
                        </span>
                        المعاملات المالية
                    </h2>
                </div>
                <div className="row justify-content-center">
                    <div className="col-xl-12">
                        <div className="py-3">
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="timlands-form">
                                        <input
                                            id="input-sQuery"
                                            name="sQuery"
                                            placeholder=" للبحث في الجدول ."
                                            className="timlands-inputs"
                                            onChange={(e) => search.current = (e.target.value)}
                                            onKeyDown={(e) => {
                                                search.current = (e.target as HTMLTextAreaElement).value
                                                if (e.keyCode === 13)
                                                    setSentinel({ ...sentinel, mount: true })
                                            }
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="activities-items">
                            <div className="timlands-table">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>المبلغ($)</th>
                                            <th>عنوان العملية</th>
                                            <th>طريقة العملية</th>
                                            <th>صاحب العملية</th>
                                            <th>التاريخ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {transfers?.data?.map(transfer => (
                                            <tr key={transfer.id}>
                                                <td>
                                                    <Amount transfer={transfer} />
                                                </td>
                                                <td>{transfer.payload.title}</td>
                                                <td>{transfer.payload.payment_method}</td>
                                                <td className="linked-image">
                                                    <Link href={`/u/${transfer.wallet.profile.id}`}>
                                                        <a>
                                                            <Image src={transfer.wallet.profile.avatar_url} width={20} height={20} alt={transfer.wallet.profile.full_name} />
                                                            <span className="text"> {transfer.wallet.profile.full_name}</span>
                                                        </a>
                                                    </Link>
                                                </td>
                                                <td>{transfer.created_at.substring(0, 10)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div>
                        <hr />
                        <Pagination
                            activePage={
                                pageNumber
                            }
                            itemsCountPerPage={
                                transfers.per_page || 0
                            }
                            totalItemsCount={transfers?.per_page * transfers?.last_page}
                            onChange={(pageNumber) => {
                                setPageNumber(pageNumber);
                            }}
                            pageRangeDisplayed={8}
                            itemClass="page-item"
                            linkClass="page-link"
                            className="productPagination"
                            firstPageText={"الصفحة الأولى"}
                            lastPageText={"الصفحة الأخيرة"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
index.getLayout = function getLayout(page: any): ReactElement {
    return <DashboardLayout>{page}</DashboardLayout>;
};

export default index;
