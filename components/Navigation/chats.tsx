import React from "react";
import Link from "next/link";
import PropTypes from "prop-types";
import LastSeen from "@/components/LastSeen";
import { PRIMARY } from "../../styles/variables";
import { AiOutlineClockCircle } from "react-icons/ai";
import { BiMailSend } from "react-icons/bi";
function Conversations({ data }) {
  return (
    <div className="navbar-conversations-container">
      <div className="header">
        {data.data.data.map((item) => {
          console.log(item);
          return (
            <Link
              key={item.id}
              href={`/conversations/${item.id}#msg-item-${item.latest_message.id}`}
            >
              <div key="0" className="item">
                <div className="rowItem">
                  <img
                    width={35}
                    style={{ borderRadius: "100%" }}
                    height={35}
                    src={item.members[0].profile.avatar_path}
                    alt="Abdelhamid Boumegouas"
                  />
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
  RouterId: PropTypes.any,
};

export default Conversations;
