import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import LastSeen from "@/components/LastSeen";
import { PRIMARY } from "../../styles/variables";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";

function Conversations({ data }) {
  return (
    <div className="navbar-conversations-container">
      <div className="header">
        {data.data.data.map((item, index) => {
          if (index < 10) {
            return (
              <Link
                key={item.id}
                href={`/conversations/${item.id}#msg-item-${item.latest_message.id}`}
              >
                <div key="0" className="item">
                  <div className="rowItem">
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
                      <span style={{ color: PRIMARY }}>{item.title} </span>
                      {item.latest_message.message}
                    </p>
                  </div>
                  <p>
                    <AiOutlineClockCircle />
                    <LastSeen date={item.updated_at} />
                  </p>
                </div>
              </Link>
            );
          }
        })}
      </div>
      <div className="footer">
        <Link href="/conversations">
          <button>
            جميع الرسائل <BiMailSend size={16} />
          </button>
        </Link>
      </div>
    </div>
  );
}
Conversations.propTypes = {
  data: PropTypes.any,
};

export default Conversations;
