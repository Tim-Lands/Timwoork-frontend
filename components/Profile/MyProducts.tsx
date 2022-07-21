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
import { LanguageContext } from "../../contexts/languageContext/context";
import { useContext } from "react";

export default function MyProducts({ setStatusType, postsList, refresh }) {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage("all");
  const getLogin = getSectionLanguage("login");
  const getAuth = getSectionLanguage("auth");
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
        title: getLogin("Are_you_sure1"),
        text: getLogin("Are_you_sure"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: getLogin("Yes"),
        cancelButtonText: getLogin("No"),
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
                getLogin("Deleted"),
                getLogin("The_service_has"),
                "success"
              );
              refresh();
            }
          } catch (error) {
            () => {};
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
          getLogin("Disabled1"),
          getLogin("The_service_has_2"),
          "success"
        );
        refresh();
      }
    } catch (error) {
      notification["error"]({
        message: getLogin("Error_message"),
        description: getLogin("Unfortunately_this_service"),
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
          getLogin("Abled1"),
          getLogin("This_service_has"),
          "success"
        );
        refresh();
      }
    } catch (error) {
      notification["error"]({
        message: getLogin("Error_message"),
        description: getLogin("Unfortunately_this_service_2"),
      });
    }
  };
  function statusProduct(status: any) {
    switch (status) {
      case null:
        return <span className="badge bg-info">{getLogin("Pending")}</span>;
      case 0:
        return <span className="badge bg-danger">{getLogin("Rejected")}</span>;
      case 1:
        return <span className="badge bg-success">{getLogin("Rejected")}</span>;
      default:
        return <span className="badge bg-info">{getLogin("Pending")}</span>;
    }
  }

  const routeToCurrentStep = (product) => {
    let page_name = "overview";
    if (product.status == 1)
      return router.push(`/edit-product/${page_name}?id=${product.id}`);
    else
      switch (product.current_step) {
        case 1:
          page_name = "overview";
          break;
        case 2:
          page_name = "prices";
          break;
        case 3:
          page_name = "description";
          break;
        case 4:
          page_name = "medias";
          break;
        case 5:
          page_name = "complete";
          break;
        default:
          page_name = "overview";
          break;
      }
    router.push(`/edit-product/${page_name}?id=${product.id}`);
  };

  return (
    <div className="profile-content-body">
      <div className="page-header">
        <h3 className="title">{getAll("My_services")}</h3>
        <Link href={"/add-new"}>
          <a className="add-new-product">
            <span className="material-icons material-icons-outlined">
              add_circle_outline
            </span>{" "}
            {getAll("Add_new_service")}
          </a>
        </Link>
      </div>
      <Menu mode="horizontal">
        <Menu.Item key="all" onClick={() => setStatusType("")}>
          {getLogin("All")}
        </Menu.Item>
        <Menu.Item key="mail" onClick={() => setStatusType("/published")}>
          {getLogin("Active")}
        </Menu.Item>
        <Menu.Item key="app" onClick={() => setStatusType("/rejected")}>
          {getLogin("Rejected")}
        </Menu.Item>
        <Menu.Item key="waiting" onClick={() => setStatusType("/pending")}>
          {getLogin("PEnding")}
        </Menu.Item>
        <Menu.Item key="drafts" onClick={() => setStatusType("/drafts")}>
          {getLogin("Draft")}
        </Menu.Item>
        <Menu.Item key="alipay" onClick={() => setStatusType("/paused")}>
          {getLogin("Disabled")}
        </Menu.Item>
      </Menu>
      {postsList && postsList.data.length == 0 ? (
        <Result
          status="404"
          title={getLogin("You_have_no")}
          subTitle={getLogin("You_can_add")}
          extra={
            <Link href="/add-new">
              <a className="btn butt-sm butt-primary">
                {getAll("Add_new_service")}
              </a>
            </Link>
          }
        />
      ) : (
        <div className="timlands-table">
          <table className="table">
            <thead>
              <tr>
                <th>{getAll("Title")}</th>
                <th>{getLogin("Completed")}</th>
                <th>{getLogin("Buyers_number")}</th>
                <th>{getLogin("Activation_status")}</th>
                <th>{getLogin("Admission_status")}</th>
                <th>{getAll("Tools")}</th>
              </tr>
            </thead>
            <tbody>
              {postsList &&
                postsList.data.map((e: any) => (
                  <tr key={e.id}>
                    <td>
                      {e.is_completed == 1 ? (
                        <Link href={`/myproducts/${e.slug}`}>
                          <a>{e.title}</a>
                        </Link>
                      ) : (
                        <p>{e.title}</p>
                      )}
                    </td>
                    <td>
                      {e.is_completed == 0 ? (
                        <span className="badge bg-danger">
                          {getLogin("No")}
                        </span>
                      ) : (
                        <span className="badge bg-success">
                          {getAuth("Yes")}
                        </span>
                      )}
                    </td>
                    <td>{e.count_buying}</td>
                    <td>
                      {e.is_active == 0 ? (
                        <span className="badge bg-danger">
                          {getLogin("Disabled")}
                        </span>
                      ) : (
                        <span className="badge bg-success">
                          {getLogin("Abled")}
                        </span>
                      )}
                    </td>
                    <td>{statusProduct(e.status)}</td>
                    <td>
                      <Tooltip title={getLogin("Delete_this_service")}>
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
                            <Tooltip title={getLogin("Able_this_service")}>
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
                            <Tooltip title={getLogin("Disable_this_service")}>
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
                      <Tooltip title={getLogin("Service_editing")}>
                        <Button
                          type="default"
                          color="orange"
                          size="small"
                          shape="circle"
                          icon={<EditOutlined />}
                          onClick={() => routeToCurrentStep(e)}
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
