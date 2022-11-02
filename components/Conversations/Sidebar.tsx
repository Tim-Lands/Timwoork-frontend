import Link from "next/link";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { Badge, Skeleton } from "antd";
import PropTypes from "prop-types";
import Pagination from "react-js-pagination";
import { ChatActions } from "store/chat/chatActions";
function Sidebar({ RouterId }) {
  const dispatch = useAppDispatch();
  const {
    languages: { getAll },
    chat: { all: conversationsList },
  } = useAppSelector((state) => state);

  return (
    <div className="conversations-sidebar">
      <div className="conversations-items">
        {conversationsList.loading && (
          <div className="conversations-items-loading">
            <div
              className="items-loading-skeleton"
              style={{
                padding: 10,
                backgroundColor: "#f9f9f9",
                marginBottom: 6,
              }}
            >
              <Skeleton loading={true} active avatar paragraph={{ rows: 1 }} />
            </div>
            <div
              className="items-loading-skeleton"
              style={{
                padding: 10,
                backgroundColor: "#f9f9f9",
                marginBottom: 6,
              }}
            >
              <Skeleton loading={true} active avatar paragraph={{ rows: 1 }} />
            </div>
            <div
              className="items-loading-skeleton"
              style={{
                padding: 10,
                backgroundColor: "#f9f9f9",
                marginBottom: 6,
              }}
            >
              <Skeleton loading={true} active avatar paragraph={{ rows: 1 }} />
            </div>
          </div>
        )}
        <div className="conversations-item-head">
          <h3 className="title">{getAll("All_Conversations")}</h3>
        </div>
        <ul className="conversations-items-list">
          {!conversationsList.loading &&
            conversationsList.data.map((item: any) => {
              return (
                <li
                  // onClick={() => {
                  //   mutate(`api/conversations?paginate=6&page=${pageNumber}`);
                  // }}
                  className={
                    (item.messages_count !== 0 && "is-readed ") +
                    (RouterId == item.id && " active")
                  }
                  key={item.id}
                >
                  <Link href={`/conversations/${item.id}`}>
                    <a>
                      <div className="conv-item-inner">
                        <div className="conv-item-head">
                          <img
                            width={50}
                            height={50}
                            src={item.members[0].profile.avatar_path}
                            alt={item.members[0].username}
                          />
                        </div>
                        <div className="conv-item-body">
                          <h3 className="user-title">
                            {item.members[0].profile.full_name}
                          </h3>
                          <p className="conv-text">
                            {item.latest_message.message}
                          </p>
                        </div>
                        {item.messages_count !== 0 && RouterId != item.id && (
                          <Badge
                            className="msg-count"
                            count={item.messages_count}
                          />
                        )}
                      </div>
                    </a>
                  </Link>
                </li>
              );
            })}
        </ul>
        <Pagination
          activePage={conversationsList.page_number}
          itemsCountPerPage={6}
          totalItemsCount={6 * conversationsList.last_page}
          onChange={(page) => {
            dispatch(ChatActions.setPage(page));
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
  );
}

export default Sidebar;
Sidebar.propTypes = {
  RouterId: PropTypes.any,
  getLanguage: PropTypes.func,
};
