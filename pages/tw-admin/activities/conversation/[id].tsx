import React, { ReactElement, useState, useEffect } from "react";
import PropTypes from "prop-types";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import LastSeen from "@/components/LastSeen";
import Image from "next/image";
import Link from "next/link";
import ConfirmText from "@/components/ConfirmText";
import { notification } from "antd";
import EditModal from "@/components/EditModal";
import { useAppSelector } from "@/store/hooks";
import { useDispatch } from "react-redux";
import { ActivitiesActions } from "@/store/tw-admin/activities/activityActions";
import Loading from "@/components/Loading";

function Single({ query }: any) {
  const [isConfirmText, setIsConfirmText] = useState(false);
  const [selectedMessageId, setSelectedMessageId] = useState(-1);
  const { current_conversation } = useAppSelector(
    (state) => state.dashboardActivitiesSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ActivitiesActions.getOneConversation({ id: query.id }));
  }, []);

  const deleteMsg = async (body) => {
    try {
      const { comment } = body;
      await dispatch(
        ActivitiesActions.deleteMessage({
          id: selectedMessageId,
          cause: comment,
        })
      );
      notification.success({
        message: "تم حذف الرسالة بنجاح",
      });
    } catch {
      () => {};
    }
  };
  const editMsg = async (body) => {
    try {
      const { message, cause } = body;
      const id = selectedMessageId;
      await dispatch(ActivitiesActions.editMessage({ id, cause, message }));
      setIsShowEdit(false);
      notification.success({
        message: "تم تعديل الرسالة بنجاح",
      });
    } catch {
      () => {};
    }
  };
  const [isShowEdit, setIsShowEdit] = useState(false);
  return current_conversation.loading ? (
    <Loading />
  ) : (
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
            current_conversation?.data.conversation.find(
              (elm) => elm.id == selectedMessageId
            ).message
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
            {current_conversation.data.members[0]?.username}
          </a>{" "}
          و{" "}
          <a href="" rel="noreferrer" target="_blank">
            {current_conversation.data.members[1]?.username}
          </a>
        </h2>
      </div>
      <div className="row justify-content-center">
        <div className="col-xl-8">
          <div className="conversation-items">
            <ul className="conversation-items-list">
              {current_conversation.data?.conversation?.map((message) => {
                return (
                  <li key={message.id}>
                    <span
                      className={`item-link user-${
                        current_conversation.data.members[0]?.user_id ==
                        message.user.id
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
                          <Link href={`/user/profile/${message.user.id}`}>
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
