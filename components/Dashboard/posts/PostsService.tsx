import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Link from "next/link";
import LastSeen from "@/components/LastSeen";
import { Space } from "antd";

import API from "../../../config"

export const archieveHandle = (id, token) => {
    const MySwal = withReactContent(Swal);

    const swalWithBootstrapButtons = MySwal.mixin({
        customClass: {
            confirmButton: "btn butt-red butt-sm me-1",
            cancelButton: "btn butt-green butt-sm",
        },
        buttonsStyling: false,
    });

    swalWithBootstrapButtons
        .fire({
            title: "هل أنت متأكد؟",
            text: "هل انت متأكد أنك تريد أرشفة هذا العنصر",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "نعم, أريد الأرشفة",
            cancelButtonText: "لا",
            reverseButtons: true,
        })
        .then((result) => {
            if (result.isConfirmed) {
                try {
                    const res: any = API.post(
                        `dashboard/products/${id}/delete `
                        , {}, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });
                    if (res) {
                        console.log('res success')
                    }
                } catch (error) {
                    console.log('err')
                }
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                swalWithBootstrapButtons.fire("ملغى", "تم الإلغاء", "error");
            }
        });
}

export const switchStatus = (status) => {
    switch (status) {
        case null:
            return <span className="badge bg-warning text-dark">قيد الإنتظار</span>;
        case 0:
            return <span className="badge bg-danger text-light">مرفوضة</span>;
        case 1:
            return <span className="badge bg-success text-light">نشطة</span>;
    }
};



export const generatecolumns = ({ status, callbacks }) => [

    {
        title: "العنوان",
        dataIndex: "",
        render: (profile: any) => (
            <Link href={`/tw-admin/posts/${profile.slug}`}>
                <a>{profile.title}</a>
            </Link>
        )
        ,
        width: 390,
    },
    {
        title: "الحالة",
        dataIndex: ["status"],
        render: (status: any) => switchStatus(status),
        ellipsis: true,
        width: 90,
    },
    {
        title: "التاريخ",
        dataIndex: "created_at",

        render: (created_at: any) => <LastSeen date={created_at} />,
        filterMode: "tree",
        filterSearch: true,
        onFilter: (value, record) => record.created_at.startsWith(value),
        width: 150,
    },
    {
        title: "صاحب الخدمة",
        dataIndex: ["profile_seller"],
        render: (seller: any) => (
            <Link href={`/u/${seller.profile.user.username}`}>
                <a>{seller.profile.full_name}</a>
            </Link>
        ),
        ellipsis: true,
    },
    {
        title: "الأدوات",
        dataIndex: "",
        render: (post: any) =>
            generateButtonSet({ status, post, callbacks })
        ,
        ellipsis: true,
    },
]
const generateButtonSet = ({ status, post, callbacks }) => {
    const { activateProduct,
        onDisactiveClick,
        archieveHandle,
        onRejectClick,
        onSendNotificationClick,
        onSendEmailClick } = callbacks
    return (
        <Space>
            {status != "activated" && (post.status == 0 || post.status == null) ? (
                <button
                    title="تنشيط هذه الخدمة"
                    onClick={() => activateProduct(post.id)}
                    className="btn butt-xs2 butt-green"
                >
                    تنشيط
                </button>
            ) : (
                ""
            )}
            {!['cancelled', 'paused', 'archieved'].includes(status) && post.status == 1 ? (
                <button
                    title="تعطيل هذه الخدمة"
                    onClick={() => onDisactiveClick(post.id)}
                    className="btn butt-xs2 butt-orange"
                >
                    تعطيل
                </button>
            ) : (
                ""
            )}
            {
                status != 'archieved' && <button
                    title="أرشفة هذه الخدمة"
                    className="btn butt-xs2 butt-red"
                    onClick={() => archieveHandle(post.id)}
                >
                    أرشفة
                </button>
            }
            {
                status != 'cancelled' && (post.status == 2 || post.status == null) &&
                <button
                    title="رفض الخدمة"
                    className="btn butt-xs2 butt-orange"
                    onClick={() => onRejectClick(post.id)}
                >
                    رفض
                </button>
            }
            <Link href={`/tw-admin/posts/edit-product/overview?id=${post.id}`}>
                <a
                    title="تعديل هذه الخدمة"
                    className="btn butt-xs2 butt-green"
                >
                    تعديل
                </a>
            </Link>
            <button
                title="إرسال إيميل"
                className="btn butt-xs2 butt-dark"
                onClick={() => onSendEmailClick(post)}
            >
                إرسال إيميل
            </button>
            <button
                title="إرسال إشعار"
                className="btn butt-xs2 butt-light"
                onClick={() => {
                    onSendNotificationClick()
                    //setIsEmailModalVisible(true)
                }}
            >
                إرسال إشعار
            </button>
        </Space>
    );
}