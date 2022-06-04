import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import LastSeen from "@/components/LastSeen";
import { PRIMARY } from "../../styles/variables";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import messages from "../../public/messages.png";
import Image from "next/image";
function Conversations({ data, refer }) {
  return (
    <div ref={refer} className="navbar-conversations-container conv">
      <div className="header">
        {data?.data?.data?.length > 0 ? (
          data?.data?.data?.map((item, index) => {
            if (index < 10) {
              return (
                <Link key={item.id} href={`/conversations/${item.id}`}>
                  <div key="0" className="item">
                    <div className="rowItem">
                      {item?.messages_count !== 0 ? (
                        <div className="dot"></div>
                      ) : (
                        <></>
                      )}
                      {item.members[0].profile.avatar_path ? (
                        <img
                          width={35}
                          style={{ borderRadius: "100%" }}
                          height={35}
                          src={item.members[0].profile.avatar_path}
                          alt={item.members[0].profile.username}
                        />
                      ) : (
                        <FaUserCircle
                          style={{ height: 35, width: 35, color: "lightgray" }}
                        />
                      )}
                      <p>
                        <span style={{ color: PRIMARY }}>
                          {item?.title?.slice(0, 65)}
                          {item?.title?.length > 64 && "..."}{" "}
                        </span>
                        {item?.latest_message?.message?.slice(0, 65)}
                        {item?.latest_message?.message?.length > 64 && "..."}
                      </p>
                    </div>
                    <p>
                      <AiOutlineClockCircle />
                      <LastSeen date={item.latest_message.updated_at} />
                    </p>
                  </div>
                </Link>
              );
            }
          })
        ) : (
          <div className="noData">
            <Image src={messages} alt="لا توجد رسائل" width={60} height={60} />
            <p>لا توجد لديك رسائل</p>
          </div>
        )}
      </div>
      {data?.data?.data?.length > 0 && (
        <div className="footer">
          <Link href="/conversations">
            <button>
              جميع الرسائل <BiMailSend size={16} />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
Conversations.propTypes = {
  data: PropTypes.any,
  refer: PropTypes.any,
};

export default Conversations;
