import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useState } from "react";
import Link from "next/link";
import {Timeline } from "antd";
import { Alert } from "../Alert/Alert";
import LastSeen from "../LastSeen";
import { SalesActions } from "@/store/sales/salesActions";
import { ChatActions } from "@/store/chat/chatActions";
import Loading from "../Loading";
import ButtonAction from "./ButtonAction";
import SingleConversation from "../Conversations/Conversation";



const fileTypes = {
  png: { color: "orange", icon: "image" },
  jpg: { color: "orange", icon: "image" },
  gif: { color: "orange", icon: "image" },
  psd: { color: "orange", icon: "image" },
  zip: { color: "plum", icon: "folder_zip" },
  rar: { color: "plum", icon: "folder_zip" },
  mp3: { color: "springgreen", icon: "headphones" },
  wma: { color: "springgreen", icon: "headphones" },
  aac: { color: "springgreen", icon: "headphones" },
  ogg: { color: "springgreen", icon: "headphones" },
  wav: { color: "springgreen", icon: "headphones" },
  mp4: { color: "yellowgreen", icon: "smart_display" },
  avi: { color: "yellowgreen", icon: "smart_display" },
  mpg: { color: "yellowgreen", icon: "smart_display" },
  pdf: { color: "maroon", icon: "picture_as_pdf" },
};


const switchFileTypes = (type: any) => {
  return Object.prototype.hasOwnProperty.call(fileTypes, type) ? (
    <span
      className="material-icons material-icons-outlined"
      style={{ color: fileTypes[type].color }}
    >
      {fileTypes[type].icon}
    </span>
  ) : (
    <span className="material-icons material-icons-outlined">description</span>
  );
};



