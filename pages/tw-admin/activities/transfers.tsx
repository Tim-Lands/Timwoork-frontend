import { ReactElement } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LastSeen from "@/components/LastSeen";
import Image from "next/image";
import Link from "next/link";

function index() {

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
                                        <tr>
                                            <td>
                                                <span style={{ fontSize: 13 }} className="badge bg-danger">-200</span>
                                            </td>
                                            <td>عملية شراء بواسطة المحفظة</td>
                                            <td>المحفظة</td>
                                            <td className="linked-image">
                                                <Link href={`/u/username`}>
                                                    <a>
                                                        <Image src={'/avatar2.jpg'} width={20} height={20} alt={'عبد الحميد بومقواس'} />
                                                        <span className="text"> عبد الحميد بومقواس</span>
                                                    </a>
                                                </Link>
                                            </td>
                                            <td>التاريخ</td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <span style={{ fontSize: 13 }} className="badge bg-success">+200</span>
                                            </td>
                                            <td>عملية شراء بواسطة المحفظة</td>
                                            <td>المحفظة</td>
                                            <td className="linked-image">
                                                <Link href={`/u/username`}>
                                                    <a>
                                                        <Image src={'/avatar3.jpg'} width={20} height={20} alt={'شرف الدين'} />
                                                        <span className="text"> شرف الدين</span>
                                                    </a>
                                                </Link>
                                            </td>
                                            <td><LastSeen date={"2022-03-07T16:21:53.000000Z"} /></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
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
