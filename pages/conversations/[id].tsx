import Layout from "@/components/Layout/HomeLayout";
import React, { ReactElement, useEffect, useRef } from "react";
import { MetaTags } from "@/components/SEO/MetaTags";
import PropTypes from "prop-types";
import Sidebar from "@/components/Conversations/Sidebar";
import router from "next/router";
import { useAppSelector } from "@/store/hooks";
import SingleConversation from "@/components/Conversations/Conversation";


function Conversation({ query }) {
  const {
    languages: { getAll },
    user,
    chat: { one: conversationsSingle },
  } = useAppSelector((state) => state);

  const messageCont = useRef(null);

  const veriedEmail = user.email_verified;

  useEffect(() => {
    if (!user.isLogged && !user.loading) {
      router.push("/login");
    }
  }, [user]);
  useEffect(() => {
    if (messageCont.current) {
      messageCont.current.scrollTop = 100000000000;
    }
  });



  return (
    <>
      <MetaTags
        title={`${getAll("Conversations")} - ${conversationsSingle.title}`}
        metaDescription={getAll("My_sells_Timwoork")}
        ogDescription={getAll("My_sells_Timwoork")}
      />
      <div
        className="timwoork-single my-3"
        style={{ maxWidth: 1300, marginInline: "auto" }}
      >
        {veriedEmail && (
         <div className="row">
          <div className="col-lg-4 ">
              <Sidebar RouterId={query.id} />
            </div>
            <div className="col-lg-8 mt-4">
           
            <SingleConversation id={query.id}/>
          </div>
          </div>
        )}
      </div>
    </>
  );
}

Conversation.getLayout = function getLayout(page: any): ReactElement {
  return <Layout>{page}</Layout>;
};
export default Conversation;
Conversation.getInitialProps = async ({ query }) => {
  return { query };
};
Conversation.propTypes = {
  query: PropTypes.any,
};
