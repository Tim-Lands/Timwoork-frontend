import Layout from '@/components/Layout/HomeLayout'
import { Badge, Button, message, Result, Tooltip } from 'antd'
import React, { ReactElement, useEffect, useState } from 'react'
import API from '../../config'
import Link from 'next/link'
import Image from 'next/image'
import useSWR from 'swr'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { MetaTags } from '@/components/SEO/MetaTags'
import Cookies from 'js-cookie'
import { DeleteOutlined, PauseCircleOutlined, EditOutlined } from '@ant-design/icons';
import Unauthorized from '@/components/Unauthorized';
import router from 'next/router'
import Loading from '@/components/Loading'
import { Menu } from 'antd';

function index() {
    const token = Cookies.get('token')
    const [statusType, setStatusType] = useState('')
    
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
    useEffect(() => {
        if (!token) {
            router.push('/login')
        }
    }, [])

    const { data: userInfo }: any = useSWR('api/me')
    const { data: postsList }: any = useSWR(`api/my_products${statusType}`)

    const deleteHandle = (id: any) => {
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
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await API.post(`api/product/${id}/deleteProduct`, null, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    })
                    if (res.status === 200) {
                        message.success('تم حذف هذه الخدمة')
                    }
                } catch (error) {
                    console.log(error);
                }
                swalWithBootstrapButtons.fire(
                    'تم الحذف!',
                    'لقد تم حذف هذا العنصر بنجاح',
                    'success'
                )
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
    if (userInfo && userInfo.user_details.profile.steps < 1)
        return (<div className="row justify-content-md-center">
            <div className="col-md-5">
                <Result
                    status="warning"
                    title="حسابك غير كامل يرجى إكمال الصفحة الشخصية الخاصة بك"
                    subTitle="حسابك غير كامل يرجى إكمال الصفحة الشخصية الخاصة بك"
                    extra={
                        <Link href="/user/personalInformations">
                            <a className="btn butt-primary butt-md">
                                الذهاب إلى التعديل
                            </a>
                        </Link>
                    }
                />
            </div>
        </div>)
    const myLoader = () => {
        return `${userInfo.user_details.profile.avatar}`;
    }
    return (
        <div className="py-3">
            {!token && <Unauthorized />}
            
            {userInfo && userInfo.user_details.profile &&
                <>
                    <MetaTags
                        title={'خدماتي'}
                        metaDescription={"الصفحة الرئيسية"}
                        ogDescription={"الصفحة الرئيسية"}
                    />
                    <div className="container">
                        <div className="timlands-profile-content">
                            <div className="profile-content-header">
                                <Badge color={'green'} count="متصل" offset={[10, 10]} >
                                    <div className="profile-content-avatar">
                                        {userInfo.user_details.profile.avatar == 'avatar.png' ?
                                            <Image src="/avatar2.jpg" width={120} height={120} /> :
                                            <Image
                                                loader={myLoader}
                                                src={userInfo.user_details.profile.avatar}
                                                quality={1}
                                                width={120}
                                                height={120}
                                                placeholder='blur'
                                                blurDataURL='/avatar2.jpg'
                                            />
                                        }
                                    </div>
                                </Badge>
                                <div className="profile-content-head">
                                    <h4 className="title">
                                        {userInfo.user_details.profile.first_name + ' ' + userInfo.user_details.profile.last_name}
                                    </h4>
                                    <p className="text">
                                        @{userInfo.user_details.username} |
                                        <span className="app-label"> {userInfo.user_details.profile && userInfo.user_details.profile.level.name_ar} </span>
                                        <Badge
                                            className="site-badge-count-109"
                                            count={userInfo.user_details.profile.badge.name_ar}
                                            style={{ backgroundColor: '#52c41a' }}
                                        />
                                    </p>
                                    <div className="button-edit">
                                        <Link href="/user/personalInformations">
                                            <a className="btn butt-primary flex-center butt-sm">
                                                <span className="material-icons material-icons-outlined">edit</span> تعديل الملف الشخصي
                                            </a>
                                        </Link>
                                        <Link href="/user/changePass">
                                            <a className="btn butt-primary2 flex-center butt-sm mt-1">
                                                <span className="material-icons material-icons-outlined">lock</span> تغيير كلمة المرور
                                            </a>
                                        </Link>
                                    </div>
                                </div>
                            </div>
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
                                    /> : ''
                                }
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
                                                        <Tooltip title="تعطيل هذه الخدمة">
                                                            <Button type="primary" color='orange' style={{ marginInline: 2 }} size="small" shape="circle" icon={<PauseCircleOutlined />} onClick={() => deleteHandle(e.id)} />
                                                        </Tooltip>
                                                        <Tooltip title="تعديل الخدمة">
                                                            <Button type="default" color='orange' size="small" shape="circle" icon={<EditOutlined />} onClick={() => deleteHandle(e.id)} />
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {!postsList && <Loading />}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

index.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default index