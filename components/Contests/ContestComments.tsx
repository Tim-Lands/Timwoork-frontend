import React from "react";
import ContestComment from "./ContestComment";
import { useAppSelector } from "@/store/hooks";
function ContestComments() {
  const { getAll } = useAppSelector((state) => state.languages);
  return (
    <div className="contest-comments">
      <ContestComment
        avatar="/avatar.png"
        time={getAll("Since_2_days")}
        level={getAll("Active_seller")}
        username="arafa109"
        author="عبد الله الهادي"
        text="مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف يضع نصوصا مؤقتة على التصميم ليظهر للعميل"
      />
      <ContestComment
        avatar="/avatar2.jpg"
        time={getAll("Since_2_minutes")}
        level={getAll("VIP_seller")}
        username="ahmedyahya"
        author="أحمد يحيى"
        text="مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف يضع نصوصا مؤقتة على التصميم ليظهر للعميل"
      />
      <ContestComment
        avatar="/avatar3.jpg"
        time={getAll("Since_1_hour")}
        level={getAll("Professional_seller")}
        username="tarekaroui"
        author="طارق عروي"
        text="مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف يضع نصوصا مؤقتة على التصميم ليظهر للعميل"
      />
      <div className="page-header">
        <h4 className="title" style={{ fontSize: 22 }}>
          {getAll("Add_new_comment")}
        </h4>
      </div>
      <div className="contest-comments-form">
        <div className="timlands-form">
          <label className="label-block" htmlFor="input-commentText">
            {getAll("Comment_text")}
          </label>
          <div className="app-content-editor">
            <textarea
              name="commentText"
              className="descriptionInputHold"
              id="commentText"
            ></textarea>
          </div>
        </div>
        <hr />
        <div className="py-2">
          <button className="btn butt-md butt-primary ">
            {getAll("Add_comment")}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ContestComments;
