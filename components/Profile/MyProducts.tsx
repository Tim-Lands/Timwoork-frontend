import Loading from '@/components/Loading'
import Link from 'next/link'
import PropTypes from "prop-types";
import { Result, Menu, Tooltip, Button } from 'antd'
import { DeleteOutlined, PauseCircleOutlined, EditOutlined } from '@ant-design/icons';
import router from "next/router";

export default function MyProducts({ setStatusType, postsList, deleteHandle, disactivateHandle }) {
    function statusProduct(status: any) {
        switch (status) {
            case null:
                return <span className="badge bg-info">في الإنتظار...</span>
            case 0:
                return <span className="badge bg-danger">مرفوظة</span>
            case 1:
                return <span className="badge bg-success">مقبولة</span>
            default:
                return <span className="badge bg-info">في الإنتظار...</span>
        }
    }
    return (
        <div className="profile-content-body">
            <div className="page-header">
                <h3 className="title">خدماتي</h3>
            </div>
            <Menu mode="horizontal">
                <Menu.Item key="all" onClick={() => setStatusType('')}>
                    الكل
                </Menu.Item>
                <Menu.Item key="mail" onClick={() => setStatusType('/published')}>
                    النشطة
                </Menu.Item>
                <Menu.Item key="app" onClick={() => setStatusType('/rejected')}>
                    المرفوضة
                </Menu.Item>
                <Menu.Item key="waiting" onClick={() => setStatusType('/pending')}>
                    قيد الإنتظار
                </Menu.Item>
                <Menu.Item key="drafts" onClick={() => setStatusType('/drafts')}>
                    المسودات
                </Menu.Item>
                <Menu.Item key="alipay" onClick={() => setStatusType('/paused')}>
                    المعطلة
                </Menu.Item>
            </Menu>
            {postsList && postsList.data.length == 0 ?
                <Result
                    status="404"
                    title="لا يوجد لديك خدمات"
                    subTitle="يمكنك إضافة خدمة في أي وقت "
                    extra={<Link href='/add-new'><a className="btn butt-sm butt-primary">إضافة خدمة جديدة</a></Link>}
                /> :
                <div className="timlands-table">
                    <table className="table">
                        <thead>
                            <tr>
                                <th>العنوان</th>
                                <th>مكتملة</th>
                                <th>عدد المشتريين</th>
                                <th>حالة التفعيل</th>
                                <th>حالة القبول</th>
                                <th>الأدوات</th>
                            </tr>
                        </thead>
                        <tbody>
                            {postsList && postsList.data.map((e: any) => (
                                <tr key={e.id}>
                                    <td>{e.title}</td>
                                    <td>{e.is_completed == 0 ?
                                        <span className="badge bg-danger">لا</span> :
                                        <span className="badge bg-success">نعم</span>}</td>
                                    <td>{e.count_buying}</td>
                                    <td>{e.is_active == 0 ?
                                        <span className="badge bg-danger">معطلة</span> :
                                        <span className="badge bg-success">مفعلة</span>}
                                    </td>
                                    <td>{statusProduct(e.status)}</td>
                                    <td>
                                        <Tooltip title="حذف هذه الخدمة">
                                            <Button danger type="primary" color='red' size="small" shape="circle" icon={<DeleteOutlined />} onClick={() => deleteHandle(e.id)} />
                                        </Tooltip>
                                        {e.status == 1 &&
                                            <Tooltip title="تعطيل هذه الخدمة">
                                                <Button type="primary" color='orange' style={{ marginInline: 2 }} size="small" shape="circle" icon={<PauseCircleOutlined />} onClick={() => disactivateHandle(e.id)} />
                                            </Tooltip>
                                        }
                                        <Tooltip title="تعديل الخدمة">
                                            <Button type="default" color='orange' size="small" shape="circle" icon={<EditOutlined />} onClick={() => {
                                                router.push({
                                                    pathname: '/edit-product/overview',
                                                    query: {
                                                        id: e.id, // pass the id 
                                                    },
                                                })
                                            }} />
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {!postsList && <Loading />}
                </div>}
        </div>
    )
}
MyProducts.propTypes = {
    setStatusType: PropTypes.func,
    postsList: PropTypes.any,
    disactivateHandle: PropTypes.func,
    deleteHandle: PropTypes.func,
};