import Loading from "@/components/Loading";
import Link from "next/link";
import PropTypes from "prop-types";
import API from "../../config";
import Cookies from "js-cookie";
import { Result, Menu, Tooltip, Button, notification } from "antd";
import {
  DeleteOutlined,
  PauseCircleOutlined,
  EditOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import router from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function MyProducts({ setStatusType, postsList, refresh }) {
  let token = Cookies.get("token");
  if (!token && typeof window !== "undefined")
    token = localStorage.getItem("token");
  const deleteHandle = (id: any) => {
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
        text: "هل انت متأكد أنك تريد حذف هذا العنصر",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم, أريد الحذف",
        cancelButtonText: "لا",
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            const res = await API.post(
              `api/product/${id}/deleteProduct`,
              null,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (res.status === 200) {
              swalWithBootstrapButtons.fire(
                "تم الحذف!",
                "لقد تم حذف هذه الخدمة بنجاح",
                "success"
              );
              refresh();
            }
          } catch (error) {
            console.log(error);
          }
        }
      });
  };

  const disactiveProductHandle = async (id: any) => {
    const MySwal = withReactContent(Swal);

    const swalWithBootstrapButtons = MySwal.mixin({
      customClass: {
        confirmButton: "btn butt-red butt-sm me-1",
        cancelButton: "btn butt-green butt-sm",
      },
      buttonsStyling: false,
    });
    try {
      const res = await API.post(
        `api/my_products/${id}/disactive_product`,
        null,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        swalWithBootstrapButtons.fire(
          "تم التعطيل!",
          "لقد تم تعطيل هذه الخدمة بنجاح",
          "success"
        );
        refresh();
      }
    } catch (error) {
      notification["error"]({
        message: "رسالة خطأ",
        description: "للأسف لم يتم تعطيل هذه الخدمة",
      });
    }
  };
  const activeProductHandle = async (id: any) => {
    const MySwal = withReactContent(Swal);

    const swalWithBootstrapButtons = MySwal.mixin({
      customClass: {
        confirmButton: "btn butt-red butt-sm me-1",
        cancelButton: "btn butt-green butt-sm",
      },
      buttonsStyling: false,
    });
    try {
      const res = await API.post(`api/my_products/${id}/active_product`, null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        swalWithBootstrapButtons.fire(
          "تم التنشيط!",
          "لقد تم تنشسط هذه الخدمة بنجاح",
          "success"
        );
        refresh();
      }
    } catch (error) {
      notification["error"]({
        message: "رسالة خطأ",
        description: "للأسف لم يتم تنشيط هذه الخدمة",
      });
    }
  };
  function statusProduct(status: any) {
    switch (status) {
      case null:
        return <span className="badge bg-info">في الإنتظار...</span>;
      case 0:
        return <span className="badge bg-danger">مرفوظة</span>;
      case 1:
        return <span className="badge bg-success">مقبولة</span>;
      default:
        return <span className="badge bg-info">في الإنتظار...</span>;
    }
  }
  return (
    <div className="profile-content-body">
      <div className="page-header">
        <h3 className="title">خدماتي</h3>
        <Link href={"/add-new"}>
          <a className="add-new-product">
            <span className="material-icons material-icons-outlined">
              add_circle_outline
            </span>{" "}
            إضافة خدمة جديدة
          </a>
        </Link>
      </div>
      <Menu mode="horizontal">
        <Menu.Item key="all" onClick={() => setStatusType("")}>
          الكل
        </Menu.Item>
        <Menu.Item key="mail" onClick={() => setStatusType("/published")}>
          النشطة
        </Menu.Item>
        <Menu.Item key="app" onClick={() => setStatusType("/rejected")}>
          المرفوضة
        </Menu.Item>
        <Menu.Item key="waiting" onClick={() => setStatusType("/pending")}>
          قيد الإنتظار
        </Menu.Item>
        <Menu.Item key="drafts" onClick={() => setStatusType("/drafts")}>
          المسودات
        </Menu.Item>
        <Menu.Item key="alipay" onClick={() => setStatusType("/paused")}>
          المعطلة
        </Menu.Item>
      </Menu>
      {postsList && postsList.data.length == 0 ? (
        <Result
          status="404"
          title="لا يوجد لديك خدمات"
          subTitle="يمكنك إضافة خدمة في أي وقت "
          extra={
            <Link href="/add-new">
              <a className="btn butt-sm butt-primary">إضافة خدمة جديدة</a>
            </Link>
          }
        />
      ) : (
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
              {postsList &&
                postsList.data.map((e: any) => (
                  <tr key={e.id}>
                    <td>
                      <Link href={`/myproducts/${e.slug}`}>
                        <a>{e.title}</a>
                      </Link>
                    </td>
                    <td>
                      {e.is_completed == 0 ? (
                        <span className="badge bg-danger">لا</span>
                      ) : (
                        <span className="badge bg-success">نعم</span>
                      )}
                    </td>
                    <td>{e.count_buying}</td>
                    <td>
                      {e.is_active == 0 ? (
                        <span className="badge bg-danger">معطلة</span>
                      ) : (
                        <span className="badge bg-success">مفعلة</span>
                      )}
                    </td>
                    <td>{statusProduct(e.status)}</td>
                    <td>
                      <Tooltip title="حذف هذه الخدمة">
                        <Button
                          danger
                          type="primary"
                          color="red"
                          size="small"
                          shape="circle"
                          icon={<DeleteOutlined />}
                          onClick={() => deleteHandle(e.id)}
                        />
                      </Tooltip>
                      {e.status !== null && (
                        <>
                          {e.is_active == 0 && e.is_completed == 1 ? (
                            <Tooltip title="تفعيل هذه الخدمة">
                              <Button
                                type="primary"
                                color="orange"
                                style={{
                                  marginInline: 2,
                                  backgroundColor: "green",
                                }}
                                size="small"
                                shape="circle"
                                icon={<PlayCircleOutlined />}
                                onClick={() => activeProductHandle(e.id)}
                              />
                            </Tooltip>
                          ) : (
                            <Tooltip title="تعطيل هذه الخدمة">
                              <Button
                                type="primary"
                                color="orange"
                                style={{
                                  marginInline: 2,
                                  backgroundColor: "orange",
                                }}
                                size="small"
                                shape="circle"
                                icon={<PauseCircleOutlined />}
                                onClick={() => disactiveProductHandle(e.id)}
                              />
                            </Tooltip>
                          )}
                        </>
                      )}
                      <Tooltip title="تعديل الخدمة">
                        <Button
                          type="default"
                          color="orange"
                          size="small"
                          shape="circle"
                          icon={<EditOutlined />}
                          onClick={() => {
                            router.push({
                              pathname: "/edit-product/overview",
                              query: {
                                id: e.id, // pass the id
                              },
                            });
                          }}
                        />
                      </Tooltip>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {!postsList && <Loading />}
        </div>
      )}
    </div>
  );
}
MyProducts.propTypes = {
  setStatusType: PropTypes.func,
  postsList: PropTypes.any,
  refresh: PropTypes.func,
};
