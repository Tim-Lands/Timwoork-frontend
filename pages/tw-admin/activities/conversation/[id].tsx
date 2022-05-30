import React, { ReactElement, useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LastSeen from "@/components/LastSeen";
import Image from "next/image";
import Link from "next/link";
import ConfirmText from "@/components/ConfirmText";
import API from "../../../../config";
import Cookies from "js-cookie";
import { notification } from "antd";
import EditModal from "@/components/EditModal";

function Single({ query }: any) {
  const [isConfirmText, setIsConfirmText] = useState(false);
  const [conversation, setConversation] = useState({ data: [] });
  const [participants, setParticipants] = useState([]);
  const [selectedMessageId, setSelectedMessageId] = useState(-1);
  const token = useRef(Cookies.get("token_dash"));

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const { id } = query;
      const res = await API.get(`dashboard/activities/${id}/conversation`, {
        headers: {
          Authorization: `Bearer ${token.current}`,
        },
      });
      setConversation({ ...conversation, data: res?.data?.data?.conversation });
      setParticipants(res?.data?.data?.members);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  const deleteMsg = async (body) => {
    try {
      const res = await API.post(
        `dashboard/activities/message/${selectedMessageId}/delete`,
        {
          ...body,
        },
        {
          headers: {
            Authorization: `Bearer ${token.current}`,
          },
        }
      );
      if (res.status == 200) {
        setConversation({
          ...conversation,
          data: conversation.data.filter(
            (message) => message.id != selectedMessageId
          ),
        });

        notification.success({
          message: "تم حذف الرسالة بنجاح",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const editMsg = async (body) => {
    try {
      const res = await API.post(
        `dashboard/activities/message/${selectedMessageId}/update`,
        {
          ...body,
        },
        {
          headers: {
            Authorization: `Bearer ${token.current}`,
          },
        }
      );
      if (res.status == 200) {
        setConversation({
          ...conversation,
          data: conversation.data.map((message) =>
            message.id == selectedMessageId
              ? { ...message, message: body.message }
              : message
          ),
        });
        setIsShowEdit(false);
        notification.success({
          message: "تم تعديل الرسالة بنجاح",
        });
      }
    } catch (err) {
      console.log(err);
    }
  };
  const [isShowEdit, setIsShowEdit] = useState(false);
  console.log(conversation);
  return (
    <div className="timlands-panel">
      {isConfirmText && (
        <ConfirmText
          setIsConfirmText={setIsConfirmText}
          text="هل تريد حقا حذف هذه الرسالة؟"
          handleFunc={deleteMsg}
        />
      )}
      {isShowEdit && (
        <EditModal
          setIsConfirmText={setIsShowEdit}
          text={null}
          handleFunc={editMsg}
          title="التعديل على الرسالة"
          msgValues={
            conversation?.data.find((elm) => elm.id == selectedMessageId)
              .message
          }
        />
      )}
      <div className="timlands-panel-header" title={query.id}>
        <h2 className="title">
          <span className="material-icons material-icons-outlined">
            event_repeat
          </span>
          محادثة بين{" "}
          <a href="" rel="noreferrer" target="_blank">
            {participants[0]?.username}
          </a>{" "}
          و{" "}
          <a href="" rel="noreferrer" target="_blank">
            {participants[1]?.username}
          </a>
        </h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-xl-8">
          <div className="conversation-items">
            <ul className="conversation-items-list">
              {conversation?.data?.map((message) => {
                return (
                  <li key={message.id}>
                    <span
                      className={`item-link user-${
                        participants[0]?.user_id == message.user.id
                          ? "from"
                          : "to"
                      }`}
                    >
                      <div className="item-actions d-flex">
                        <button
                          className="btn-item"
                          type="button"
                          onClick={() => {
                            setSelectedMessageId(message.id);
                            setIsShowEdit(true);
                          }}
                        >
                          <span className="material-icons material-icons-outlined">
                            edit
                          </span>
                        </button>
                        <button
                          className="btn-item del"
                          onClick={() => {
                            setSelectedMessageId(message.id);
                            setIsConfirmText(true);
                          }}
                        >
                          <span className="material-icons material-icons-outlined">
                            close
                          </span>
                        </button>
                      </div>
                      <div className="conversation-item-img">
                        <Image src={"/avatar.png"} width={50} height={50} />
                      </div>
                      <div className="conversation-item">
                        <p className="username">
                          <Link href={`/u/${message.user.id}`}>
                            <a>{message.user.username}</a>
                          </Link>
                        </p>
                        <span className="meta">
                          <span className="material-icons material-icons-outlined">
                            schedule
                          </span>
                          <LastSeen date={message.created_at} />
                        </span>
                        <p className="text">{message.message}</p>
                      </div>
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Single;
export async function getServerSideProps({ query }) {
  return { props: { query } };
}
Single.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};
Single.propTypes = {
  query: PropTypes.any,
};