const Item = ({
  id,
  type,
  ShowItem,
}: {
  id: number;
  type: string;
  ShowItem: any;
}) => {
  const {
    languages: { getAll},
  } = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);
  const veriedEmail = user.email_verified;

  const [message, setMessage] = useState("");
  const [createConversationLoading, setCreateConversationLoading] =
    useState(false);
 
  const createConversation = async (id: any) => {
    setCreateConversationLoading(true);
    const receiver_id = type=='purchases'
    ?ShowItem.profile_seller?.profile.user?.id
    :ShowItem?.order?.cart?.user.id
    try {
      await dispatch(
        ChatActions.createChat({
          id,
          body: {
            initial_message: message,
            receiver_id,
            title: ShowItem?.title,
          },
        })
      ).unwrap();
      dispatch(SalesActions.getOneSale({ id }));
    } catch (error) {
      setCreateConversationLoading(false);
    }
  };


  const statusLabel = (status: any) => {
    switch (status) {
      case 0:
        return <span className="badge bg-secondary">{getAll("PEnding")}</span>;

      case 1:
        return (
          <span className="badge bg-warning">{getAll("Cancelled_by_the")}</span>
        );

      case 2:
        return (
          <span className="badge bg-danger">{getAll("Refused_by_the")}</span>
        );

      case 3:
        return (
          <span className="badge bg-info text-dark">
            {getAll("In_progress")}
          </span>
        );

      case 4:
        return (
          <span className="badge bg-warning">
            {getAll("Buyer_cancellation_request")}
          </span>
        );

      case 5:
        return (
          <span className="badge bg-warning">
            {getAll("Cancelled_by_the_seller")}
          </span>
        );

      case 6:
        return <span className="badge bg-primary">{getAll("In_receipt")}</span>;

      case 7:
        return (
          <span className="badge bg-success text-light">
            {getAll("Completed")}
          </span>
        );

      case 8:
        return (
          <span className="badge bg-red text-light">{getAll("Suspended")}</span>
        );

      case 9:
        return (
          <span className="badge bg-light text-dark">
            {getAll("Amendment_request_status")}
          </span>
        );

      case 10:
        return (
          <span className="badge bg-danger text-light">
            {getAll("Suspended_due_to")}
          </span>
        );

      default:
        return (
          <span className="badge bg-info text-dark">{getAll("PEnding")}</span>
        );
    }
  };

  function durationFunc() {
    if (ShowItem.duration == 1) {
      return getAll("One_day");
    }
    if (ShowItem.duration == 2) {
      return getAll("2_days");
    }
    if (ShowItem.duration > 2 && ShowItem.duration < 11) {
      return ShowItem.duration + getAll("Days");
    }
    if (ShowItem.duration >= 11) {
      return ShowItem.duration + getAll("Day");
    }
  }
  console.log(ShowItem);
  return (
    <>
      {veriedEmail && (
        <div style={{ backgroundColor: "#f6f6f6" }} className="my-3">
          {ShowItem.loading && <Loading />}
          <div className="row py-4 justify-content-center">
            <div className="col-md-12" style={{ maxWidth: 1300 }}>
              <div className="app-bill" style={{ backgroundColor: "#f6f6f6" }}>
                <div className="row">
                  <div className="col-lg-3">
                    <div
                      style={{
                        backgroundColor: "#fff",
                        padding: 9,
                        marginBottom: 7,
                      }}
                    >
                      <div className="aside-header">
                        <h3 className="title">{getAll("Seller")}</h3>
                      </div>
                      <Link
                        href={`/u/${
                          ShowItem &&
                          ShowItem.profile_seller?.profile.user?.username
                        }`}
                      >
                        <a className="order-user-info d-flex flex-center">
                          <div className="order-user-avatar">
                            <img
                              src={
                                ShowItem &&
                                ShowItem.profile_seller?.profile.avatar_path
                              }
                              width={50}
                              height={50}
                            />
                          </div>
                          <div className="order-user-content">
                            <h2 className="user-title">
                              {ShowItem &&
                                ShowItem.profile_seller?.profile.full_name}
                            </h2>
                            <p className="meta">
                              <span className="badge bg-light text-dark">
                                {ShowItem &&
                                  ShowItem.profile_seller?.level.name}
                              </span>
                            </p>
                          </div>
                        </a>
                      </Link>
                    </div>

                    <div
                      style={{
                        backgroundColor: "#fff",
                        padding: 9,
                        marginBottom: 7,
                      }}
                    >
                      <div className="aside-header">
                        <h3 className="title">{getAll("Buyer")}</h3>
                      </div>
                      <Link
                        href={`/u/${
                          type == 'sales'
                            ? ShowItem.order.cart.user.username
                            : ShowItem.profile_seller.profile.user?.username
                        }`}
                      >
                        <a className="order-user-info d-flex flex-center">
                          <div className="order-user-avatar">
                            <img
                              src={
                                ShowItem &&
                                ShowItem.order.cart.user.profile.avatar_path
                              }
                              width={50}
                              height={50}
                            />
                          </div>
                          <div className="order-user-content">
                            <h2 className="user-title">
                              {ShowItem &&
                                ShowItem.order.cart.user.profile.full_name}
                            </h2>
                            <p className="meta">
                              <span className="badge bg-light text-dark">
                                {ShowItem &&
                                  ShowItem.order.cart.user.profile.level[
                                    `name`
                                  ]}
                              </span>
                            </p>
                          </div>
                        </a>
                      </Link>
                    </div>
                    {ShowItem && ShowItem.attachments && (
                      <>
                        <div style={{ backgroundColor: "#fff", padding: 9 }}>
                          <div className="aside-header">
                            <h3 className="title">
                              {getAll("Project_attachments")}
                            </h3>
                          </div>
                          <div className="aside-attachments">
                            <Timeline>
                              {ShowItem.attachments.map((e: any, i) => (
                                <Timeline.Item
                                  key={i} //
                                  dot={<>{switchFileTypes(e.mime_type)}</>}
                                >
                                  <a
                                    href={e.mime_type}
                                    rel="noreferrer"
                                    target="_blank"
                                  >
                                    {getAll("Upload_file")}
                                    {i + 1}#
                                  </a>
                                </Timeline.Item>
                              ))}
                            </Timeline>
                          </div>
                        </div>
                      </>
                    )}

                    <div style={{ backgroundColor: "#fff", marginTop: 10 }}>
                      <div className="order-notes p-1">
                        <h3 className="title">
                          {getAll("Important_notes_to")}
                        </h3>
                        <ul className="order-notes-list">
                          <li>
                            {getAll("Do_not_communicate")}{" "}
                            {getAll("Timwoork_protects_you")}
                          </li>
                          <li>{getAll("Never_provide_under")}</li>
                          <li>{getAll("Do_not_provide")}</li>
                          <li>{getAll("Providing_other_users")}</li>
                          <li>{getAll("The_messages_are")}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    {ShowItem && ShowItem.status == 4 && (
                      <>
                        {ShowItem &&
                          ShowItem.item_rejected &&
                          ShowItem.item_rejected.status == 2 && (
                            <Alert type="error">
                              <p className="text">{getAll("You_must_reach")}</p>
                            </Alert>
                          )}
                      </>
                    )}
                    <div className="aside-header">
                      <h3 className="title">{ShowItem.title}</h3>
                    </div>
                    <div style={{ backgroundColor: "#fff", padding: 9 }}>
                      <div className="aside-header">
                        <h3 className="title">
                          {getAll("Instructions_to_the")}
                        </h3>
                      </div>
                      <div className="seller-info">
                        <div
                          className="timwoork-single-product-detailts"
                          dangerouslySetInnerHTML={{
                            __html:
                              ShowItem?.profile_seller?.products[0] &&
                              ShowItem?.profile_seller?.products[0]
                                .buyer_instruct,
                          }}
                        />
                      </div>
                    </div>
                    {ShowItem && ShowItem.conversation && (
                      <>
                       <SingleConversation id = {ShowItem.conversation.id}/>
                      </>
                    )}
                    {ShowItem && ShowItem.conversation == null && (
                      <>
                        <div className="conversation-start">
                          <div className="icon">
                            <span className="material-icons material-icons-outlined">
                              forum
                            </span>
                          </div>
                          <h3 className="title">
                            {getAll("Contact_the_buyer")}
                          </h3>
                          <p className="text">{getAll("Try_to_agree")}</p>
                          <textarea
                            id="input-initial_message"
                            name="initial_message"
                            placeholder={getAll("Message_text")}
                            className={"timlands-inputs mt-2"}
                            autoComplete="off"
                            style={{ minHeight: 80 }}
                            onChange={(e: any) => setMessage(e.target.value)}
                          ></textarea>
                          <div className="mt-3 conversion-btn">
                            <button
                              type="button"
                              disabled={createConversationLoading}
                              onClick={() =>
                                createConversation(ShowItem && ShowItem.id)
                              }
                              className="btn butt-lg butt-primary"
                            >
                              {getAll("Create_a_conversation")}
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                  <div className="col-lg-3">
                    <ButtonAction type={type} ShowItem={ShowItem} id={id} />
                    <div style={{ backgroundColor: "#fff", padding: 9 }}>
                      <div className="aside-header">
                        <h3 className="title">{getAll("Operation_details")}</h3>
                      </div>
                      <table className="table table-borderless">
                        <tbody>
                          <tr>
                            <th>{getAll("Operation_number1")}</th>
                          </tr>
                          <tr>
                            <td>{ShowItem.uuid}</td>
                          </tr>
                          <tr>
                            <th>{getAll("Operation_status")}</th>
                          </tr>
                          <tr>
                            <td>{statusLabel(ShowItem.status)}</td>
                          </tr>
                          <tr>
                            <th>{getAll("Date_of_operation")}</th>
                          </tr>
                          <tr>
                            <td>
                              <LastSeen date={ShowItem.created_at} />
                            </td>
                          </tr>
                          <tr>
                            <th>{getAll("Completion_time")}</th>
                          </tr>
                          <tr>
                            <td>{durationFunc()}</td>
                          </tr>
                          <tr>
                            <th>{getAll("Order_price")}</th>
                          </tr>
                          <tr>
                            <td>${ShowItem.price_product}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Item;
