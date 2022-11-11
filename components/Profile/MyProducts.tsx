import { MyProductsActions } from "store/myProducts/myProductsActions";
import Link from "next/link";
import { Spin, Result, Menu, Tooltip, Button, notification } from "antd";
import {
  DeleteOutlined,
  PauseCircleOutlined,
  EditOutlined,
  PlayCircleOutlined,
} from "@ant-design/icons";
import router from "next/router";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { useEffect } from "react";

export default function MyProducts() {
  const dispatch = useAppDispatch();
  const {
    languages: { getAll },
    myProducts: { products },
  } = useAppSelector((state) => state);
  const { type, loading, data, loaded } = products;
  useEffect(() => {
    if (loaded && type === "") return;
    dispatch(MyProductsActions.getMyProducts({ params: { type } }));
  }, [type, loaded]);

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
            await dispatch(
              MyProductsActions.deleteProduct({ id, params: { type } })
            ).unwrap();
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
      await dispatch(
        MyProductsActions.updateProduct({
          is_active: false,
          id,
          params: { type },
        })
      ).unwrap();
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
      await dispatch(
        MyProductsActions.updateProduct({
          is_active: true,
          id,
          params: { type },
        })
      ).unwrap();

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
    <Spin spinning={loading}>
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
        <Menu mode="horizontal" selectedKeys={[type]}>
          <Menu.Item
            key="all"
            onClick={() => dispatch(MyProductsActions.changeType("all"))}
          >
            {getAll("All")}
          </Menu.Item>
          <Menu.Item
            key="published"
            onClick={() => dispatch(MyProductsActions.changeType("published"))}
          >
            {getAll("Active")}
          </Menu.Item>
          <Menu.Item
            key="rejected"
            onClick={() => dispatch(MyProductsActions.changeType("rejected"))}
          >
            {getAll("Rejected")}
          </Menu.Item>
          <Menu.Item
            key="pending"
            onClick={() => dispatch(MyProductsActions.changeType("pending"))}
          >
            {getAll("PEnding")}
          </Menu.Item>
          <Menu.Item
            key="drafted"
            onClick={() => dispatch(MyProductsActions.changeType("drafted"))}
          >
            {getAll("Draft")}
          </Menu.Item>
          <Menu.Item
            key="paused"
            onClick={() => dispatch(MyProductsActions.changeType("paused"))}
          >
            {getAll("Disabled")}
          </Menu.Item>
        </Menu>
        {data.length == 0 && !loading ? (
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
                {data.map((e: any) => (
                  <tr key={e.id}>
                    <td>
                      {e.is_completed == 1 ? (
                        <Link href={`/myproducts/${e.id}`}>
                          <a>{e.title || "لا يوجد ترجمة"}</a>
                        </Link>
                      ) : (
                        <p>{e.title}</p>
                      )}
                    </td>
                    <td>
                      {e.is_completed == 0 ? (
                        <span className="badge bg-danger">{getAll("No")}</span>
                      ) : (
                        <span className="badge bg-success">
                          {getAll("Yes")}
                        </span>
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
          </div>
        )}
      </div>
    </Spin>
  );
}
