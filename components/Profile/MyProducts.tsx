import Loading from "@/components/Loading";
import Link from "next/link";
import PropTypes from "prop-types";
import API from "../../config";
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
import { useAppSelector } from "@/store/hooks";

export default function MyProducts({ setStatusType, postsList }) {
  const { getAll, language } = useAppSelector((state) => state.languages);

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
        title: getAll("Are_you_sure1"),
        text: getAll("Are_you_sure"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: getAll("Yes"),
        cancelButtonText: getAll("No"),
        reverseButtons: true,
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          try {
            await API.post(`api/product/${id}/deleteProduct`);
            swalWithBootstrapButtons.fire(
              getAll("Deleted"),
              getAll("The_service_has"),
              "success"
            );
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
      await API.post(`api/my_products/${id}/disactive_product`);
      swalWithBootstrapButtons.fire(
        getAll("Disabled1"),
        getAll("The_service_has_2"),
        "success"
      );
    } catch (error) {
      notification["error"]({
        message: getAll("Error_message"),
        description: getAll("Unfortunately_this_service"),
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
      await API.post(`api/my_products/${id}/active_product`);

      swalWithBootstrapButtons.fire(
        getAll("Abled1"),
        getAll("This_service_has"),
        "success"
      );
    } catch (error) {
      notification["error"]({
        message: getAll("Error_message"),
        description: getAll("Unfortunately_this_service_2"),
      });
    }
  };
  function statusProduct(status: any) {
    switch (status) {
      case null:
        return <span className="badge bg-info">{getAll("Pending")}</span>;
      case 0:
        return <span className="badge bg-danger">{getAll("Rejected")}</span>;
      case 1:
        return <span className="badge bg-success">{getAll("Accepted")}</span>;
      default:
        return <span className="badge bg-info">{getAll("Pending")}</span>;
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
          {getAll("All")}
        </Menu.Item>
        <Menu.Item
          key="mail"
          onClick={() => setStatusType({ type: "published" })}
        >
          {getAll("Active")}
        </Menu.Item>
        <Menu.Item
          key="app"
          onClick={() => setStatusType({ type: "rejected" })}
        >
          {getAll("Rejected")}
        </Menu.Item>
        <Menu.Item
          key="waiting"
          onClick={() => setStatusType({ type: "pending" })}
        >
          {getAll("PEnding")}
        </Menu.Item>
        <Menu.Item
          key="drafts"
          onClick={() => setStatusType({ type: "drafts" })}
        >
          {getAll("Draft")}
        </Menu.Item>
        <Menu.Item
          key="alipay"
          onClick={() => setStatusType({ type: "paused" })}
        >
          {getAll("Disabled")}
        </Menu.Item>
      </Menu>
      {postsList.length == 0 ? (
        <Result
          status="404"
          title={getAll("You_have_no")}
          subTitle={getAll("You_can_add")}
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
                <th>{getAll("Completed")}</th>
                <th>{getAll("Buyers_number")}</th>
                <th>{getAll("Activation_status")}</th>
                <th>{getAll("Admission_status")}</th>
                <th>{getAll("Tools")}</th>
              </tr>
            </thead>
            <tbody>
              {postsList.map((e: any) => (
                <tr key={e.id}>
                  <td>
                    {e.is_completed == 1 ? (
                      <Link href={`/myproducts/${e.id}`}>
                        <a>{e[which(language)] || "لا يوجد ترجمة"}</a>
                      </Link>
                    ) : (
                      <p>{e.title}</p>
                    )}
                  </td>
                  <td>
                    {e.is_completed == 0 ? (
                      <span className="badge bg-danger">{getAll("No")}</span>
                    ) : (
                      <span className="badge bg-success">{getAll("Yes")}</span>
                    )}
                  </td>
                  <td>{e.count_buying}</td>
                  <td>
                    {e.is_active == 0 ? (
                      <span className="badge bg-danger">
                        {getAll("Disabled")}
                      </span>
                    ) : (
                      <span className="badge bg-success">
                        {getAll("Abled")}
                      </span>
                    )}
                  </td>
                  <td>{statusProduct(e.status)}</td>
                  <td>
                    <Tooltip title={getAll("Delete_this_service")}>
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
                          <Tooltip title={getAll("Able_this_service")}>
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
                          <Tooltip title={getAll("Disable_this_service")}>
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
                    <Tooltip title={getAll("Service_editing")}>
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
const which = (language) => {
  switch (language) {
    default:
      return "title";
    case "ar":
      return "title";
    case "en":
      return "title_en";
    case "fr":
      return "title_fr";
  }
};
MyProducts.propTypes = {
  setStatusType: PropTypes.func,
  postsList: PropTypes.any,
};
