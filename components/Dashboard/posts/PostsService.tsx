import Link from "next/link";
import LastSeen from "@/components/LastSeen";
import { Space } from "antd";
import { EProductStateType } from "@/store/tw-admin/products/thunkFunctions";

export const generatecolumns = ({ status, callbacks }, getAll) => {
  const switchStatus = (status, getAll) => {
    switch (status) {
      case null:
        return (
          <span className="badge bg-warning text-dark">
            {getAll("PEnding")}
          </span>
        );
      case 0:
        return (
          <span className="badge bg-danger text-light">
            {getAll("Rejected")}
          </span>
        );
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
      render: (status: any) => switchStatus(status, getAll),
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
        <Link href={`/user/profile/${seller.profile.user.username}`}>
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
      render: (post: any) =>
        generateButtonSet({ status, post, callbacks }, getAll),
      ellipsis: true,
    },
  ];
};
const generateButtonSet = ({ status, post, callbacks }, getAll) => {
  const {
    activateProduct,
    onRejectClick,
    onSendNotificationClick,
    onSendEmailClick,
    onDisactiveClick,
    forceDelete,
    restoreArchieved,
    archieveHandle,
  } = callbacks;
  return (
    <Space>
      {![EProductStateType.ACTIVE, EProductStateType.ARCHIEVE].includes(
        status
      ) &&
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
      {status == EProductStateType.ARCHIEVE && (
        <>
          {" "}
          <button
            title={getAll("Delete_this_service")}
            className="btn butt-xs2 butt-red"
            onClick={() => forceDelete(post.id, getAll)}
          >
            حذف نهائي
          </button>
          <button
            title="إستعادة هذه الخدمة"
            onClick={() => restoreArchieved(post.id, getAll)}
            className="btn butt-xs2 butt-green"
          >
            إستعادة
          </button>
        </>
      )}
      {status != EProductStateType.ARCHIEVE && (
        <button
          title="أرشفة هذه الخدمة"
          className="btn butt-xs2 butt-red"
          onClick={() => archieveHandle(post.id, getAll)}
        >
          أرشفة
        </button>
      )}
      {status != EProductStateType.REJECTED &&
        (post.status == 2 || post.status == null) && (
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
          onSendNotificationClick(post);
          //setIsEmailModalVisible(true)
        }}
      >
        {getAll("Send_notification")}
      </button>
    </Space>
  );
};
