import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";
import Link from "next/link";
import LastSeen from "@/components/LastSeen";
import { Space } from "antd";
import Cookies from "js-cookie";
import API from "../../../config";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";

export async function archieveHandle(id) {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const token = Cookies.get("token_dash");

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
      title: getAll("Are_you_sure1"),
      text: getAll("Are_you_sur"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: getAll("Yes_I_want"),
      cancelButtonText: "لا",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res: any = await API.post(
            `dashboard/products/${id}/delete `,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          console.log(res);
          if (res.status == 200) {
            console.log("res success");
            location.reload();
          }
        } catch (error) {
          console.log("err");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          getAll("Cancelled_2"),
          getAll("Cancelled"),
          getAll("Error")
        );
      }
    });
}

async function forceDelete(id) {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const token = Cookies.get("token_dash");
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
      title: getAll("Are_you_sure1"),
      text: getAll("Are_you_sur1"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: getAll("Yes_I_ant"),
      cancelButtonText: "لا",
      reverseButtons: true,
    })
    .then((result) => {
      if (result.isConfirmed) {
        try {
          const res: any = API.post(
            `dashboard/products/${id}/force_delete_product`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res) {
            console.log("res success");
            location.reload();
          }
        } catch (error) {
          console.log("err");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          getAll("Cancelled_2"),
          getAll("Cancelled"),
          getAll("Error")
        );
      }
    });
}

async function restoreArchieved(id) {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const token = Cookies.get("token_dash");
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
      title: getAll("Are_you_sure1"),
      text: getAll("Are_you_sur1"),
      icon: "success",
      showCancelButton: true,
      confirmButtonText: getAll("Yes_I_ant_2"),
      cancelButtonText: "لا",
      reverseButtons: true,
    })
    .then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("going delete");
          const res: any = await API.post(
            `dashboard/products/${id}/restore_product_deleted`,
            {},
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res.status == 200) {
            console.log("res success");
            location.reload();
          }
        } catch (error) {
          console.log("err");
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        swalWithBootstrapButtons.fire(
          getAll("Cancelled_2"),
          getAll("Cancelled"),
          getAll("Error")
        );
      }
    });
}

export const generatecolumns = ({ status, callbacks }) => {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const switchStatus = (status) => {
    const { getSectionLanguage } = useContext(LanguageContext);
    const getAll = getSectionLanguage();
    switch (status) {
      case null:
        return (
          <span className="badge bg-warning text-dark">
            {getAll("PEnding")}
          </span>
        );
      case 0:
        return <span className="badge bg-danger text-light">مرفوضة</span>;
      case 1:
        return (
          <span className="badge bg-success text-light">
            {getAll("Active")}
          </span>
        );
    }
  };
  return [
    {
      title: getAll("Title"),
      dataIndex: "",
      render: (profile: any) => (
        <Link href={`/tw-admin/posts/${profile.slug}`}>
          <a>{profile.title}</a>
        </Link>
      ),
      width: 390,
    },
    {
      title: getAll("Status"),
      dataIndex: ["status"],
      render: (status: any) => switchStatus(status),
      ellipsis: true,
      width: 90,
    },
    {
      title: getAll("Date"),
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
          <a>
            {seller.profile.full_name ||
              seller.profile.first_name + seller.profile.last_name}
          </a>
        </Link>
      ),
      ellipsis: true,
    },
    {
      title: getAll("Tools"),
      dataIndex: "",
      render: (post: any) => generateButtonSet({ status, post, callbacks }),
      ellipsis: true,
    },
  ];
};
const generateButtonSet = ({ status, post, callbacks }) => {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const {
    activateProduct,
    onRejectClick,
    onSendNotificationClick,
    onSendEmailClick,
    onDisactiveClick,
  } = callbacks;
  return (
    <Space>
      {!["activated", "archieved"].includes(status) &&
      (post.status == 0 || post.status == null) ? (
        <button
          title={getAll("Able_this_service")}
          onClick={() => activateProduct(post.id)}
          className="btn butt-xs2 butt-green"
        >
          {getAll("Activation")}
        </button>
      ) : (
        ""
      )}
      {post.status == 1 ? (
        <button
          title={getAll("Disable_this_service")}
          onClick={() => onDisactiveClick(post.id)}
          className="btn butt-xs2 butt-orange"
        >
          {getAll("Desactivation")}
        </button>
      ) : (
        ""
      )}
      {status == "archieved" && (
        <>
          {" "}
          <button
            title={getAll("Delete_this_service")}
            className="btn butt-xs2 butt-red"
            onClick={() => forceDelete(post.id)}
          >
            حذف نهائي
          </button>
          <button
            title="إستعادة هذه الخدمة"
            onClick={() => restoreArchieved(post.id)}
            className="btn butt-xs2 butt-green"
          >
            إستعادة
          </button>
        </>
      )}
      {status != "archieved" && (
        <button
          title="أرشفة هذه الخدمة"
          className="btn butt-xs2 butt-red"
          onClick={() => archieveHandle(post.id)}
        >
          أرشفة
        </button>
      )}
      {status != "cancelled" && (post.status == 2 || post.status == null) && (
        <button
          title="رفض الخدمة"
          className="btn butt-xs2 butt-orange"
          onClick={() => onRejectClick(post.id)}
        >
          {getAll("Rejection")}
        </button>
      )}
      <Link href={`/tw-admin/posts/edit-product/overview?id=${post.id}`}>
        <a title="تعديل هذه الخدمة" className="btn butt-xs2 butt-green">
          {getAll("Edit")}
        </a>
      </Link>
      <button
        title={getAll("Send_e_mail")}
        className="btn butt-xs2 butt-dark"
        onClick={() => onSendEmailClick(post)}
      >
        {getAll("Send_e_mail")}
      </button>
      <button
        title={getAll("Send_notification")}
        className="btn butt-xs2 butt-light"
        onClick={() => {
          onSendNotificationClick();
          //setIsEmailModalVisible(true)
        }}
      >
        {getAll("Send_notification")}
      </button>
    </Space>
  );
};
