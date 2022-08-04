import { ReactElement, useState } from "react";
import DashboardLayout from "@/components/Layout/DashboardLayout";
import PropTypes from "prop-types";
import useSWR from "swr";
import Loading from "@/components/Loading";
import ReplyContactModal from "@/components/ReplyContactModal";
import LastSeen from "@/components/LastSeen";
import { LanguageContext } from "../../../contexts/languageContext/context";
import { useContext } from "react";

function Id({ query }): ReactElement {
  const { getSectionLanguage } = useContext(LanguageContext);
  const getAll = getSectionLanguage();
  const getContactUs = getSectionLanguage("contact_us");
  const { data: postsList }: any = useSWR(`dashboard/contacts/${query.id}`);
  const [isShowReplyModal, setIsShowReplyModal] = useState(false);
  return (
    <>
      {isShowReplyModal && (
        <ReplyContactModal
          onClose={() => setIsShowReplyModal(false)}
          user={postsList?.data}
          setIsConfirmText={setIsShowReplyModal}
          title={getAll("Reply_the_message")}
        />
      )}
      <div className="timlands-panel">
        {!postsList && <Loading />}
        <div className="timlands-panel-header">
          <h2 className="title">{postsList && postsList.data.subject}</h2>
          <div className="header-butt">
            <button
              className="btn butt-sm butt-primary me-auto"
              onClick={() => setIsShowReplyModal(true)}
            >
              {getAll("Reply_the_message")}
            </button>
          </div>
        </div>
        <div className="timlands-table">
          <table className="table">
            <tbody>
              <tr>
                <th>{getAll("Message_date")}</th>
                <td>{postsList && postsList.data.created_at}</td>
              </tr>
              <tr>
                <th>{getAll("Message_author")}</th>
                <td>{postsList && postsList.data.full_name}</td>
              </tr>
              <tr>
                <th>{getAll("E_mail")}</th>
                <td>{postsList && postsList.data.email}</td>
              </tr>
              <tr>
                <th>موقع الأيبي</th>
                <td>{postsList && postsList.data.ip_client}</td>
              </tr>
              <tr>
                <th>{getAll("Object")}</th>
                <td>{postsList && postsList.data.subject}</td>
              </tr>
              <tr>
                <th>{getAll("Message_time")}</th>
                <td>{postsList && postsList.data.email}</td>
              </tr>
              <tr>
                <th>{getAll("Phone_number")}</th>
                <td>{getAll("Waiting_for_it")}</td>
              </tr>
              <tr>
                <th>{getAll("Message_type")}</th>
                <td>
                  {postsList && postsList.data.type_message == 0
                    ? getContactUs("Inquiry")
                    : getContactUs("Complaint")}
                </td>
              </tr>
              <tr>
                <th>{getAll("Messagelink")}</th>
                <td>{postsList && postsList.data.url}</td>
              </tr>
              <tr>
                <th>{getAll("Message_text")}</th>
                <td>{postsList && postsList.data.message}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="justify-content-md-center">
          <div className="timlands-panel-header">
            <h2 className="title">{getAll("Replies")}</h2>
          </div>
          <div className="timlands-panel-item p-2">
            <div className="panel-item-body">
              <h1 className="title" style={{ fontSize: 18 }}>
                aboumegouass@gmail.com
              </h1>
              <p
                className="meta"
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: 12,
                  color: "#777",
                  fontWeight: 200,
                }}
              >
                <span
                  className="material-icons material-icons-outlined ml-1"
                  style={{ fontSize: 15 }}
                >
                  schedule
                </span>
                <LastSeen date={"2022-03-13T13:12:06.000000Z"} />
              </p>
              <p
                className="text"
                style={{
                  margin: 0,
                  fontSize: 14,
                  lineHeight: 1.9,
                  fontWeight: 200,
                }}
              >
                {getAll("This_text_is_2")}
                {getAll("If_you_need")}
              </p>
            </div>
            <div className="panel-item-footer d-flex">
              <div className="absolute-btns">
                <button className="btn butt-xs butt-blue">
                  {getAll("See_details")}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
Id.getLayout = function getLayout(page: any): ReactElement {
  return <DashboardLayout>{page}</DashboardLayout>;
};
export async function getServerSideProps({ query }) {
  return { props: { query } };
}
Id.propTypes = {
  query: PropTypes.any,
};
export default Id;
