import React from "react";
import ContestComment from "./ContestComment";

function ContestComments() {
  return (
    <div className="contest-comments">
      <ContestComment
        avatar="/avatar.png"
        time="منذ يومين"
        level="بائع نشط"
        username="arafa109"
        author="عبد الله الهادي"
        text="مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف يضع نصوصا مؤقتة على التصميم ليظهر للعميل"
      />
      <ContestComment
        avatar="/avatar2.jpg"
        time="منذ دقيقتين"
        level="بائع VIP"
        username="ahmedyahya"
        author="أحمد يحيى"
        text="مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف يضع نصوصا مؤقتة على التصميم ليظهر للعميل"
      />
      <ContestComment
        avatar="/avatar3.jpg"
        time="منذ ساعة"
        level="بائع محترف"
        username="tarekaroui"
        author="طارق عروي"
        text="مثل هذا النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف يضع نصوصا مؤقتة على التصميم ليظهر للعميل"
      />
      <div className="page-header">
        <h4 className="title" style={{ fontSize: 22 }}>أضف تعليقا جديد</h4>
      </div>
      <div className="contest-comments-form">
        <div className="timlands-form">
          <label className="label-block" htmlFor="input-commentText">
            نص التعليق
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
          <button className="btn butt-md butt-primary ">أضف التعليق</button>
        </div>
      </div>
    </div>
  );
}

export default ContestComments;
