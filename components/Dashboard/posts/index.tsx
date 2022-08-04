import API from "../../../config";
import { motion } from "framer-motion";
import { ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { Table } from "antd";
import Pagination from "react-js-pagination";
import RejectProductCause from "@/components/RejectProductCause";
import ReplyContactModal from "@/components/ReplyContactModal";
import EmailModalCause from "@/components/EmailModalCause";
import DisactiveProductCause from "@/components/DisactiveProductCause";
import { generatecolumns } from "./PostsService";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";

function index({
  postsList = { last_page: 1, per_page: 10, data: [] },
  status,
}: any): ReactElement {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(router?.query?.pageNumber);
  const [cause, setCause] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [isEmailModalVisible, setIsEmailModalVisible] = useState(false);
  const [isDisactiveModalVisible, setIsDisactiveModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedUser, setSelectedUser] = useState("");
  const token = Cookies.get("token_dash");

  const columns: any = generatecolumns({
    status,
    callbacks: {
      activateProduct,
      onRejectClick,
      onDisactiveClick,
      onSendEmailClick,
    },
  });

  useEffect(() => {
    setIsLoading(false);
  }, [postsList]);
  function onSearchSubmit(search) {
    router.push(`${router.pathname}?pageNumber=${pageNumber}&search=${search}`);
  }
  function onSendEmailClick(post) {
    setSelectedUser(post.profile_seller.profile.user);
    setIsReplyModalVisible(true);
  }

  async function activateProduct(id: any) {
    setIsLoading(true);
    try {
      const res: any = await API.post(
        `dashboard/products/${id}/activeProduct`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status == 200) {
        setIsLoading(false);
        router.reload();
      }
    } catch (error) {
      setIsLoading(false);
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
      await API.post(
        `dashboard/products/${selectedProductId}/disactive_product`,
        { cause },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsDisactiveModalVisible(false);
      router.reload();
    } catch (err) {
      console.log(err);
    }
  }

  async function rejectProduct(body) {
    setIsLoading(true);
    try {
      const res: any = await API.post(
        `dashboard/products/${selectedProductId}/rejectProduct`,
        body,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (res.status === 200) {
        setIsLoading(false);
        setIsModalVisible(false);
        //router.reload()
      }
    } catch (error) {
      setIsLoading(false);
    }
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
          dataSource={postsList?.data}
          pagination={false}
          bordered
          size="small"
        />
        <div>
          <hr />
          <Pagination
            activePage={Number(pageNumber)}
            itemsCountPerPage={postsList?.per_page || 0}
            totalItemsCount={postsList?.per_page * postsList?.last_page}
            onChange={(pageNumber) => {
              setIsLoading(true);
              router.push(`/tw-admin/posts?pageNumber=${pageNumber}`);
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
