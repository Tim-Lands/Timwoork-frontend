import { motion } from "framer-motion";
import { ReactElement, useState } from "react";
import { message, Table } from "antd";
import Pagination from "react-js-pagination";
import RejectProductCause from "@/components/RejectProductCause";
import ReplyContactModal from "@/components/ReplyContactModal";
import EmailModalCause from "@/components/EmailModalCause";
import DisactiveProductCause from "@/components/DisactiveProductCause";
import { generatecolumns } from "./PostsService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductsActions } from "@/store/tw-admin/products/ProductsActions";
import withReactContent from "sweetalert2-react-content";
import Swal from "sweetalert2";

function index({
  postsList = { last_page: 1, per_page: 10, data: [] },
  onSearchSubmit,
  onPageChange,
  isLoading,
  postsType
}: any): ReactElement {
  const { getAll } = useAppSelector((state) => state.languages);
  const [pageNumber, setPageNumber] = useState(1);
  const [cause, setCause] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [isDisactiveModalVisible, setIsDisactiveModalVisible] = useState(false);
  const [selectedProductId, setSelectedProductId]:any = useState(null);
  const [selectedUser, setSelectedUser] = useState("");

  const dispatch = useAppDispatch()
  console.log('status is ', status, '####')
  const columns: any = generatecolumns(
    {
      status:postsType,
      callbacks: {
        activateProduct,
        onRejectClick,
        onDisactiveClick,
        onSendEmailClick,
        archieveHandle,
        forceDelete,
        restoreArchieved
      },
    },
    getAll
  );

  function onSendEmailClick(post) {
    setSelectedUser(post.profile_seller.profile.user);
    setIsReplyModalVisible(true);
  }

   async function archieveHandle(id,getAll) {  
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
          try{
           dispatch(ProductsActions.archieveOne({id, revalidatedType:postsType}))
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
  
  async function forceDelete(id, getAll) {
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
            dispatch(ProductsActions.deleteProduct({id}))
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
  
  async function restoreArchieved(id, getAll) {
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
            dispatch(ProductsActions.unarchieveOne({id, revalidatedType:postsType}))
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

  async function activateProduct(id: any) {
    try {
      await dispatch(ProductsActions.activateOne({id,revalidatedType:postsType}))
      message.success(getAll('This_service_has'))
    } catch (error) {

      console.log(error)
    }
  }
  async function onRejectClick(id: any) {
    setSelectedProductId(id);
    setIsModalVisible(true);
  }
  async function onDisactiveClick(id: any) {
    setSelectedProductId(id);
    setIsDisactiveModalVisible(true);
  }
  async function disactiveProduct() {
    try {
      await dispatch(ProductsActions.disactivateOne({cause ,id: selectedProductId, revalidatedType:postsType}))
      setIsDisactiveModalVisible(false)
      message.info(getAll('The_service_has_2'))
    } catch (err) {
      console.log(err);
    }
  }

  async function rejectProduct(body) {
    const {cause} = body
    const id = selectedProductId
    const revalidatedType = postsType
    await dispatch(ProductsActions.rejectOne({cause, id, revalidatedType}))
    message.info(getAll('Rejected_succesufully'))
  }
  return (
    <>
      <div className="timlands-panel">
        <div className="timlands-panel-header">
          {isModalVisible && (
            <RejectProductCause
              setIsConfirmText={setIsModalVisible}
              handleFunc={(msg) => rejectProduct(msg)}
              title={getAll("Rejection_reason")}
            />
          )}
          {isDisactiveModalVisible && (
            <DisactiveProductCause
              setIsConfirmText={setIsDisactiveModalVisible}
              title={getAll("Desactivation_reason")}
              msg={cause}
              setMsg={(e) => setCause(e)}
              handleFunc={disactiveProduct}
            />
          )}
          {isEmailModalVisible && (
            <EmailModalCause
              setIsConfirmText={setIsEmailModalVisible}
              title={getAll("User_notification")}
              msg={cause}
              setMsg={(e) => setCause(e.target.value)}
            />
          )}
          {isReplyModalVisible && (
            <ReplyContactModal
              onClose={() => setIsReplyModalVisible(false)}
              user={selectedUser}
              setIsConfirmText={setIsReplyModalVisible}
              title={getAll("Send_e_mail_to")}
            />
          )}
          <h2 className="title">
            <span className="material-icons material-icons-outlined">
              collections_bookmark
            </span>
            {getAll("Services_management")}
          </h2>
        </div>
        <div className="py-3">
          <div className="row">
            <div className="col-md-6">
              <div className="timlands-form">
                <input
                  id="input-sQuery"
                  name="sQuery"
                  placeholder={getAll("Search_in_table")}
                  className="timlands-inputs"
                  onKeyDown={(e) =>
                    e.keyCode === 13 &&
                    onSearchSubmit((event.target as HTMLInputElement).value)
                  }
                />
              </div>
            </div>
          </div>
        </div>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0, y: 29 }}
            animate={{ opacity: 1, y: 0 }}
            className="d-flex py-5 spinner-loader justify-content-center"
          >
            <div className="spinner-border" role="status">
              <span className="visually-hidden">{getAll("Loading")}</span>
            </div>
          </motion.div>
        )}
        <Table
          columns={columns}
          rowKey='id'
          dataSource={postsList?.data}
          pagination={false}
          bordered
          size="small"
        />
        <div>
          <hr />
          <Pagination
            activePage={pageNumber}
            itemsCountPerPage={postsList?.per_page || 0}
            totalItemsCount={postsList?.total}
            onChange={(pageNumber) => {
              onPageChange(pageNumber)
              setPageNumber(pageNumber);
            }}
            pageRangeDisplayed={8}
            itemClass="page-item"
            linkClass="page-link"
            className="productPagination"
            firstPageText={getAll("First_page")}
            lastPageText={getAll("Last_page")}
          />
        </div>
      </div>
    </>
  );
}
export default index;
