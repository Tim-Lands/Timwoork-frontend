import { ChatActions } from "@/store/chat/chatActions";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { SalesActions } from "@/store/sales/salesActions";
import { Modal, Progress, Spin, message as AntMessage } from "antd";
import { Alert } from "@/components/Alert/Alert";
import { motion } from "framer-motion";
import router from "next/router";
import { useEffect, useRef, useState } from "react";
import { useFileUpload } from "react-use-file-upload/dist/lib/useFileUpload";
import { PurchasesActions } from "@/store/purchases/purchasesActions";

const ButtonAction = ({
  id,
  ShowItem,
  type,
}: {
  id: any;
  ShowItem: any;
  type: string;
}) => {
  const dispatch = useAppDispatch();
  const {
    languages: { getAll, language },
  } = useAppSelector((state) => state);
  const user = useAppSelector((state) => state.user);
  const inputRef: any = useRef();

  const [imageProgress, setImageProgress] = useState(0);
  // Send Message function

  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
    }
  }, [user]);

  const { files, fileNames, totalSize, setFiles, removeFile } = useFileUpload();

  const [acceptedBySellerLoadingLoading, setAcceptedBySellerLoading] =
    useState(false);
  const [rejectedBySellerLoading, setRejectedBySellerLoading] = useState(false);
  const [
    acceptCancelRequestBySellerLoading,
    setAcceptCancelRequestBySellerLoading,
  ] = useState(false);
  const [
    rejectCancelRequestBySellerLoading,
    setRejectCancelRequestBySellerLoading,
  ] = useState(false);
  const [
    resolveConflictBetweenRejectedLoading,
    setResolveConflictBetweenRejectedLoading,
  ] = useState(false);
  const [acceptModifiedSellerLoading, setAcceptModifiedSellerLoading] =
    useState(false);
  const [rejectModifiedSellerLoading, setRejectModifiedSellerLoading] =
    useState(false);
  const [dileveredSellerLoading, setDileveredSellerLoading] = useState(false);
  const [
    resolveConflictBetweenThemModifiedLoading,
    setResolveConflictBetweenThemModifiedLoading,
  ] = useState(false);
  const [messageErrors, setMessageErrors]: any = useState({});
  const [message, setMessage] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleDilevered, setModalVisibleDilevered] = useState(false);
  const [isModalVisibleReject, setModalVisibleReject] = useState(false);
  const [isModalVisibleRejectModified, setModalVisibleRejectModified] =
    useState(false);
  const [BySellerMSGLoading, setBySellerMSGLoading]: any = useState(false);

  const dilevered_by_seller = async (id: any) => {
    setDileveredSellerLoading(true);
    try {
      const attachments: any = new FormData();
      files.map((file: any) => attachments.append("item_attachments[]", file));

      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/dilevered_by_seller`,
          body: attachments,
          headers: {
            onUploadProgress: (uploadEvent) => {
              setImageProgress(
                Math.round((uploadEvent.loaded / uploadEvent.total) * 100)
              );
            },
          },
        })
      ).unwrap();
    } catch (error) {
      setDileveredSellerLoading(false);
    }
  };

  const reject_modified_by_seller = async (id: any) => {
    setRejectModifiedSellerLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/reject_modified_by_seller`,
        })
      ).unwrap();
    } catch (error) {
      setRejectModifiedSellerLoading(false);
    }
  };

  const reject_cancel_request_by_seller = async (id: any) => {
    setRejectCancelRequestBySellerLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/reject_cancel_request_by_seller`,
        })
      ).unwrap();

      rejectMessageCause(message);
    } catch (error) {
      setRejectCancelRequestBySellerLoading(false);
    }
  };

  const rejectMessageCause = async (messageText: any, typeCause = 2) => {
    setBySellerMSGLoading(true);
    try {
      const id = ShowItem?.conversation?.id;
      const conversation: any = new FormData();
      conversation.append("type", typeCause);
      conversation.append("message", messageText);
      await dispatch(
        ChatActions.sendMessage({
          id,
          body: conversation,
          headers: {
            headers: {
              "X-LOCALIZATION": language,
            },
          },
        })
      ).unwrap();
      setBySellerMSGLoading(false);
      setIsModalVisible(false);
      setModalVisibleRejectModified(false);
      setModalVisibleReject(false);
    } catch (error) {
      if (error.errors) {
        setMessageErrors(error.errors);
      }
    }
  };

  const item_rejected_by_seller = async (id: any) => {
    setRejectedBySellerLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/item_rejected_by_seller`,
        })
      ).unwrap();
      rejectMessageCause(message);
      setModalVisibleReject(false);
    } catch (error) {
      setRejectedBySellerLoading(false);
    }
  };

  const item_accepted_by_seller = async (id: any) => {
    setAcceptedBySellerLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/item_accepted_by_seller`,
        })
      ).unwrap();
    } catch (error) {
      setAcceptedBySellerLoading(false);
    }
  };

  //  قبول طلب الالغاء الخدمة من قبل البائع
  const accept_cancel_request_by_seller = async (id: any) => {
    setAcceptCancelRequestBySellerLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/accept_cancel_request_by_seller`,
        })
      ).unwrap();
    } catch (error) {
      setAcceptCancelRequestBySellerLoading(false);
    }
  };
  // حل النزاع بين الطرفين في حالة الغاء الطلبية

  const resolve_the_conflict_between_them_in_rejected = async (id: any) => {
    setResolveConflictBetweenRejectedLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/resolve_the_conflict_between_them_in_rejected`,
        })
      ).unwrap();
    } catch (error) {
      setResolveConflictBetweenRejectedLoading(false);
    }
  };
  // قبول تعديل الخدمة من قبل المشتري
  const accept_modified_by_seller = async (id: any) => {
    setAcceptModifiedSellerLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/accept_modified_by_seller`,
        })
      ).unwrap();
    } catch (error) {
      setAcceptModifiedSellerLoading(false);
    }
  };

  // رفض تعديل الخدمة من قبل البائع

  const resolve_the_conflict_between_them_in_modified = async (id: any) => {
    setResolveConflictBetweenThemModifiedLoading(true);
    try {
      await dispatch(
        SalesActions.updateSale({
          id,
          query: `api/order/items/${id}/resolve_the_conflict_between_them_in_modified`,
        })
      ).unwrap();
    } catch (error) {
      setResolveConflictBetweenThemModifiedLoading(false);
    }
  };
  // إنشاء محادثة جديدة بين البائع والمشتري

  // دالة إرسال الرسالة

  const SalesButton = (props: { status: number; id: number }) => {
    const {
      languages: { getAll },
    } = useAppSelector((state) => state);
    const { status } = props;

    switch (status) {
      case 0:
        return (
          <>
            <button
              disabled={acceptedBySellerLoadingLoading}
              onClick={() => item_accepted_by_seller(ShowItem.id)}
              className="btn butt-md butt-green mx-1 flex-center-just"
            >
              <span className="material-icons material-icons-outlined">
                done_all
              </span>{" "}
              {getAll("Request_accept")}
            </button>
            <button
              disabled={rejectedBySellerLoading}
              onClick={() => setModalVisibleReject(true)}
              className="btn butt-md butt-red mx-1 flex-center-just"
            >
              <span className="material-icons material-icons-outlined">
                highlight_off
              </span>{" "}
              {getAll("Request_rejection")}
            </button>
          </>
        );
      case 1:
        return (
          <>
            <div className="box-note red">
              <p className="text">{getAll("This_operation_was ")}</p>
            </div>
          </>
        );
      case 2:
        return (
          <div className="box-note warning">
            <p className="text">{getAll("You_have_rejected")}</p>
          </div>
        );
      case 3:
        console.log("in case 3");
        return (
          <>
            <div className="order-uploader-files">
              <div className="uploader-header">
                <h3 className="title">{getAll("Attach_files_and")}</h3>
              </div>
              {imageProgress !== 0 && <Progress percent={imageProgress} />}
              <div className="form-conainer">
                <ul className="attachment-list-items">
                  {fileNames.map((name) => (
                    <motion.li
                      initial={{ y: -5, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      key={name}
                    >
                      <span className="name-file">{name}</span>
                      <span
                        className="remove-icon"
                        onClick={() => removeFile(name)}
                      >
                        <i className="fa fa-times" />
                      </span>
                    </motion.li>
                  ))}
                </ul>
                {files.length == 0 && (
                  <div className="select-files">
                    <p className="text">{getAll("You_can_choose")}</p>
                  </div>
                )}
                {files.length > 0 && (
                  <ul className="files-proprieties">
                    <li>
                      <strong>{getAll("Overall_size")}</strong>
                      {totalSize}
                    </li>
                  </ul>
                )}
              </div>
            </div>
            <button
              className="btn butt-md butt-primary2 mx-1 flex-center-just"
              onClick={() => inputRef.current.click()}
            >
              <span className="material-icons material-icons-outlined">
                file_upload
              </span>{" "}
              {getAll("Add_files")}
            </button>
            <input
              ref={inputRef}
              type="file"
              multiple
              style={{ display: "none" }}
              onChange={(e: any) => setFiles(e)}
            />
            <button
              disabled={dileveredSellerLoading}
              onClick={() => setModalVisibleDilevered(true)}
              className="btn butt-md butt-primary mx-1 flex-center-just"
            >
              <span className="material-icons material-icons-outlined">
                file_upload
              </span>{" "}
              {getAll("Deliver_order")}{" "}
            </button>
          </>
        );
      case 4:
        return (
          <>
            {ShowItem.item_rejected.status == 0 && (
              <>
                <button
                  disabled={acceptCancelRequestBySellerLoading}
                  onClick={() => accept_cancel_request_by_seller(ShowItem.id)}
                  className="btn butt-md butt-green mx-1 flex-center-just"
                >
                  <span className="material-icons material-icons-outlined">
                    done_all
                  </span>
                  {getAll("Cancellation_request_accept")}
                </button>
                <button
                  disabled={rejectCancelRequestBySellerLoading}
                  onClick={() => setIsModalVisible(true)}
                  className="btn butt-md butt-red mx-1 flex-center-just"
                >
                  <span className="material-icons material-icons-outlined">
                    highlight_off
                  </span>
                  {getAll("Cancellation_request_rejection")}
                </button>
              </>
            )}
          </>
        );
      case 5:
        return (
          <div className="box-note warning">
            <p className="text">{getAll("You_have_cancelled")}</p>
          </div>
        );
      case 6:
        return (
          <div className="box-note primary">
            <p className="text">{getAll("Operation_receipt_in")}</p>
          </div>
        );
      case 7:
        return (
          <div className="box-note green-fill">
            <p className="text">
              <strong>{getAll("Complete_operation")}</strong>
            </p>
          </div>
        );
      case 8:
        return (
          <button
            disabled={resolveConflictBetweenRejectedLoading}
            onClick={() =>
              resolve_the_conflict_between_them_in_rejected(ShowItem.id)
            }
            className="btn butt-md butt-green mx-1 flex-center-just"
          >
            <span className="material-icons material-icons-outlined">
              highlight_off
            </span>
            {getAll("Dispute_resolved")}
          </button>
        );
      case 9:
        return (
          <>
            {ShowItem && ShowItem.item_modified.status == 0 && (
              <>
                <button
                  disabled={acceptModifiedSellerLoading}
                  onClick={() => accept_modified_by_seller(ShowItem.id)}
                  className="btn butt-md butt-green mx-1 flex-center-just"
                >
                  <span className="material-icons material-icons-outlined">
                    done_all
                  </span>{" "}
                  {getAll("Amendment_request_receipt")}
                </button>
                <button
                  disabled={rejectModifiedSellerLoading}
                  onClick={() => setModalVisibleRejectModified(true)}
                  className="btn butt-md butt-red mx-1 flex-center-just"
                >
                  <span className="material-icons material-icons-outlined">
                    highlight_off
                  </span>{" "}
                  {getAll("Reject_the_amendment")}
                </button>
              </>
            )}
          </>
        );
      case 10:
        return (
          <>
            <div className="box-note red">
              <p className="text">{getAll("If_you_reach")}</p>
            </div>
            <button
              disabled={resolveConflictBetweenThemModifiedLoading}
              onClick={() =>
                resolve_the_conflict_between_them_in_modified(ShowItem.id)
              }
              className="btn butt-md butt-green mx-1 flex-center-just"
            >
              <span className="material-icons material-icons-outlined">
                highlight_off
              </span>
              {getAll("Dispute_resolved")}
            </button>
          </>
        );
      default:
        console.log(status);
        return <p>sharaffffff</p>;
    }
  };

  const SalesModals = () => {
    return (
      <>
        <Modal
          title={getAll("Rejection_reason")}
          visible={isModalVisibleReject}
          okText={getAll("I’m_sure")}
          onOk={() => item_rejected_by_seller(ShowItem?.id)}
          onCancel={() => setModalVisibleReject(false)}
          cancelText={getAll("Cancel")}
        >
          <Spin spinning={BySellerMSGLoading}>
            <div className="timlands-form">
              <label htmlFor="message_type" className="form-text">
                {getAll("Write_the_reason")}
              </label>
              <div
                className="relative-form d-flex"
                style={{ position: "relative", minHeight: 60 }}
              >
                <input
                  id="input-buyer_instruct"
                  name="buyer_instruct"
                  placeholder={getAll("Write_the_reason")}
                  className={"timlands-inputs"}
                  autoComplete="off"
                  value={message}
                  onChange={(e: any) => setMessage(e.target.value)}
                />
              </div>
              {messageErrors && messageErrors.message && (
                <motion.div
                  initial={{ y: -6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="timlands-form-note form-note-error"
                >
                  <p className="text">{messageErrors.message[0]}</p>
                </motion.div>
              )}
            </div>
          </Spin>
        </Modal>
        <Modal
          title={getAll("Rejection_reason")}
          visible={isModalVisible}
          okText={getAll("I’m_sure")}
          onOk={() => reject_cancel_request_by_seller(ShowItem?.id)}
          onCancel={() => setIsModalVisible(false)}
          cancelText={getAll("Cancel")}
        >
          <Spin spinning={BySellerMSGLoading}>
            <div className="timlands-form">
              <label htmlFor="message_type" className="form-text">
                {getAll("Write_the_reason")}
              </label>
              <div
                className="relative-form d-flex"
                style={{ position: "relative", minHeight: 60 }}
              >
                <input
                  id="input-buyer_instruct"
                  name="buyer_instruct"
                  placeholder={getAll("Write_the_reason")}
                  className={"timlands-inputs"}
                  autoComplete="off"
                  value={message}
                  onChange={(e: any) => setMessage(e.target.value)}
                />
              </div>
              {messageErrors && messageErrors.message && (
                <motion.div
                  initial={{ y: -6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="timlands-form-note form-note-error"
                >
                  <p className="text">{messageErrors.message[0]}</p>
                </motion.div>
              )}
            </div>
          </Spin>
        </Modal>
        <Modal
          title={getAll("Rejection_reason")}
          visible={isModalVisibleRejectModified}
          okText={getAll("I’m_sure")}
          onOk={() => reject_modified_by_seller(ShowItem?.id)}
          onCancel={() => setModalVisibleRejectModified(false)}
          cancelText={getAll("Cancel")}
        >
          <Spin spinning={BySellerMSGLoading}>
            <div className="timlands-form">
              <label htmlFor="message_type" className="form-text">
                {getAll("Write_the_cancellation")}
              </label>
              <div
                className="relative-form d-flex"
                style={{ position: "relative", minHeight: 60 }}
              >
                <input
                  id="input-buyer_instruct"
                  name="buyer_instruct"
                  placeholder={getAll("Write_the_cancellation")}
                  className={"timlands-inputs"}
                  autoComplete="off"
                  value={message}
                  onChange={(e: any) => setMessage(e.target.value)}
                />
              </div>
              {messageErrors && messageErrors.message && (
                <motion.div
                  initial={{ y: -6, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="timlands-form-note form-note-error"
                >
                  <p className="text">{messageErrors.message[0]}</p>
                </motion.div>
              )}
            </div>
          </Spin>
        </Modal>
        <Modal
          title={getAll("Confirmation_message")}
          visible={isModalVisibleDilevered}
          okText={getAll("I’m_sure")}
          onOk={() => dilevered_by_seller(ShowItem?.id)}
          onCancel={() => setModalVisibleDilevered(false)}
          cancelText={getAll("Cancel")}
        >
          <Alert type="error">{getAll("Are_you_sure")}</Alert>
        </Modal>
      </>
    );
  };

  const PurchasesButton = (props: { status: number; id: number }) => {
    const [cancelledBuyerLoading, setCancelledBuyerLoading] = useState(false);
    const [requestCancelItemBuyerLoading, setRequestCancelItemBuyerLoading] =
      useState(false);
    const [acceptedDeliveryBuyerLoading, setAcceptedDeliveryBuyerLoading] =
      useState(false);
    const [requestModifiedBuyerLoading, setRequestModifiedBuyerLoading] =
      useState(false);

    const dispatch = useAppDispatch();
    const item_cancelled_by_buyer = async (id: any) => {
      setCancelledBuyerLoading(true);
      try {
        await dispatch(
          PurchasesActions.updatePurchase({
            id,
            query: `api/order/items/${id}/item_cancelled_by_buyer`,
          })
        ).unwrap();
        AntMessage.success("done");
      } catch (error) {
        setCancelledBuyerLoading(false);
      }
    };

    const request_cancel_item_by_buyer = async (id: any) => {
      setRequestCancelItemBuyerLoading(true);
      try {
        await dispatch(
          PurchasesActions.updatePurchase({
            id,
            query: `api/order/items/${id}/request_cancel_item_by_buyer`,
          })
        ).unwrap();
        AntMessage.success("done");
      } catch (error) {
        setRequestCancelItemBuyerLoading(false);
      }
    };

    const accepted_delivery_by_buyer = async (id: any) => {
      setAcceptedDeliveryBuyerLoading(true);
      try {
        await dispatch(
          PurchasesActions.updatePurchase({
            id,
            query: `api/order/items/${id}/accepted_delivery_by_buyer`,
          })
        ).unwrap();
        AntMessage.success("done");
      } catch (error) {
        setAcceptedDeliveryBuyerLoading(false);
      }
    };

    const request_modified_by_buyer = async (id: any) => {
      setRequestModifiedBuyerLoading(true);
      try {
        await dispatch(
          PurchasesActions.updatePurchase({
            id,
            query: `api/order/items/${id}/request_modified_by_buyer`,
          })
        ).unwrap();
        AntMessage.success("done");
      } catch (error) {
        setRequestModifiedBuyerLoading(false);
      }
    };

    const { status } = props;
    switch (status) {
      case 0:
        return (
          <button
            disabled={cancelledBuyerLoading}
            onClick={() => item_cancelled_by_buyer(ShowItem.id)}
            className="btn butt-md butt-red mx-1 flex-center-just"
          >
            <span className="material-icons material-icons-outlined">
              highlight_off
            </span>{" "}
            {getAll("Cancel_your_purchase")}
          </button>
        );
      case 1:
        return (
          <span className="badge bg-success">
            {getAll("You’ve_cancelled_it")}
          </span>
        );
      case 2:
        return (
          <span className="badge bg-warning">{getAll("This_order_was")}</span>
        );
      case 3:
        return (
          <button
            disabled={requestCancelItemBuyerLoading}
            onClick={() => request_cancel_item_by_buyer(ShowItem.id)}
            className="btn butt-md butt-red mx-1 flex-center-just"
          >
            <span className="material-icons material-icons-outlined">
              highlight_off
            </span>{" "}
            {getAll("Cancellation_request")}{" "}
          </button>
        );
      case 4:
        return (
          <>
            {ShowItem.item_rejected.status == 0 && (
              <p className="note-text">{getAll("Waiting_for_your")}</p>
            )}
          </>
        );
      case 5:
        return (
          <span className="badge bg-warning">
            {getAll("Cancelled_by_the_seller")}
          </span>
        );
      case 6:
        return (
          <>
            <button
              disabled={acceptedDeliveryBuyerLoading}
              onClick={() => accepted_delivery_by_buyer(ShowItem.id)}
              className="btn butt-md butt-green mx-1 flex-center-just"
            >
              <span className="material-icons material-icons-outlined">
                check_circle_outline
              </span>{" "}
              {getAll("Receipt_accept")}{" "}
            </button>
            <button
              disabled={requestModifiedBuyerLoading}
              onClick={() => request_modified_by_buyer(ShowItem.id)}
              className="btn butt-md butt-primary2 mx-1 flex-center-just"
            >
              <span className="material-icons material-icons-outlined">
                edit
              </span>{" "}
              {getAll("Edit")}{" "}
            </button>
          </>
        );
      case 7:
        return (
          <span className="badge bg-success text-light">
            {getAll("Completed")}
          </span>
        );
      case 8:
        return (
          <>
            <p className="note-text">{getAll("The_seller_has")}</p>
            <div className="box-note red">
              <p className="text">{getAll("Waiting_for_your_2")}</p>
            </div>
          </>
        );
      case 9:
        return (
          <>
            {ShowItem.item_modified.status == 0 && (
              <>
                <div className="box-note warning">
                  <p className="text">{getAll("Waiting_for_the")}</p>
                </div>
              </>
            )}
          </>
        );
      case 10:
        return (
          <div className="box-note warning">
            <p className="text">{getAll("The_amendment_has")}</p>
          </div>
        );
      default:
        return <></>;
    }
  };
  return (
    <>
      {/* <SalesModals /> */}
      <div
        style={{
          backgroundColor: "#fff",
          padding: 9,
          marginBottom: 7,
        }}
      >
        <div className="aside-header">
          <h3 className="title">{getAll("Tools")}</h3>
        </div>
        {type == "purchases" ? (
          <PurchasesButton status={ShowItem?.status} id={id} />
        ) : (
          <>
            <SalesModals />
            <SalesButton status={ShowItem.status} id={id} />
          </>
        )}
      </div>
    </>
  );
};

export default ButtonAction;
