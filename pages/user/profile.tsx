import Layout from '@/components/Layout/HomeLayout'
import { Badge, Statistic, Card, Result, message, Menu, Tooltip, Button } from 'antd'
import React, { ReactElement, useState } from 'react'
import Link from 'next/link'
import { FallOutlined, RiseOutlined, ShrinkOutlined, DeleteOutlined, PauseCircleOutlined, EditOutlined } from '@ant-design/icons';
import Image from 'next/image'
import router from 'next/router'
import API from '../../config'
import useSWR from 'swr'
import { MetaTags } from '@/components/SEO/MetaTags'
import Loading from '@/components/Loading'
import Cookies from 'js-cookie'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import Unauthorized from '@/components/Unauthorized';

function Profile() {
    const token = Cookies.get('token')
    const { data: userInfo }: any = useSWR('api/me')
    const darkMode = userInfo && userInfo.user_details.profile.dark_mode
    if (userInfo && userInfo.user_details.profile.steps < 1)
        return (<div className="row justify-content-md-center">
            <div className="col-md-5">
                <Result
                    status="warning"
                    title="حسابك غير كامل"
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
    const { data: postsList }: any = useSWR(`api/my_products${statusType}`)

    const [isLoadingSeler, setIsLoadingSeler] = useState(false)
    const beseller = async () => {
        setIsLoadingSeler(true)
        try {
            const res = await API.post("api/sellers/store", null, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            // Authentication was successful.
            if (res.status === 200) {
                setIsLoadingSeler(false)
                router.push('/user/editSeller')
            }
        } catch (error: any) {
            message.error('حدث خطأ غير متوقع')
            setIsLoadingSeler(false)
        }
    }
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
    const disactivateHandle = async (id: any) => {
        console.log(id);

    }
    return (
        <div className="py-3">
            {!userInfo && <Loading />}
            {!token && <Unauthorized />}
            {userInfo && userInfo.user_details.profile &&
                <>
                    <MetaTags
                        title={userInfo.user_details.profile.first_name + " " + userInfo.user_details.profile.last_name}
                        metaDescription={"الصفحة الرئيسية"}
                        ogDescription={"الصفحة الرئيسية"}
                    />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                                {!userInfo.user_details.profile.profile_seller &&
                                    <div className="be-seller-aside">
                                        <h3 className="title">كن بائعا</h3>
                                        <p className="text">هل تريد أن تكون بائعا؟ يمكنك إضافة معلومات إضافية!</p>
                                        <button onClick={beseller} disabled={isLoadingSeler} className='btn butt-green butt-md' style={{ width: '100%' }}>
                                            إنشاء بروفايل بائع
                                        </button>
                                    </div>
                                }
                                {userInfo.user_details.profile.profile_seller &&
                                    <div className="py-1">
                                        <Card title="نبذة عني" extra={<Link href="/user/editSeller"><a className='edit-button flex-center'><span className="material-icons material-icons-outlined">edit</span></a></Link>}>
                                            <p className="user-bro">
                                                {userInfo.user_details.profile.profile_seller.bio}
                                            </p>
                                        </Card>
                                    </div>
                                }
                                <div className="py-1">
                                    <Card title="الرصيد">
                                        <div className="statistic-item">
                                            <Statistic
                                                title="الرصيد المعلق"
                                                value={userInfo && userInfo.user_details.profile.pending_amount}
                                                precision={2}
                                                valueStyle={{ color: '#cf1322' }}
                                                prefix={<FallOutlined />}
                                                suffix="$"
                                            />
                                        </div>
                                        <div className="statistic-item">
                                            <Statistic
                                                title="الرصيد القابل للسحب"
                                                value={userInfo && userInfo.user_details.profile.withdrawable_amount}
                                                precision={2}
                                                valueStyle={{ color: darkMode ? '#8ac557' : '#3f8600' }}
                                                prefix={<RiseOutlined />}
                                                suffix="$"
                                            />
                                        </div>
                                        <div className="statistic-item">
                                            <Statistic
                                                title="الرصيد الكلي"
                                                value={userInfo && (Number(userInfo.user_details.profile.withdrawable_amount) + Number(userInfo.user_details.profile.pending_amount))}
                                                precision={2}
                                                valueStyle={{ color: darkMode ? '#ddd' : '#222' }}
                                                prefix={<ShrinkOutlined />}
                                                suffix="$"
                                            />
                                        </div>
                                    </Card>
                                </div>
                            </div>
                            <div className="col-lg-8">
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
                                                <span className="app-label"> {userInfo.user_details.profile.level.name_ar} </span>
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
                                        <div className="content-title">
                                            <div className="d-flex">
                                                <h3 className="title flex-center">
                                                    <span className="material-icons material-icons-outlined">account_circle</span>
                                                    المعلومات الشخصية
                                                </h3>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">الاسم الأول</h3>
                                                    <p className="text-value">{userInfo.user_details.profile.first_name}</p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">الاسم الأخير</h3>
                                                    <p className="text-value">{userInfo.user_details.profile.last_name}</p>
                                                </div>
                                            </div>
                                            {userInfo.user_details.profile.country !== null &&
                                                <div className="col-sm-4">
                                                    <div className="content-text-item">
                                                        <h3 className="text-label">البلد</h3>
                                                        <p className="text-value">{userInfo.user_details.profile.country.name_ar}</p>
                                                    </div>
                                                </div>
                                            }

                                            <div className="col-sm-4">
                                               {/* <Badge.Ribbon text="مفعل" color="green">*/}
                                                    <div className="content-text-item">
                                                        <h3 className="text-label">رقم الهاتف</h3>
                                                        <p className="text-value">{userInfo.user_details.phone}</p>
                                                    </div>
                                               {/* </Badge.Ribbon>*/}
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">الجنس</h3>
                                                    <p className="text-value">
                                                        {
                                                            userInfo.user_details.profile && userInfo.user_details.profile.gender == null ? '' :
                                                                userInfo.user_details.profile && (userInfo.user_details.profile.gender == 0 ? 'أنثى' : 'ذكر')
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="col-sm-4">
                                                <div className="content-text-item">
                                                    <h3 className="text-label">تاريخ الميلاد</h3>
                                                    <p className="text-value">{userInfo.user_details.profile.date_of_birth == null ? '' : userInfo.user_details.profile.date_of_birth}</p>

                                                </div>
                                            </div>
                                        </div>
                                        {userInfo.user_details.profile.profile_seller &&
                                            <div className="content-title">
                                                <div className="d-flex">
                                                    <h3 className="title flex-center me-auto">
                                                        <span className="material-icons material-icons-outlined">account_circle</span>
                                                        المعلومات التقنية
                                                    </h3>
                                                    <Link href="/user/editSeller">
                                                        <a className='edit-button flex-center ml-auto'>
                                                            <span className="material-icons material-icons-outlined">edit</span>
                                                        </a>
                                                    </Link>
                                                </div>
                                            </div>
                                        }
                                        <div className="row">
                                            {userInfo.user_details.profile.profile_seller &&
                                                <div className="col-sm-6">
                                                    <div className="content-text-item">
                                                        <h3 className="text-label">المهارات</h3>
                                                        {userInfo.user_details.profile.profile_seller.skills &&
                                                            <ul className="text-skills">
                                                                {userInfo.user_details.profile.profile_seller.skills.map((e: any, i) => (
                                                                    <li key={i}>
                                                                        <Link href="">
                                                                            <a>{e.name_ar}</a>
                                                                        </Link>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        }
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {userInfo.user_details.profile.profile_seller &&
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
                                                            <Button type="primary" color='orange' style={{ marginInline: 2 }} size="small" shape="circle" icon={<PauseCircleOutlined />} onClick={() => disactivateHandle(e.id)} />
                                                        </Tooltip>
                                                        <Tooltip title="تعديل الخدمة">
                                                            <Button type="default" color='orange' size="small" shape="circle" icon={<EditOutlined />} />
                                                        </Tooltip>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {!postsList && <Loading />}
                                </div>
                            </div>
                        }
                    </div>
                </>
            }
        </div>
    )
}

Profile.getLayout = function getLayout(page: any): ReactElement {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Profile